import React from "react"

import "../static/header.css"
import LogoIcon from "/assets/svg/dorslylogo.svg"
import GpsIcon from "/assets/svg/gps.svg"
import SearchIcon from "/assets/svg/search.svg"

export default function header() {
  return (
    <div className="navbar">
      <div className="wraper">
        <div className="left-side">
          <a href="#">
          <div className="dorsly-logo">
            <img src={LogoIcon} alt="Dorsly" />
          </div>
          </a>
          <a href="about_us">
          <div className="about-us">About us</div>
          </a>
          <a href="contact">
          <div className="contact">Contact</div>
          </a>
          <a href="reserve_now">
          <div className="reserve-now">Reserve now</div>
          </a>
          <div className="search-logo">
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>

        <div className="right-side">
          <a href="log_in">
          <div className="log-in">Log in</div>
          </a>
          <a href="register">
          <div className="register">Register</div>
          </a>
          <div className="gps-logo">
            <img src={GpsIcon} alt="GPS" />
          </div>
        </div>
      </div>
    </div>
  )
}
