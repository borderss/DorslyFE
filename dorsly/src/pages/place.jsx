import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import ReservationBar from "../components/reservationBar"

import Checkmark from "/assets/svg/checkmark.svg"
import MouseArrow from "/assets/svg/mousearrow.svg"
import RatingLeft from "/assets/svg/ratingleft.svg"
import RatingLeftHollow from "/assets/svg/ratinglefthollow.svg"
import RatingRight from "/assets/svg/ratingright.svg"
import RatingRightHollow from "/assets/svg/ratingrighthollow.svg"
import Star from "/assets/svg/star.svg"

import style from "../static/css/place.module.css"

import Header from "../components/header"

export default function place(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const ratingRef = useRef(null)
  const ratingResultRef = useRef(null)

  const [data, setData] = useState([])
  const [userRating, setUserRating] = useState(4)
  const [bgImage, setBgImage] = useState(
    `https://picsum.photos/1920/1080/?random&t=${new Date().getTime()}`
  )

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

  // apiMethod("/points_of_interest/" + searchParams.get("p"), defaultHeaders()).then((data) => {
  //   console.log(data)
  //   setData(data)
  // })

  useEffect(() => {
    if (ratingRef.current != null) {
      ratingRef.current.childNodes.forEach((star) => {
        star.childNodes.forEach((icon) => {
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

    setData({
      id: 30,
      name: "Luella Frami",
      description:
        "Rem laboriosam dignissimos voluptates ut. Officiis libero veritatis impedit quae delectus voluptas. Consequatur occaecati et et sit est.",
      gps_lng: "-146.048615",
      gps_lat: "42.816474",
      country: "British Virgin Islands",
      images:
        "https://api.dorsly.com/api/point_of_interest/images/30?signature=7ef48ed2203d5c5b438e5c61d9d1abf105e1be65f49168775e7161da70c8f923",
      opens_at: "11:25:22",
      closes_at: "22:04:15",
      is_open_round_the_clock: false,
      is_takeaway: true,
      is_on_location: false,
      available_seats: 6,
      review_count: 7,
      avg: 5.894736842105263,
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
              <p>{Math.round(data.avg * 10) / 10}</p>
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
        <div className={style["lower-navbar"]}>
          <div className={style["left"]}>
            <div>Products</div>
            <div>Info</div>
            <div>
              <p>Reviews</p>
              <div className={style["info-display"]}>243</div>
            </div>
          </div>

          <div className={style["right"]}>
            <div>
              <p>Cart</p>
              <div className={style["info-display"]}>3</div>
            </div>
            <div>
              <div>Pay</div>
              <div className={style["info-display"]}>€13,24</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
