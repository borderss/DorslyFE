import React, { useEffect, useRef, useState, useContext } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { apiMethod, defaultHeaders } from "../static/js/util"

import Map from "../components/map"
import ReservationBar from "../components/reservationBar"

import Checkmark from "/assets/svg/checkmark.svg"
import MouseArrow from "/assets/svg/mousearrow.svg"
import RatingLeft from "/assets/svg/ratingleft.svg"
import RatingLeftHollow from "/assets/svg/ratinglefthollow.svg"
import RatingRight from "/assets/svg/ratingright.svg"
import RatingRightHollow from "/assets/svg/ratingrighthollow.svg"
import Star from "/assets/svg/star.svg"
import IncrementUp from "/assets/svg/incrementup.svg"
import IncrementDown from "/assets/svg/incrementdown.svg"

import style from "../static/css/place.module.css"

import Header from "../components/header"

import { UserContext } from "../contexts/userContext"
import { CartContext } from "../contexts/cartContext"

export default function place() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { cart, setCart } = useContext(CartContext)
  
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const ratingRef = useRef(null)
  const ratingResultRef = useRef(null)

  const [data, setData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [productData, setProductData] = useState([])
  const [userRating, setUserRating] = useState(4)
  const [bgImage, setBgImage] = useState(`https://picsum.photos/1920/1080/?random&t=${new Date().getTime()}`)
  const [section, setSection] = useState("cart")

  useEffect(() => {
    if (
      searchParams.get("p") == null ||
      searchParams.get("p") == "undefined" ||
      searchParams.get("p") == "null" ||
      searchParams.get("p") == "NaN" ||
      searchParams.get("p") == "false" ||
      searchParams.get("p") == "0" ||
      searchParams.get("p") == "[]"
    ) {
      navigate("/products")
    }
  }, [navigate])

  useEffect(() => {
    if (ratingRef.current != null) {
      ratingRef.current.childNodes.forEach((star) => {
        star?.childNodes.forEach((icon) => {
          icon.addEventListener("click", (e) => {
            console.log(e.target.getAttribute("selectionindex"))
            setUserRating(e.target.getAttribute("selectionindex"))

            ratingResultRef.current.classList.add(style["result-active"])

            setTimeout(() => {
              ratingResultRef.current.classList.remove(style["result-active"])
            }, 1500)
          })
        })
      })
    }

    apiMethod("/points_of_interest/" + searchParams.get("p"), {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setData(data.data)
    })

    apiMethod(`/points_of_interest/${searchParams.get("p")}/comments`, {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setReviewData(data.data)
    })

    apiMethod(`/points_of_interest/${searchParams.get("p")}/products`, {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setProductData(data.data)
    })
  }, [])

  useEffect(() => {
    ratingRef.current.childNodes.forEach((star) => {
      star.childNodes.forEach((half) => {
        if (half.getAttribute("selectionindex") == userRating) {
          half.classList.add(half.classList.item(0), style["active"])
        } else {
          half.classList.remove(half.classList.item(1))
        }
      })
    })
  }, [userRating])

  const renderCartSection = () => {
    const handleIncrement = (item, dif) => {
      console.log(cart)

      let newCart = {
        items: [...cart?.items],
        total: cart?.total,
        totalItems: cart?.totalItems
      }

      newCart.items.forEach((cartItem) => {
        if (cartItem.id == item.id) {
          cartItem.amount += dif
          newCart.totalItems += dif
          
          if (cartItem.amount < 1) {
            newCart.items.splice(newCart.items.indexOf(cartItem), 1)
          }
        }
      })

      newCart.total = 0

      newCart.items.forEach((cartItem) => {
        newCart.total += cartItem.price * cartItem.amount
        newCart.total = Math.round(newCart.total*100)/100
      })

      console.log(newCart)

      setCart(newCart)
    }

    const removeItem = (item) => {
      let newCart = {
        items: [...cart?.items],
        total: cart?.total,
        totalItems: cart?.totalItems
      }

      newCart.items.forEach((cartItem) => {
        if (cartItem.id == item.id) {
          newCart.totalItems -= cartItem.amount
          newCart.items.splice(newCart.items.indexOf(cartItem), 1)
        }
      })

      newCart.total = 0

      newCart.items.forEach((cartItem) => {
        newCart.total += cartItem.price * cartItem.amount
        newCart.total = Math.round(newCart.total*100)/100
      })

      setCart(newCart)
    }

    return (
      <div className={style["cart"]}>
        <h1>Here's your cart</h1>

        <table className={style["table"]}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(cart?.items || []).map((item, id) => {
              return (
                <tr key={id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.amount}
                    <span className={style["amount-increment"]}>
                      <img src={IncrementUp} onClick={e => handleIncrement(item, 1)}/>
                      <img src={IncrementDown} onClick={e => handleIncrement(item, -1)}/>
                    </span>
                  </td>
                  <td>{Math.round(item.price * item.amount *100)/100}</td>
                  <td>
                    <button className={style["remove"]} onClick={e => removeItem(item)}>Remove</button>
                  </td>
                </tr>
              )
            })}
            {
              <tr>
                <td></td>
                <td></td>
                <td >Total:</td>
                <td>{cart?.total.toFixed(2) || '0.00'}</td>
                <td><button className={style["remove"]}>Pay now</button></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  const renderProducts = () => {
    const renderSectionProducts = () => {
      return productData.map((product, id) => {
        const handleProductClick = (e, p) => {
          let newCart = {
            items: [...cart?.items],
            total: cart?.total,
            totalItems: cart?.totalItems
          }

          let found = false
          newCart.items.forEach((item) => {
            if (item.id == p.id) {
              found = true
            }
          })

          if (!found) {
            newCart.items.push({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              image: p.image,
              amount: 1,
            })

            newCart.total += parseFloat(p.price)
            newCart.totalItems++
          } else {
            newCart.items.forEach((item) => {
              if (item.id == p.id) {
                newCart.total -= parseFloat(item.price)

                if (newCart.total < 0) {
                  newCart.total = 0
                }

                newCart.items.splice(newCart.items.indexOf(item), 1)
              }
            })

            newCart.totalItems--
          }

          setCart(newCart)

          // handle visuals
          let target = e.target

          if (!target.classList.contains(style["product"])) {
            target = target.parentNode
            if (!target.classList.contains(style["product"])) {
              target = target.parentNode
            }
          }

          target.classList.toggle(style["product-active"])
        }

        return (
          <div
            key={id}
            className={style["product"]}
            onClick={(e) => {
              handleProductClick(e, product)
            }}>
            <div
              className={style["product-image"]}
              style={{ "--product-image": "url(" + product.image + ")" }}></div>
            <div className={style["product-info"]}>
              <p className={style["product-name"]}>{product.name}</p>
              <p className={style["product-description"]}>
                {product.description}
              </p>
              <p className={style["product-price"]}>${product.price}</p>
            </div>
          </div>
        )
      })
    }

    let returnData = (
      <div className={style["product-section"]}>
        <h2 className={style["section-title"]}>Products</h2>
        <div className={style["section-products"]}>
          {renderSectionProducts()}
        </div>
      </div>
    )

    return returnData
  }

  const renderInfoSection = () => {
    return (
      <div className={style["info"]}>
        <div className={style["info-sections"]}>
          <div className={style["info-description"]}>
            <h2 className={style["info-title"]}>Description</h2>
            <p className={style["info-text"]}>{data.description}</p>
          </div>
          <div className={style["Location"]}>
            <h2 className={style["info-title"]}>Location</h2>
            <p className={style["info-text"]}>
              Coordnates: {data.gps_lat}, {data.gps_lng}
            </p>
            <div style={{ display: "flex", height: "500px" }}>
              <Map
                containerStyle={{
                  width: "600px",
                  height: "400px",
                }}
                center={{
                  lat: parseFloat(data.gps_lat),
                  lng: parseFloat(data.gps_lng),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderReviewSection = () => {
    return (
      <div className={style["product-section"]}>
        <h2 className={style["section-title"]}>Reviews</h2>
        <div className={style["reviews"]}>
          {reviewData.length > 0 ? (
            reviewData.map((review, id) => {
              return (
                <div key={id} className={style["review"]}>
                  <div className={style["review-container"]}>
                    <p className={style["review-user-name"]}>
                      {review.user.first_name} {review.user.last_name}
                    </p>
                    <p className={style["review-text"]}>{review.text}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className={style["review"]}>
              <p style={{ fontSize: "27px" }}>No reviews yet!</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const onLowerNavbarItemClick = (e, section) => {
    setSection(section)
    let navbar = e.target.parentElement?.parentElement

    navbar.childNodes.forEach((half) => {
      half.childNodes.forEach((icon) => {
        icon.classList.remove(style["active"])
      })
    })

    e.target.classList.add(style["active"])
  }

  return (
    <>
      <Header />
      <div className={style["container"]}>
        <div
          className={style["top-section"]}
          style={{
            "--background-image": `url(${bgImage})`,
          }}>
          <div className={style["content"]}>
            <div className={style["rating"]}>
              <img src={Star} />
              <p>{data.avg && Math.round(data.avg * 10) / 10}</p>
              <div
                ref={ratingRef}
                className={style["place-rating"]}
                style={{
                  "--rating-left-icon-filled": `url(${RatingLeft})`,
                  "--rating-left-icon-hollow": `url(${RatingLeftHollow})`,
                  "--rating-right-icon-filled": `url(${RatingRight})`,
                  "--rating-right-icon-hollow": `url(${RatingRightHollow})`,
                }}>
                <div className={style["star"]}>
                  <div
                    selectionindex={9}
                    className={[style["left"], style["active"]].join(" ")}
                  />
                  <div selectionindex={10} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={7} className={style["left"]} />
                  <div selectionindex={8} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={5} className={style["left"]} />
                  <div selectionindex={6} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={3} className={style["left"]} />
                  <div selectionindex={4} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={1} className={style["left"]} />
                  <div selectionindex={2} className={style["right"]} />
                </div>
              </div>

              <img
                ref={ratingResultRef}
                className={style["rating-result"]}
                src={Checkmark}
              />
            </div>
          </div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <ReservationBar />
          <div className={style["scroll-encouragement"]}>
            Scroll down to see more
            <img src={MouseArrow} />
          </div>
        </div>

        <div className={style["main-content"]}>
          <div className={style["lower-navbar"]}>
            <div className={style["left"]}>
              <div
                className={style["active"]}
                onClick={(e) => onLowerNavbarItemClick(e, "products")}>
                Products
              </div>
              <div onClick={(e) => onLowerNavbarItemClick(e, "info")}>Info</div>
              <div onClick={(e) => onLowerNavbarItemClick(e, "reviews")}>
                Reviews
                {
                  reviewData.length > 0 && (
                    <div className={style["info-display"]}>{reviewData.length }</div>
                  )
                }
              </div>
            </div>

            <div className={style["right"]}>
              <div onClick={(e) => onLowerNavbarItemClick(e, "cart")}>
                <p>Your order</p>
                <div className={style["info-display"]}>{cart?.totalItems || 0}</div>
                <div className={style["info-display"]}>€{cart?.total.toFixed(2) || 0}</div>
              </div>
            </div>
          </div>
          <div className={style["content"]}>
            {section == "products" && renderProducts()}
            {section == "info" && renderInfoSection()}
            {section == "reviews" && renderReviewSection()}
            {section == "cart" && renderCartSection()}
            <br />
          </div>
        </div>
      </div>
    </>
  )
}
