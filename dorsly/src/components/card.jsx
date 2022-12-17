import React from "react"

import style from "../static/css/card.module.css"

import Clock from "/assets/svg/clock.svg"
import Gps2 from "/assets/svg/Gps2.svg"
import People from "/assets/svg/people.svg"
import Reviewlogo from "/assets/svg/reviewlogo.svg"
import Star from "/assets/svg/star.svg"
import Takeaway from "/assets/svg/takeaway.svg"

export default function card(props) {
  let containerstyle

  if (props.sideways) {
    containerstyle = style["containersideways"]
  } else {
    containerstyle = style["container"]
  }

  const onCardClick = (e) => {
    console.log("card clicked")
  
    window.location.href = "/place/" + props.data.id
  }

  return (
    <>
      <div className={containerstyle} onClick={onCardClick}>
        <div className={style["star"]}>
          <img src={Star} alt="" />
          <span>{props.data.star}</span>
        </div>
        <div className={style["mainimg"]} style={{"--imgUrl": `url(${props.data.imgurl})`}}>
        </div>
        <div className={style["desccon"]}>
          <div className={style["name"]}>{props.data.name}</div>
          <div className={style["desc"]}>{props.data.desc}</div>
          <div className={style["info"]}>
            <div className={style["clock"]}>
              <img src={Clock} alt="" />
              <p>{props.data.time}</p>
            </div>
            <div className={style["takeaway"]}>
              <img src={Takeaway} alt="" />
              <p>{props.data.place}</p>
            </div>
            <div className={style["people"]}>
              <img src={People} alt="" />
              <p>{props.data.seats}</p>
            </div>
            <div className={style["gps2"]}>
              <img src={Gps2} alt="" />
              <p>{props.data.gps}</p>
            </div>
            <div className={style["reviewlogo"]}>
              <img src={Reviewlogo} alt="" />
              <p>{props.data.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}