import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../static/css/general.css"
import style from "../static/css/profile.module.css"

import Header from "../components/header"

import { useEffect } from "react"
import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function profile() {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const [section, setSection] = useState("reservations")

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.backgroundImage = ""
  }, [])

  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
  }, [user])

  const onLowerNavbarItemClick = (e, section) => {
    if (section === "logout") {
      setUser(null)
      setToken(null)
      localStorage.removeItem("token")
      navigate("/login")
    } else {
      setSection(section)
    }
  }

  const renderSection = (section) => {
    switch (section) {
      case "reservations":
        return <p>Reservations</p>
      case "reviews":
        return <p>Reviews</p>
      case "ratings":
        return <p>Ratings</p>
      case "settings":
        return <p>Settings</p>
      default:
        return <p>Reservations</p>
    }
  }

  return (
    <>
      <Header />
      <div className={style["container"]}>
        <div className={style["profile"]}>
          <div className={style["profile-header"]}>
            <h1 className={style["full-name"]}>
              {user?.first_name} {user?.last_name}
            </h1>

            <div className={style["profile-info"]}>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0</h2>
                <p className={style["profile-info-item-text"]}>Reservations</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0</h2>
                <p className={style["profile-info-item-text"]}>Reviews</p>
              </div>
              <div className={style["profile-info-item"]}>
                <h2 className={style["profile-info-item-title"]}>0.00$</h2>
                <p className={style["profile-info-item-text"]}>Total Spent</p>
              </div>
            </div>
          </div>
          <div className={style["lower-navbar"]}>
            <div className={style["left"]}>
              <div
                {...(section === "reservations" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "reservations")}>
                Reservations
              </div>
              <div
                {...(section === "reviews" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "reviews")}>
                Reviews
              </div>
              <div
                {...(section === "ratings" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "ratings")}>
                ratings
              </div>
              <div
                {...(section === "settings" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "settings")}>
                Settings
              </div>
            </div>

            <div className={style["right"]}>
              <div
                {...(section === "logout" && {
                  className: style["active"],
                })}
                onClick={(e) => onLowerNavbarItemClick(e, "logout")}>
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className={style["content"]}>
          {renderSection(section)}
          <br />
        </div>
      </div>
    </>
  )
}
