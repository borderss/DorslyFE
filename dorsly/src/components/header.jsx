import React, { useContext, useState } from "react"

import style from "../static/css/header.module.css"
import LogoIcon from "/assets/svg/dorslylogo.svg"
import GpsIcon from "/assets/svg/gps.svg"
import ProfileIcon from "/assets/svg/profileIcon.svg"
import SearchIcon from "/assets/svg/search.svg"

// import user context and use it
import { useEffect } from "react"
import { UserContext } from "../contexts/userContext"
import { Link } from "react-router-dom"

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

  useEffect(() => {
    console.log(userContext)
    setUserOptions(userContext.user ? (
      <div className={style["profile-logo"]}>
        <img src={ProfileIcon} alt="profile" />
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
