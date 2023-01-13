import React, { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import PlaceLowerBackground from "/assets/svg/placelowerbackground.svg"

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
  
  const [data, setData] = useState([])
  const [userRating, setUserRating] = useState(Math.ceil(Math.random() * 10))
  
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
            setUserRating(e.target.getAttribute("selectionindex"))
          })
        })
      })
    }

    ratingRef.current.childNodes.forEach((star) => {
      star.childNodes.forEach((half) => {
        console.log(half)

        if (half.getAttribute("selectionIndex") == userRating) {
          half.classList.add(half.classList.item(0), style["active"])          
        }
        else {
          half.classList.remove(half.classList.item(1)) 
        }
      })
    })

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

  return (
    <>
      <Header />
      <div className={style["container"]}>
        <div
          className={style["top-section"]}
          style={{
            "--background-image": `url(https://picsum.photos/1920/1080/?random&t=${new Date().getTime()})`,
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
                  <div selectionIndex={10} className={[style["left"], style["active"]].join(" ")} />
                  <div selectionIndex={9} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionIndex={8} className={style["left"]} />
                  <div selectionIndex={7} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionIndex={6} className={style["left"]} />
                  <div selectionIndex={5} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionIndex={4} className={style["left"]} />
                  <div selectionIndex={3} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionIndex={2} className={style["left"]} />
                  <div selectionIndex={1} className={style["right"]} />
                </div>
              </div>
            </div>
          </div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>
        <div
          className={style["place-lower-bg"]}
          style={{
            "--background-image": `url(${PlaceLowerBackground})`,
          }}></div>
      </div>
    </>
  )
}
