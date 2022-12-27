import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"

import Header from "../components/header"

import style from "../static/css/admin.module.css"
import "../static/css/general.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import GPSIcon from "/assets/svg/gps2.svg"
import PeopleIcon from "/assets/svg/people.svg"
import CommentIcon from "/assets/svg/reviewlogo.svg"
import TakeawayIcon from "/assets/svg/takeaway.svg"

import { UserContext } from "../contexts/userContext"

export default function test() {
  const { user, token, setUser, setToken } = useContext(UserContext)

  const [section, setSection] = useState("accounts")

  const onNavbarItemClick = (e) => {
    setSection(e.target.id)

    ;[...document.querySelectorAll(`.${style["side-navbar"]} > p`)].forEach((el, i) => {
      el.classList.remove(style["navbar-item-active"])
    })

    e.target.classList.toggle(style["navbar-item-active"])
  }

  return (
    <>
      <Header />
      <div className={style["main-container"]}>
        <div className={style["side-navbar"]}>
          <div className={style["greeting"]}>
            <h1>Hello, {user.first_name}</h1>
            <p>Report any issues to admin@dorsly.com</p>
          </div>

          <p id="accounts" className={style["navbar-item-active"]} style={{ "--nav-item-icon": `url(${PeopleIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Accounts
          </p>
          <p id="pointsofinterest" style={{ "--nav-item-icon": `url(${GPSIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Points of interest
          </p>
          <p id="reservations" style={{ "--nav-item-icon": `url(${CalendarIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Reservations
          </p>
          <p id="prepurchases" style={{ "--nav-item-icon": `url(${TakeawayIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Pre-purchases
          </p>
          <p id="reviews" style={{ "--nav-item-icon": `url(${CommentIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Reviews
          </p>

          <div className={style["version-data"]}>
            <p>Version 1.0.0 {import.meta.env.MODE}</p>

            <p>© 2022 Dorsly</p>
          </div>
        </div>
        {section}
      </div>
    </>
  )
}
