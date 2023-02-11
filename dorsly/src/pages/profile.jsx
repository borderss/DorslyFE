import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../static/css/general.css"
import style from "../static/css/profile.module.css"

import Header from "../components/header"

import { useEffect } from "react"
import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function profile() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const exampleDealData = [
    {
      id: 70,
      point_of_interest: {
        id: 3,
        name: "William Rosenbaum",
        description:
          "Beatae sed cupiditate et dolorem natus et impedit. Ipsum quia officiis ad sed asperiores nemo. Consectetur quia illo doloribus.",
        images:
          "https://via.placeholder.com/1920x1080.png/001100?text=food+placeat",
      },
      reservation: {
        id: 70,
        date: "2023-02-09 12:42:00",
        number_of_people: 1,
      },
      pre_purchase: {
        id: 70,
        products: [
          {
            id: 40,
            quantity: 4,
          },
          {
            id: 63,
            quantity: 3,
          },
          {
            id: 282,
            quantity: 1,
          },
        ],
        total_price: "41.15",
        status: "pending",
        payment_status: "pending",
        payment_id: null,
      },
      user_id: 1,
      status: "expired",
    },
    {
      id: 71,
      point_of_interest: {
        id: 7,
        name: "Jessy Kozey",
        description:
          "Libero facere perferendis sequi consequatur. Itaque voluptas et consequatur et voluptatibus corrupti voluptate pariatur. Quas culpa ut eos nisi rerum aut. Delectus totam consequatur rerum ut neque.",
        images:
          "https://via.placeholder.com/1920x1080.png/00aa33?text=food+rerum",
      },
      reservation: {
        id: 71,
        date: "2023-02-09 12:42:00",
        number_of_people: 1,
      },
      pre_purchase: {
        id: 71,
        products: [
          {
            id: 87,
            quantity: 4,
          },
          {
            id: 128,
            quantity: 3,
          },
        ],
        total_price: "89.62",
        status: "pending",
        payment_status: "pending",
        payment_id: null,
      },
      user_id: 1,
      status: "expired",
    },
    {
      id: 72,
      point_of_interest: {
        id: 9,
        name: "Keyon Brakus",
        description:
          "Quo ut doloribus eos et voluptatem ut veniam. Alias alias laudantium velit eum quae deleniti. Debitis debitis modi nesciunt cumque tempora.",
        images:
          "https://via.placeholder.com/1920x1080.png/00cc77?text=food+sunt",
      },
      reservation: {
        id: 72,
        date: "2023-02-09 12:42:00",
        number_of_people: 1,
      },
      pre_purchase: {
        id: 72,
        products: [
          {
            id: 54,
            quantity: 2,
          },
          {
            id: 62,
            quantity: 3,
          },
        ],
        total_price: "19.17",
        status: "pending",
        payment_status: "open",
        payment_id: null,
      },
      user_id: 1,
      status: "expired",
    },
    {
      id: 73,
      point_of_interest: {
        id: 10,
        name: "Muhammad Turcotte",
        description:
          "Aliquid non minus voluptatibus aut qui. Dolorum qui expedita harum omnis veniam repellendus. Neque labore aliquid qui quidem. Ut dolor est ea eum dolor ex.",
        images:
          "https://via.placeholder.com/1920x1080.png/005500?text=food+est",
      },
      reservation: {
        id: 73,
        date: "2023-02-09 12:42:00",
        number_of_people: 1,
      },
      pre_purchase: {
        id: 73,
        products: [
          {
            id: 152,
            quantity: 2,
          },
          {
            id: 205,
            quantity: 3,
          },
        ],
        total_price: "50.33",
        status: "complete",
        payment_status: "open",
        payment_id:
          "cs_test_b1gVgoOUecfQLEF1LDBUcR987tenkG5tBeLeYaT4Rn6uBt4eZL8dXQln2V",
      },
      user_id: 1,
      status: "completed",
    },
    {
      id: 74,
      point_of_interest: {
        id: 14,
        name: "Alaina Hauck MD",
        description:
          "Ut ea porro perspiciatis labore ipsam est et. Assumenda voluptatibus ea totam eligendi eius repellendus ipsam. Tempore minus quis corporis impedit voluptates. Minus maxime iusto qui ut a.",
        images:
          "https://via.placeholder.com/1920x1080.png/0022dd?text=food+consequatur",
      },
      reservation: {
        id: 74,
        date: "2023-02-10 12:42:00",
        number_of_people: 5,
      },
      user_id: 1,
      status: "active",
    },
  ]

  const [section, setSection] = useState("reservations")

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.backgroundImage = ""
  }, [])

  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
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

            switch (deal.status) {
              case "active":
                result = []
                result.push(<button>Cancel reservation</button>)
                break

              case "completed":
                result = []
                result.push(
                  <button
                    onClick={(e) => {
                      console.log("removing entry: ", deal.id)
                    }}>
                    Remove entry
                  </button>
                )
                break
            }

            switch (deal?.pre_purchase?.status) {
              case "pending":
                result = []

                result.push(
                  <>
                    <button disabled>Payment not recieved</button>
                    <button
                      className={style["delete-entry"]}
                      onClick={(e) => {
                        console.log("deleting entry: ", deal.id)
                      }}>
                      Delete entry
                    </button>
                  </>
                )
                break
            }

            return result
          }

          return exampleDealData.map((deal, index) => {
            const handleExpandClick = (e) => {
              let target = e.target.parentElement.parentElement.parentElement.querySelector("." + style["pre-purchase-data"])

              let height = 140 * (deal.pre_purchase.products.length) + 25 + 66

              target.style = "--height: " + height + "px"

              if (target.getAttribute("aria-hidden") === "true") {
                e.target.innerHTML = "click to collapse"
                target.setAttribute("aria-hidden", "false")
              } else {
                e.target.innerHTML = "click to expand"
                target.setAttribute("aria-hidden", "true")
              }
            }

            return (
              <div className={style["deal"]} key={index}>
                <div className={style["reservation-data"]}>
                  <img src={deal.point_of_interest.images} />
                  <div className={style["reservation-data-content"]}>
                    <h1>{deal.point_of_interest.name}</h1>
                    <p>{deal.point_of_interest.description}</p>
                    {deal.pre_purchase && (
                      <div className={style["expand-indicator"]} onClick={e => handleExpandClick(e)}>
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
                      <p>{deal.status}</p>
                    </div>
                    <div>{renderButtons(deal)}</div>
                  </div>
                </div>
                {deal.pre_purchase && (
                  <div
                    aria-hidden={true}
                    className={style["pre-purchase-data"]}>
                    <h1>Pre-purchase</h1>
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
                                        product.quantity || 2.41 * 5
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
                <h2 className={style["profile-info-item-title"]}>0</h2>
                <p className={style["profile-info-item-text"]}>Reservations</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0</h2>
                <p className={style["profile-info-item-text"]}>Reviews</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0.00$</h2>
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
