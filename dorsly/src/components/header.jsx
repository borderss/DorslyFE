import React, { useContext, useState } from "react"
import { logoutUser } from '../static//js/util.js'

import style from "../static/css/header.module.css"
import LogoIcon from "/assets/svg/dorslylogo.svg"
import GpsIcon from "/assets/svg/gps.svg"
import ProfileIcon from "/assets/svg/profileIcon.svg"
import SearchIcon from "/assets/svg/search.svg"

import SecondaryProfileIcon from "/assets/svg/secondaryProfileIcon.svg"
import SettingsIcon from "/assets/svg/settings.svg"
import LogoutIcon from "/assets/svg/logout.svg"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/userContext"

export default function header() {
  const [userOptions, setUserOptions] = useState(
    <>
      <Link to="login">
        <div className={style["log-in"]}>Log in</div>
      </Link>
      <Link to="register">
        <div className={style["register"]}>Register</div>
      </Link>
    </>
  )

  const userContext = useContext(UserContext)
  
  const handleLogoClick = (e) => {
    if (e.target.closest(`.${style["profile-logo-button"]}`)) {
      const profileDropdown = document.querySelector(`.${style["profile-dropdown"]}`)
      profileDropdown.classList.toggle(style["profile-dropdown-active"])
    }
  }

  const handleOutsideClick = (e) => {
    if (e.target.closest(`.${style["profile-logo-button"]}`)) {
      return
    }
    const profileDropdown = document.querySelector(`.${style["profile-dropdown"]}`)
    profileDropdown?.classList.remove(style["profile-dropdown-active"])

    window.removeEventListener("click", handleOutsideClick)
  }

  window.addEventListener("click", e => handleOutsideClick(e))
  
  useEffect(() => {
    setUserOptions(userContext.user ? (
      <div className={style["profile-logo"]} onClick={e => handleLogoClick(e)}>
        <div className={style["profile-logo-button"]}>
          <img src={ProfileIcon} alt="profile" />
          <span>{userContext.user?.first_name}</span>
          <span>{userContext.user?.last_name}</span>
        </div>
        <div className={[style["profile-dropdown"], style["profile-dropdown-active"]].join(" ")}>
          <Link to="/profile" style={{"--background-image": `url(${SecondaryProfileIcon})`}}>Profile</Link>
          <Link to="/settings" style={{"--background-image": `url(${SettingsIcon})`}}>Settings</Link>
          <Link to="/" style={{"--background-image": `url(${LogoutIcon})`}} onClick={logoutUser}>Log out</Link>
        </div>
      </div>
    ) : (
      <>
        <Link to="login">
          <div className={style["log-in"]}>Log in</div>
        </Link>
        <Link to="register">
          <div className={style["register"]}>Register</div>
        </Link>
      </>
    ))
  }, [userContext])

  return (
    <div className={style["navbar"]}>
      <div className={style["wraper"]}>
        <div className={style["left-side"]}>
          <Link to="#" className={style["logo"]}>
            <div className={style["dorsly-logo"]}>
              <img src={LogoIcon} alt="Dorsly" />
            </div>
          </Link>
          <Link to="about_us">
            <div className={style["about-us"]}>About us</div>
          </Link>
          <Link to="contact">
            <div className={style["contact"]}>Contact</div>
          </Link>
          <Link to="reserve_now">
            <div className={style["reserve-now"]}>Reserve now</div>
          </Link>
          <div className={style["search-logo"]}>
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>
        <div className={style["right-side"]}>
          {userOptions}
          <div className={style["gps-logo"]}>
            <img src={GpsIcon} alt="GPS" />
          </div>
        </div>
      </div>
    </div>
  )
}
