import React from "react"

import style from "../static/css/header.module.css"

import LogoIcon from "/assets/svg/dorslylogo.svg"
import GpsIcon from "/assets/svg/gps.svg"
import SearchIcon from "/assets/svg/search.svg"

export default function header() {
  return (
    <div className={style["navbar"]}>
      <div className={style["wraper"]}>
        <div className={style["left-side"]}>
          <a href="#">
            <div className={style["dorsly-logo"]}>
              <img src={LogoIcon} alt="Dorsly" />
            </div>
          </a>
          <a href="aboutus">
            <div className={style["about-us"]}>About us</div>
          </a>
          <a href="contact">
            <div className={style["contact"]}>Contact</div>
          </a>
          <a href="reserve">
            <div className={style["reserve-now"]}>Reserve now</div>
          </a>
          <div className={style["search-logo"]}>
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>

        <div className={style["right-side"]}>
          <a href="login">
            <div className={style["log-in"]}>Log in</div>
          </a>
          <a href="register">
            <div className={style["register"]}>Register</div>
          </a>
          <div className={style["gps-logo"]}>
            <img src={GpsIcon} alt="GPS" />
          </div>
        </div>
      </div>
    </div>
  )
}
