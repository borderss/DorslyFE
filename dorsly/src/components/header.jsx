import React from "react"
import "../static/header.css"
import LogoIcon from '/assets/svg/dorslyheader.svg'
import SearchIcon from '/assets/svg/search.svg'
import GpsIcon from '/assets/svg/gps.svg'


export default function header() {
  return (
    <div className="navbar">
      <div className="wraper">
        <div className="left-side">
          <div className="dorsly-logo">
            <img src={LogoIcon} alt="Dorsly" />
          </div>
          <div className="about-us">About us</div>
          <div className="contact">Contact</div>
          <div className="reserve-now">Reserve now</div>
          <div className="search-logo">
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>

        <div className="right-side">
          <div className="log-in">Log in</div>
          <div className="register">Register</div>
          <div className="gps-logo">
            <img src={GpsIcon} alt="GPS" />
          </div>
        </div>
      </div>
    </div>
  )
}
