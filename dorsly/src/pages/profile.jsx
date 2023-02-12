import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiMethod } from "../static/js/util"

import "../static/css/general.css"
import style from "../static/css/profile.module.css"

import Header from "../components/header"

import { useEffect } from "react"
import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function profile() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const [section, setSection] = useState("reservations")
  const [dealData, setDealData] = useState([])

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
      await apiMethod("/getDeals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          let result = []

          Object.keys(res).forEach((key) => {
            result.push(res[key])
          })

          console.log(result)

          setDealData(result)
        })
        .catch((err) => {
          console.log(err)
        })
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
                    <button disabled>Payment not recieved</button>
                  </>
                )
                break

              case "payment_failed":
                if (deal.status != "payment expired") {
                  result = []

                  result.unshift(
                    <>
                      <button
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
              <p className={style["no-reservations-warning"]}>
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
        return <p>Reviews</p>

      case "ratings":
        return <p>Ratings</p>

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
                  {dealData.length || 0}
                </h2>
                <p className={style["profile-info-item-text"]}>Reservations</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0</h2>
                <p className={style["profile-info-item-text"]}>Reviews</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>
                  {dealData.length > 0
                    ? (
                        dealData.reduce((acc, deal) => {
                          if (!deal?.pre_purchase) {
                            return acc
                          }

                          return (
                            acc +
                            deal.pre_purchase.products.reduce(
                              (acc2, product) => {
                                return acc2 + product.quantity * product.price
                              },
                              0
                            )
                          )
                        }, 0) || 0
                      ).toFixed(2)
                    : 0}
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
