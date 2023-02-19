import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiMethod, bearerHeaders, url } from "../static/js/util"

import "../static/css/general.css"
import style from "../static/css/profile.module.css"

import Star from "/assets/svg/star.svg"

import Header from "../components/header"

import { useEffect } from "react"
import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function profile() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const [section, setSection] = useState("reservations")
  const [dealData, setDealData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [ratingData, setRatingData] = useState([])
  const [statistics, setStatistics] = useState({
    dealCount: 0,
    reviewCount: 0,
    totalSpent: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.backgroundImage = ""
  }, [])

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

    fetchData()
  }, [user])

  const onLowerNavbarItemClick = (e, section) => {
    if (section === "logout") {
      setUser(null)
      setToken(null)
      localStorage.removeItem("token")
      navigate("/login")
    } else {
      setSection(section)
    }
  }

  const renderSection = (section) => {
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
                  return prev
                })

                createPopup(
                  "Successfully cancelled",
                  <p>
                    Your reservation has been cancelled successfully. You can
                    make a new reservation there at any time!
                  </p>,
                  "success",
                  "Close"
                )
              } else {
                createPopup(
                  "Deletion unsuccessful",
                  <p>{promise.message}</p>,
                  "error",
                  "Close",
                  () => {
                    e.target.disabled = false
                  }
                )
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
                  <p>
                    Your reservation has been cancelled successfully. You can
                    delete the entry if you wish.
                  </p>,
                  "success",
                  "Close"
                )
              } else {
                createPopup(
                  "Deletion unsuccessful",
                  <p>{promise.message}</p>,
                  "error",
                  "Close",
                  () => {
                    e.target.disabled = false
                  }
                )
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
                let target =
                  e.target.parentElement.parentElement.parentElement.querySelector(
                    "." + style["pre-purchase-data"]
                  )

                let height = 140 * deal.pre_purchase.products.length + 25 + 66

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
                    <img
                      src={deal?.point_of_interest?.images}
                      onClick={(e) => handleDealClick(e)}
                    />
                    <div className={style["reservation-data-content"]}>
                      <h1 onClick={(e) => handleDealClick(e)}>
                        {deal?.point_of_interest.name}
                      </h1>
                      <p>{deal?.point_of_interest.description}</p>
                      {deal.pre_purchase && (
                        <div
                          className={style["expand-indicator"]}
                          onClick={(e) => handleExpandClick(e)}>
                          click to expand
                        </div>
                      )}
                    </div>
                    <div
                      className={style["reservation-secondary-data-content"]}>
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
                        <p>{deal.status}</p>
                      </div>
                      <div className={style["button-container"]}>
                        {renderButtons(deal)}
                      </div>
                    </div>
                  </div>
                  {deal.pre_purchase && (
                    <div
                      aria-hidden={true}
                      className={style["pre-purchase-data"]}>
                      <h1>Products</h1>
                      <div className={style["pre-purchase-data-content"]}>
                        {deal.pre_purchase.products.map((product, index) => {
                          return (
                            <div className={style["product"]}>
                              <img src="https://via.placeholder.com/1920x1080.png/00aa33?text=food+rerum" />
                              <div className={style["product-content"]}>
                                <div>
                                  <h1>{product.name || "Placeholder Name"}</h1>
                                  <p>
                                    {product.description ||
                                      "Placeholder Description"}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    Quantity: <b>{product.quantity}</b>
                                  </p>
                                  <p>
                                    Price: <b>€{product.price || "2.41"}</b>
                                  </p>
                                  <p>
                                    Product sum:{" "}
                                    <b>
                                      €
                                      {(
                                        parseFloat(product.price) *
                                        product.quantity
                                      ).toFixed(2)}
                                    </b>
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
            return (
              <p className={style["no-data-warning"]}>
                No reservations found...
              </p>
            )
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

              createPopup(
                "Successfully removed!",
                <p>
                  Your review has been successfully removed! You can always
                  create a new one.
                </p>,
                "success",
                "Close"
              )
            } else {
              createPopup(
                "Deletion unsuccessful",
                <p>We couldn't delete this entry. {promise.message}</p>,
                "error",
                "Close"
              )
            }
          }

          const renderRating = (review) => {
            if (ratingData.length > 0) {
              let rating = ratingData.filter(
                (rating) =>
                  rating.point_of_interest.id === review.point_of_interest.id
              )

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
                  <div className={style["content"]}>
                    <div className={style["header"]}>
                      <h1
                        onClick={(e) =>
                          navigate(`/place?p=${review.point_of_interest.id}`)
                        }>
                        {review.point_of_interest.name}
                      </h1>

                      {renderRating(review)}

                      <p>{review.date}</p>
                    </div>

                    <p>{review.text}</p>
                  </div>
                  <div
                    className={style["actions"]}
                    onClick={(e) => removeReview(e, review.id)}>
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
                <p>
                  Your rating has been successfully removed! You can always
                  create a new one.
                </p>,
                "success",
                "Close"
              )
            } else {
              createPopup(
                "Deletion unsuccessful",
                <p>We couldn't delete this entry. {promise.message}</p>,
                "error",
                "Close"
              )
            }
          }

          if (ratingData.length > 0) {
            return ratingData.map((review, index) => {
              return (
                <div key={index} className={style["review"]}>
                  <div className={style["content"]}>
                    <div className={style["header"]}>
                      <h1>{review.point_of_interest.name}</h1>

                      <div className={style["rating"]}>
                        <img src={Star} alt="" />
                        <p>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={style["actions"]}
                    onClick={(e) => removeRating(e, review.id)}>
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
        return <p>Settings</p>

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
                <h2 className={style["profile-info-item-title"]}>
                  {statistics?.dealCount || 0}
                </h2>
                <p className={style["profile-info-item-text"]}>Reservations</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>
                  {statistics?.reviewCount || 0}
                </h2>
                <p className={style["profile-info-item-text"]}>Reviews</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>
                  {statistics?.totalSpent || 0.0}€
                </h2>
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
              <div
                {...(section === "settings" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "settings")}>
                Settings
              </div>
            </div>

            <div className={style["right"]}>
              <div
                {...(section === "logout" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "logout")}>
                Logout
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
