import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { logoutUser } from "../static/js/util"

import LocationPicker from "./locationPicker"

import style from "../static/css/header.module.css"
import LogoIcon from "/assets/svg/dorslylogo.svg"
import GpsIcon from "/assets/svg/gps.svg"
import ProfileIcon from "/assets/svg/profileIcon.svg"
import SearchIcon from "/assets/svg/search.svg"

import AdminIcon from "/assets/svg/admin.svg"
import LogoutIcon from "/assets/svg/logout.svg"
import SecondaryProfileIcon from "/assets/svg/secondaryProfileIcon.svg"
import SettingsIcon from "/assets/svg/settings.svg"

import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function header() {
  const userContext = useContext(UserContext)
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { createPopup } = useContext(PopupContext)

  const [locationPickerVisible, setLocationPickerVisible] = useState(false)

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

  const handleLogoClick = (e) => {
    if (e.target.closest(`.${style["profile-logo-button"]}`)) {
      const profileDropdown = document.querySelector(
        `.${style["profile-dropdown"]}`
      )
      profileDropdown.classList.toggle(style["profile-dropdown-active"])
    }
  }

  const handleOutsideClick = (event) => {
    const handleClickOutsideDropdown = (e) => {
      if (e.target.closest(`.${style["profile-logo-button"]}`)) {
        return
      }
      const profileDropdown = document.querySelector(
        `.${style["profile-dropdown"]}`
      )
      profileDropdown?.classList.remove(style["profile-dropdown-active"])

      window.removeEventListener("click", handleOutsideClick)
    }

    const handleClickOutsideLocationPicker = (e) => {
      if (e.target.closest(`.${style["gps-icon"]}`)) {
        return
      }
      setLocationPickerVisible(false)
      window.removeEventListener("click", handleOutsideClick)
    }

    handleClickOutsideDropdown(event)
    // handleClickOutsideLocationPicker(event)
  }

  const handleGpsIconClick = (e) => {
    if (e.target.classList.contains("click-target")) {
      setLocationPickerVisible(!locationPickerVisible)
    }
  }

  window.addEventListener("click", (e) => handleOutsideClick(e))

  useEffect(() => {
    setUserOptions(
      userContext.user ? (
        <div
          className={style["profile-logo"]}
          onClick={(e) => handleLogoClick(e)}>
          <div className={style["profile-logo-button"]}>
            <img src={ProfileIcon} alt="profile" />
            <span>{userContext.user?.first_name}</span>
            <span>{userContext.user?.last_name}</span>
          </div>
          <div className={style["profile-dropdown"]}>
            <Link
              to="/profile"
              state={{
                defaultSection: "reservations",
              }}
              style={{ "--background-icon": `url(${SecondaryProfileIcon})` }}>
              Profile
            </Link>
            <Link
              to="/profile"
              state={{
                defaultSection: "settings",
              }}
              style={{ "--background-icon": `url(${SettingsIcon})` }}>
              Settings
            </Link>
            {userContext.user?.is_admin == 1 && (
              <Link
                to="/admin"
                style={{ "--background-icon": `url(${AdminIcon})` }}>
                Admin
              </Link>
            )}
            {userContext.user?.roles.includes('business_manager') && (
              <Link
                to="/business"
                style={{ "--background-icon": `url(${AdminIcon})` }}>
                Business
              </Link>
            )}
            <Link
              to="/"
              style={{ "--background-icon": `url(${LogoutIcon})` }}
              onClick={(e) => logoutUser(user, token, setUser, setToken)}>
              Log out
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Link to="/login">
            <div className={style["log-in"]}>Log in</div>
          </Link>
          <Link to="/register">
            <div className={style["register"]}>Register</div>
          </Link>
        </>
      )
    )
  }, [userContext.user, userContext.token])

  return (
    <div className={style["navbar"]}>
      <div className={style["wraper"]}>
        <div className={style["left-side"]}>
          <Link to="/" className={style["logo"]}>
            <div className={style["dorsly-logo"]}>
              <img src={LogoIcon} alt="Dorsly" />
            </div>
          </Link>
          <Link to="/aboutUs">
            <div className={style["about_us"]}>About us</div>
          </Link>
          <Link
            to="/contact_us"
            onClick={(e) => {
              e.preventDefault()
              createPopup(
                "Not implemented yet",
                <p>This feature hasn't been implemented yet. Sorry!</p>,
                "error",
                "Close"
              )
            }}>
            <div className={style["contact_us"]}>Contact</div>
          </Link>
          <Link to="/products">
            <div className={style["reserve-now"]}>Reserve now</div>
          </Link>
          <div
            className={style["search-logo"]}
            onClick={(e) => {
              e.preventDefault()
              createPopup(
                "Not implemented yet",
                <p>This feature hasn't been implemented yet. Sorry!</p>,
                "error",
                "Close"
              )
            }}>
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>
        <div className={style["right-side"]}>
          {userOptions}
          {(userContext.user) && (
            <div
              className={[style["gps-logo"], "click-target"].join(" ")}
              onClick={handleGpsIconClick}>
              <img className={"click-target"} src={GpsIcon} alt="GPS" />

              {(locationPickerVisible) && (
                <LocationPicker
                  containerStyle={{
                    width: "100%",
                    height: "450px",
                  }}
                  center={{
                    lat: 0,
                    lng: 0,
                  }}
                  handleClose={() => setLocationPickerVisible(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
