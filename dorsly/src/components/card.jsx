import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"

import style from "../static/css/card.module.css"

import Clock from "/assets/svg/clock.svg"
import Gps2 from "/assets/svg/gps2.svg"
import People from "/assets/svg/people.svg"
import Reviewlogo from "/assets/svg/reviewlogo.svg"
import Star from "/assets/svg/star.svg"
import Takeaway from "/assets/svg/takeaway.svg"

export default function card(props) {
  const navigate = useNavigate()
  const cardContainer = useRef(null)

  let containerstyle

  if (props.sideways) {
    containerstyle = style["cardContainerSideways"]
  } else {
    containerstyle = style["cardContainer"]
  }

  const onCardClick = (e) => {
    if (cardContainer.current.parentNode.hasAttribute("dragging")) {
      cardContainer.current.parentNode.removeAttribute("dragging")
      return
    }

    navigate("/place?p=" + props.data?.id, { state: { place: props.data } })
  }

  return (
    <div ref={cardContainer} className={containerstyle} onClick={onCardClick}>
      {
        props.data?.avg && (
          <div className={style["star"]}>
            <img src={Star} alt="" />
            <span>{Math.round(props.data?.avg * 10)/10}</span>
          </div>
        )
      }
      <div
        className={style["mainimg"]}
        style={{ "--imgUrl": `url(${props.data?.imgurl || `https://picsum.photos/seed/picsum/560/700?radnom=${Math.floor(Math.random()*100)}`})` }}></div>
      <div className={style["desccon"]}>
        <div className={style["name"]}>{props.data?.name}</div>
        <div className={style["desc"]}>{props.data?.desc}</div>
        <div className={style["info"]}>
          <div className={style["clock"]}>
            <img src={Clock} alt="" />
            {props.data?.is_open_round_the_clock == 1 ? (
              <p>24 hours a day</p>
            ) : (
              <p>
                {props?.data?.opens_at.slice(0, 5)}-
                {props?.data?.closes_at.slice(0, 5)}
              </p>
            )}
          </div>

          {props.data?.is_takeaway == 1 && props.data?.is_on_location == 0 ? (
            <div className={style["takeaway"]}>
              <img src={Takeaway} alt="" />
              <p>Takeaway</p>
            </div>
          ) : (
            props.data?.is_takeaway == 0 &&
            props.data?.is_on_location == 1 && (
              <div className={style["takeaway"]}>
                <img src={Takeaway} alt="" />
                <p>On location</p>
              </div>
            )
          )}
          <div className={style["people"]}>
            <img src={People} alt="" />
            <p>{props.data?.available_seats}</p>
          </div>
          <div className={style["gps2"]}>
            <img src={Gps2} alt="" />
            <p>1.5km</p>
          </div>
          <div className={style["reviewlogo"]}>
            <img src={Reviewlogo} alt="" />
            <p>{props.data?.review_count}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
