import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { apiMethod, bearerHeaders, logoutUser, url } from "../static/js/util"

import "../static/css/general.css"
import style from "../static/css/profile.module.css"

import Star from "/assets/svg/star.svg"

import Header from "../components/header"
import LabeledInputField from "../components/labeledInputField"

import { useEffect } from "react"
import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function profile() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const navigate = useNavigate()
  const location = useLocation()
  const { defaultSection } = location.state || {
    defaultSection: "reservations",
  }

  const [section, setSection] = useState(defaultSection)
  const [dealData, setDealData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [ratingData, setRatingData] = useState([])
  const [statistics, setStatistics] = useState({
    dealCount: 0,
    reviewCount: 0,
    totalSpent: 0,
  })

  const [userSettingsData, setUserSettingsData] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
  })

  const [passwordSettingsData, setPasswordSettingsData] = useState({
    currentPassword: null,
    password: null,
    passwordConfirm: null,
  })

  const [privacySettingsData, setPrivacySettingsData] = useState({
    promotionEmails: false,
    securityNotices: false,
    reservationInfo: false,
  })

  const [accountDeleteData, setAccountDeleteData] = useState({
    password: null,
  })

  useEffect(() => {
    document.body.style.backgroundImage = ""
  }, [])

  useEffect(() => {
    const { defaultSection } = location.state || {
      defaultSection: "reservations",
    }

    setSection(defaultSection)
  }, [location])

  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }

    if (user === false || token === false) {
      return
    }

    async function fetchData() {
      let [statistics, deals, ratings, comments] = await Promise.all([
        fetch(url("/profileStatistics"), {
          method: "GET",
          headers: bearerHeaders(token),
        }).then((response) => response.json()),

        fetch(url("/getDeals"), {
          method: "GET",
          headers: bearerHeaders(token),
        }).then((response) => response.json()),

        fetch(url("/getUserRatings"), {
          method: "GET",
          headers: bearerHeaders(token),
        }).then((response) => response.json()),

        fetch(url("/getUserComments"), {
          method: "GET",
          headers: bearerHeaders(token),
        }).then((response) => response.json()),
      ])

      let result = []

      Object.keys(deals).forEach((key) => {
        result.push(deals[key])
      })

      setDealData(result)

      setRatingData(ratings.data)

      setReviewData(comments.data)

      setStatistics(statistics)
    }

    setPrivacySettingsData({
      promotionEmails: user.is_promotion_emails_allowed,
      securityNotices: user.is_security_notices_allowed,
      reservationInfo: user.is_reservation_info_allowed,
    })

    fetchData()
  }, [user])

  const onLowerNavbarItemClick = (e, section) => {
    setSection(section)
  }

  const renderSection = (section) => {
    const [loading, setLoading] = useState(false)

    switch (section) {
      case "reservations":
        const renderDeals = () => {
          const renderButtons = (deal) => {
            let result = []

            const deleteRow = async (e, id) => {
              e.target.disabled = true

              let promise = await apiMethod(`/deleteDeal/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })

              if (promise.status === "success") {
                e.target.disabled = false
                setDealData((prev) => {
                  return prev.filter((deal) => deal.id !== id)
                })

                setStatistics((prev) => {
                  prev.dealCount--
                  prev.totalSpent -= deal.total_price
                  return prev
                })

                createPopup(
                  "Successfully cancelled",
                  <p>Your reservation has been cancelled successfully. You can make a new reservation there at any time!</p>,
                  "success",
                  "Close"
                )
              } else {
                createPopup("Deletion unsuccessful", <p>{promise.message}</p>, "error", "Close", () => {
                  e.target.disabled = false
                })
              }
            }

            const calcelReservation = async (e, id) => {
              e.target.disabled = true

              let promise = await apiMethod(`/cancelReservation/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })

              if (promise.status === "success") {
                e.target.disabled = false
                setDealData((prev) => {
                  prev.forEach((deal) => {
                    if (deal.id === id) {
                      deal.status = "cancelled"
                    }
                  })

                  return prev
                })

                createPopup(
                  "Successfully cancelled",
                  <p>Your reservation has been cancelled successfully. You can delete the entry if you wish.</p>,
                  "success",
                  "Close"
                )
              } else {
                createPopup("Deletion unsuccessful", <p>{promise.message}</p>, "error", "Close", () => {
                  e.target.disabled = false
                })
              }
            }

            switch (deal.status) {
              case "active":
                result = []
                result.push(
                  <button
                    key={result.length}
                    onClick={(e) => {
                      calcelReservation(e, deal.id)
                    }}>
                    Cancel reservation
                  </button>
                )
                break

              case "completed":
                result = []
                result.push(
                  <button
                    key={result.length}
                    onClick={(e) => {
                      deleteRow(e, deal.id)
                    }}>
                    Remove entry
                  </button>
                )
                break

              case "cancelled":
                result = []
                result.push(
                  <button
                    key={result.length}
                    onClick={(e) => {
                      deleteRow(e, deal.id)
                    }}>
                    Remove entry
                  </button>
                )
                break

              case "payment expired":
                result.push(
                  <button
                    key={result.length}
                    onClick={(e) => {
                      deleteRow(e, deal.id)
                    }}>
                    Remove entry
                  </button>
                )
                break
            }

            switch (deal?.pre_purchase?.status) {
              case "pending":
                result.unshift(
                  <>
                    <button key={result.length} disabled>
                      Payment not recieved
                    </button>
                  </>
                )
                break

              case "payment_failed":
                if (deal.status != "payment expired") {
                  result = []

                  result.unshift(
                    <>
                      <button
                        key={result.length}
                        className={style["delete-entry"]}
                        onClick={(e) => {
                          deleteRow(e, deal.id)
                        }}>
                        Delete entry
                      </button>
                    </>
                  )
                } else {
                  result = []

                  result.unshift(
                    <>
                      <button disabled>Payment failed</button>
                      <button
                        key={result.length}
                        className={style["delete-entry"]}
                        onClick={(e) => {
                          deleteRow(e, deal.id)
                        }}>
                        Delete entry
                      </button>
                    </>
                  )
                }
                break
            }

            return result
          }

          if (dealData.length > 0) {
            return dealData.map((deal, index) => {
              const handleExpandClick = (e) => {
                let target = e.target.parentElement.parentElement.parentElement.querySelector("." + style["pre-purchase-data"])

                let height = 140 * deal.pre_purchase.products.length + 25 + 84

                target.style = "--height: " + height + "px"

                if (target.getAttribute("aria-hidden") === "true") {
                  e.target.innerHTML = "click to collapse"
                  target.setAttribute("aria-hidden", "false")
                } else {
                  e.target.innerHTML = "click to expand"
                  target.setAttribute("aria-hidden", "true")
                }
              }

              const handleDealClick = (e) => {
                navigate(`/place?p=${deal.point_of_interest.id}`)
              }

              return (
                <div className={style["deal"]} key={index}>
                  <div className={style["reservation-data"]}>
                    <img src={deal?.point_of_interest?.images} onClick={(e) => handleDealClick(e)} />
                    <div className={style["reservation-data-content"]}>
                      <h1 onClick={(e) => handleDealClick(e)}>{deal?.point_of_interest.name}</h1>
                      <p>{deal?.point_of_interest.description}</p>
                      {deal.pre_purchase && (
                        <div className={style["expand-indicator"]} onClick={(e) => handleExpandClick(e)}>
                          click to expand
                        </div>
                      )}
                    </div>
                    <div className={style["reservation-secondary-data-content"]}>
                      <div>
                        <p>Reservation date</p>
                        <p>{deal.reservation.date}</p>
                      </div>
                      <div>
                        <p>Number of people</p>
                        <p>{deal.reservation.number_of_people}</p>
                      </div>
                      <div>
                        <p>Status</p>
                        <p>{deal?.pre_purchase?.payment_status ? `${deal?.pre_purchase?.payment_status}  |  ` : ''}{deal?.status}</p>
                      </div>
                      <div className={style["button-container"]}>{renderButtons(deal)}</div>
                    </div>
                  </div>
                  {deal.pre_purchase && (
                    <div aria-hidden={true} className={style["pre-purchase-data"]}>
                      <div className={style["title"]}>
                        <h1>Products</h1>
                        <span>
                          total: <b>€{
                            deal.pre_purchase.products.reduce((acc, product) => { return acc + parseFloat(product.price) * product.quantity }, 0)
                          }</b>
                        </span>
                      </div>
                      <div className={style["pre-purchase-data-content"]}>
                        {deal.pre_purchase.products.map((product, index) => {
                          return (
                            <div className={style["product"]}>
                              <img src={product.image} />
                              <div className={style["product-content"]}>
                                <div>
                                  <h1>{product.name || "Placeholder Name"}</h1>
                                  <p>{product.description || "Placeholder Description"}</p>
                                </div>
                                <div>
                                  <p>
                                    Quantity: <b>{product.quantity}</b>
                                  </p>
                                  <p>
                                    Price: <b>€{product.price || "2.41"}</b>
                                  </p>
                                  <p>
                                    Product sum: <b>€{(parseFloat(product.price) * product.quantity).toFixed(2)}</b>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          } else {
            return <p className={style["no-data-warning"]}>No reservations found...</p>
          }
        }

        return (
          <>
            <h1 className={style["section-title"]}>Your Reservations</h1>

            <div className={style["deals"]}>{renderDeals()}</div>
          </>
        )

      case "reviews":
        const renderReviews = () => {
          const removeReview = async (e, id) => {
            let promise = await apiMethod(`/comments/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })

            if (promise.data.id == id) {
              setReviewData(reviewData.filter((review) => review.id !== id))

              setStatistics((prev) => {
                prev.reviewCount--
                return prev
              })


              createPopup(
                "Successfully removed!",
                <p>Your review has been successfully removed! You can always create a new one.</p>,
                "success",
                "Close"
              )
            } else {
              createPopup("Deletion unsuccessful", <p>We couldn't delete this entry. {promise.message}</p>, "error", "Close")
            }
          }

          const renderRating = (review) => {
            if (ratingData.length > 0) {
              let rating = ratingData.filter((rating) => rating.point_of_interest.id === review.point_of_interest.id)

              if (rating.length > 0) {
                return (
                  <div className={style["rating"]}>
                    <img src={Star} alt="" />
                    <p>{rating[0].rating}</p>
                  </div>
                )
              }
            }
          }

          if (reviewData.length > 0) {
            return reviewData.map((review, index) => {
              return (
                <div key={index} className={style["review"]}>
                  <div className={style["review-content"]}>
                    <div className={style["header"]}>
                      <h1 onClick={(e) => navigate(`/place?p=${review.point_of_interest.id}`)}>{review.point_of_interest.name}</h1>

                      {renderRating(review)}

                      <p>{review.date}</p>
                    </div>

                    <p>{review.text}</p>
                  </div>
                  <div className={style["actions"]} onClick={(e) => removeReview(e, review.id)}>
                    <button>Remove your review</button>
                  </div>
                </div>
              )
            })
          } else {
            return <p className={style["no-data-warning"]}>Loading...</p>
          }
        }

        return (
          <>
            <h1 className={style["section-title"]}>Your Reviews</h1>

            <div className={style["reviews"]}>{renderReviews()}</div>
          </>
        )

      case "ratings":
        const renderRatings = () => {
          const removeRating = async (e, id) => {
            let promise = await apiMethod(`/ratings/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })

            if (promise.data.id == id) {
              setRatingData(ratingData.filter((rating) => rating.id !== id))

              createPopup(
                "Successfully removed!",
                <p>Your rating has been successfully removed! You can always create a new one.</p>,
                "success",
                "Close"
              )
            } else {
              createPopup("Deletion unsuccessful", <p>We couldn't delete this entry. {promise.message}</p>, "error", "Close")
            }
          }

          if (ratingData.length > 0) {
            return ratingData.map((review, index) => {
              return (
                <div key={index} className={style["review"]}>
                  <div className={style["rating-content"]}>
                    <div className={style["header"]}>
                      <h1 onClick={(e) => navigate(`/place?p=${review.point_of_interest.id}`)}>{review.point_of_interest.name}</h1>

                      <div className={style["actions"]}>
                        <img src={Star} alt="" />
                        <p>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className={style["actions"]} onClick={(e) => removeRating(e, review.id)}>
                    <button>Remove your rating</button>
                  </div>
                </div>
              )
            })
          } else {
            return <p className={style["no-data-warning"]}>Loading...</p>
          }
        }

        return (
          <>
            <h1 className={style["section-title"]}>Your Reviews</h1>

            <div className={style["reviews"]}>{renderRatings()}</div>
          </>
        )

      case "settings":
        const renderSettings = () => {
          const handleSettingsInputChange = (inputName, value) => {
            if (!value) {
              return false
            }

            switch (inputName) {
              case "firstName":
                if (value.length > 0) {
                  setUserSettingsData({ ...userSettingsData, firstName: value })
                  return true
                } else {
                  setUserSettingsData({ ...userSettingsData, firstName: null })
                  return false
                }
              case "lastName":
                if (value.length > 0) {
                  setUserSettingsData({ ...userSettingsData, lastName: value })
                  return true
                } else {
                  setUserSettingsData({ ...userSettingsData, lastName: null })
                  return false
                }
              case "phoneNumber":
                let phoneNumRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/

                if (value.match(phoneNumRegex)) {
                  setUserSettingsData({
                    ...userSettingsData,
                    phoneNumber: value,
                  })
                  return true
                } else {
                  setUserSettingsData({
                    ...userSettingsData,
                    phoneNumber: null,
                  })
                  return false
                }

              case "email":
                let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

                if (value.match(emailRegex)) {
                  setUserSettingsData({ ...userSettingsData, email: value })
                  return true
                } else {
                  setUserSettingsData({ ...userSettingsData, email: null })
                  return false
                }
              case "password":
                if (value.length > 8) {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    password: value,
                  })
                  return true
                } else {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    password: null,
                  })
                  return false
                }
              case "passwordConfirm":
                if (value.length > 8 && value == passwordSettingsData.password) {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    passwordConfirm: value,
                  })
                  return true
                } else {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    passwordConfirm: null,
                  })
                  return false
                }

              case "currentPassword":
                if (value.length > 8) {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    currentPassword: value,
                  })
                  return true
                } else {
                  setPasswordSettingsData({
                    ...passwordSettingsData,
                    currentPassword: null,
                  })
                  return false
                }

              default:
                break
            }
          }

          const handleAccountDeleteInputChange = (inputName, value) => {
            if (!value) {
              return false
            }

            switch (inputName) {
              case "password":
                console.log(accountDeleteData)

                if (value.length > 8) {
                  setAccountDeleteData({
                    ...accountDeleteData,
                    password: value,
                  })
                  return true
                } else {
                  setAccountDeleteData({
                    ...accountDeleteData,
                    password: null,
                  })
                  return false
                }
            }
          }

          const handleGeneralSubmit = async (e) => {
            e.preventDefault()

            console.log("submitted: ", userSettingsData)

            let promise = await apiMethod("/updateUserGeneralSettings", {
              method: "PUT",
              headers: bearerHeaders(token),
              body: JSON.stringify({
                first_name: userSettingsData.firstName ?? user.first_name,
                last_name: userSettingsData.lastName ?? user.last_name,
                email: userSettingsData.email ?? user.email,
                phone_number: userSettingsData.phoneNumber ?? user.phone_number,
              }),
            })

            if (promise?.data) {
              setUser({
                ...user,
                first_name: promise.data.first_name,
                last_name: promise.data.last_name,
                email: promise.data.email,
                phone_number: promise.data.phone_number,
              })

              if (userSettingsData.email) {
                createPopup(
                  "General settings updated succesfully",
                  <p>Your general settings have been updated succesfully.<br/><br/>You were logged out because you changed your email, you can log back in.</p>,
                  "success",
                  "Close"
                )
                
                logoutUser(user, token, setUser, setToken)
                return
              }

              createPopup(
                "General settings updated succesfully",
                <p>Your general settings have been updated succesfully.</p>,
                "success",
                "Close"
              )
            } else {
              createPopup("Something went wrong", <p>We couldn't update your general settings: {promise.message}</p>, "info", "Close")
            }
          }

          const handlePasswordSubmit = async (e) => {
            e.preventDefault()

            console.log("submitted: ", passwordSettingsData)

            let promise = await apiMethod("/updateUserPassword", {
              method: "PUT",
              headers: bearerHeaders(token),
              body: JSON.stringify({
                old_password: passwordSettingsData.currentPassword,
                password: passwordSettingsData.password,
                password_confirmation: passwordSettingsData.passwordConfirm,
              }),
            })

            if (promise?.data) {
              createPopup(
                "Password updated succesfully",
                <p>Your password has been updated succesfull. You will need to log in again.</p>,
                "success",
                "Close"
              )

              logoutUser(user, token, setUser, setToken)
            } else {
              createPopup("Something went wrong", <p>We couldn't change your password: {promise.message}</p>, "info", "Close")
            }
          }

          const handlePrivacySubmit = async (e) => {
            e.preventDefault()

            console.log("submitted: ", privacySettingsData, user)

            let promise = await apiMethod("/updateUserPrivacySettings", {
              method: "PUT",
              headers: bearerHeaders(token),
              body: JSON.stringify({
                is_promotion_emails_allowed: privacySettingsData.promotionEmails,
                is_security_notices_allowed: privacySettingsData.securityNotices,
                is_reservation_info_allowed: privacySettingsData.reservationInfo,
              }),
            })

            if (promise?.data) {
              setPrivacySettingsData({
                ...privacySettingsData,
                promotionEmails: promise.data.is_promotion_emails_allowed,
                securityNotices: promise.data.is_security_notices_allowed,
                reservationInfo: promise.data.is_reservation_info_allowed,
              })

              createPopup(
                "Privacy settings updated succesfully",
                <p>Your privacy settings have been updated succesfully.</p>,
                "success",
                "Close"
              )
            } else {
              createPopup("Something went wrong", <p>We couldn't update your privacy settings: {promise.message}</p>, "info", "Close")
            }
          }

          const handleDeleteAccount = (e) => {
            e.preventDefault()
            console.log("delete account", accountDeleteData.password)

            if (accountDeleteData.password == null) {
              return
            }

            createPopup(
              "Are you sure?",
              <p>Are you sure you want to delete your account? This action is irreversible.</p>,
              "warning",
              "Delete my account",
              async () => {
                console.log("delete account")

                let promise = await apiMethod("/deleteAccount", {
                  method: "DELETE",
                  headers: bearerHeaders(token),
                  body: JSON.stringify({
                    password: accountDeleteData.password,
                  }),
                })

                if (promise?.data) {
                  createPopup("Account deleted succesfully", <p>Your account has been deleted succesfully.</p>, "success", "Close")
                } else {
                  createPopup("Something went wrong", <p>We couldn't delete your account: {promise.message}</p>, "info", "Close")
                }
              },
              "Cancel",
              () => {
                console.log("cancel")
              }
            )
          }

          return (
            <div>
              <form name="general-settings" className={style["settings-section"]} onSubmit={(e) => handleGeneralSubmit(e)}>
                <h2>General settings</h2>
                <p>Here you can change your general settings, such as your name, email, password, etc.</p>

                <div className={style["account-details"]}>
                  <div>
                    <LabeledInputField
                      label="First Name"
                      inputName="firstName"
                      defaultValue={user?.first_name}
                      handleInputChange={handleSettingsInputChange}
                    />
                    <LabeledInputField
                      label="Last Name"
                      inputName="lastName"
                      defaultValue={user?.last_name}
                      handleInputChange={handleSettingsInputChange}
                    />
                  </div>

                  <LabeledInputField
                    label="Email"
                    inputName="email"
                    inputType="email"
                    defaultValue={user?.email}
                    handleInputChange={handleSettingsInputChange}
                  />
                  <LabeledInputField
                    label="Phone number"
                    inputName="phoneNumber"
                    defaultValue={user?.phone_number}
                    placeholder="+1 123 456 7890"
                    handleInputChange={handleSettingsInputChange}
                  />
                </div>

                <div className={style["settings-action"]}>
                  <button type="submit">Save changes</button>
                </div>
              </form>

              <form className={style["settings-section"]} onSubmit={(e) => handlePasswordSubmit(e)}>
                <h2>Security settings</h2>
                <p>Here you can change your password, or delete your account.</p>
                <div className={style["account-details"]}>
                  <LabeledInputField
                    label="Current password"
                    inputName="currentPassword"
                    inputType="password"
                    style={{ width: "300px" }}
                    handleInputChange={handleSettingsInputChange}
                  />
                  <div>
                    <LabeledInputField
                      label="New password"
                      inputName="password"
                      inputType="password"
                      handleInputChange={handleSettingsInputChange}
                    />
                    <LabeledInputField
                      label="Repeat new password"
                      inputName="passwordConfirm"
                      inputType="password"
                      handleInputChange={handleSettingsInputChange}
                    />
                  </div>
                </div>
                <div className={style["settings-action"]}>
                  <button type="submit">Change password</button>
                </div>
              </form>

              <form className={style["settings-section"]} onSubmit={(e) => handlePrivacySubmit(e)}>
                <h2>Privacy</h2>
                <p>
                  It's important to us that you feel safe and secure when using our services. Here you can change your privacy settings.
                </p>
                <div className={style["account-details"]}>
                  <div className={style["checkboxes"]}>
                    <div>
                      <span>
                        <input
                          type="checkbox"
                          name="promotion-emails"
                          id="promotion-emails"
                          checked={privacySettingsData.promotionEmails}
                          onChange={(e) => {
                            setPrivacySettingsData({ ...privacySettingsData, promotionEmails: e.target.checked })
                          }}
                        />
                      </span>
                      <label htmlFor="promotion-emails">I want to receive emails about new features, updates and discounts.</label>
                    </div>
                    <div>
                      <span>
                        <input
                          type="checkbox"
                          name="security-warnings"
                          id="security-warnings"
                          checked={privacySettingsData.securityNotices}
                          onChange={(e) => {
                            setPrivacySettingsData({ ...privacySettingsData, securityNotices: e.target.checked })
                          }}
                        />
                      </span>
                      <label htmlFor="security-warnings">I want to receive emails about security warnings.</label>
                    </div>
                    <div>
                      <span>
                        <input
                          type="checkbox"
                          name="reservation-info"
                          id="reservation-info"
                          checked={privacySettingsData.reservationInfo}
                          onChange={(e) => {
                            setPrivacySettingsData({ ...privacySettingsData, reservationInfo: e.target.checked })
                          }}
                        />
                      </span>
                      <label htmlFor="reservation-info">I want to receive emails about my reservations.</label>
                    </div>
                  </div>
                </div>
                <div className={style["settings-action"]}>
                  <button type="submit">Save changes</button>
                </div>
              </form>

              <h4>Danger zone</h4>
              <div className={style["danger-warning"]}>
                <form className={style["settings-section"]} onSubmit={(e) => handleDeleteAccount(e)}>
                  <h2>Account deletion</h2>
                  <p>
                    Use this to delete your account. This action cannot be undone. All of your data including past and current payments.
                  </p>

                  <LabeledInputField
                    label="Current password"
                    inputName="password"
                    inputType="password"
                    style={{ width: "400px" }}
                    handleInputChange={handleAccountDeleteInputChange}
                  />

                  <div className={style["settings-action"]}>
                    <button type="submit" className={style["delete"]}>
                      Delete account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
        return (
          <>
            <div className={style["settings"]}>{renderSettings()}</div>
          </>
        )
      default:
        return <p>Reservations</p>
    }
  }

  return (
    <>
      <Header />
      <div className={style["container"]}>
        <div className={style["profile"]}>
          <div className={style["profile-header"]}>
            <h1 className={style["full-name"]}>
              {user?.first_name} {user?.last_name}
            </h1>

            <div className={style["profile-info"]}>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>{statistics?.dealCount || 0}</h2>
                <p className={style["profile-info-item-text"]}>Reservations</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>{statistics?.reviewCount || 0}</h2>
                <p className={style["profile-info-item-text"]}>Reviews</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>{statistics?.totalSpent || 0.0}€</h2>
                <p className={style["profile-info-item-text"]}>Total Spent</p>
              </div>
            </div>
          </div>
          <div className={style["lower-navbar"]}>
            <div className={style["left"]}>
              <div
                {...(section === "reservations" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "reservations")}>
                Reservations
              </div>
              <div
                {...(section === "reviews" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "reviews")}>
                Reviews
              </div>
              <div
                {...(section === "ratings" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "ratings")}>
                ratings
              </div>
            </div>

            <div className={style["right"]}>
              <div
                {...(section === "settings" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "settings")}>
                Settings
              </div>
            </div>
          </div>
        </div>
        <div className={style["content"]}>
          {renderSection(section)}
          <br />
        </div>
      </div>
    </>
  )
}
