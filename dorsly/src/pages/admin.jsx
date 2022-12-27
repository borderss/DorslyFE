import React, { useContext } from "react"
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

  return (
    <>
      <Header />
      <div className={style["main-container"]}>
        <div className={style["side-navbar"]}>
          <div className={style["greeting"]}>
            <h1>Hello, {user.first_name}</h1>
            <p>Report any issues to admin@dorsly.com</p>
          </div>

          <Link style={{ "--nav-item-icon": `url(${PeopleIcon})` }}>
            Accounts
          </Link>
          <Link style={{ "--nav-item-icon": `url(${GPSIcon})` }}>
            Points of interest
          </Link>
          <Link style={{ "--nav-item-icon": `url(${CalendarIcon})` }}>
            Reservations
          </Link>
          <Link style={{ "--nav-item-icon": `url(${TakeawayIcon})` }}>
            Pre-purchases
          </Link>
          <Link style={{ "--nav-item-icon": `url(${CommentIcon})` }}>
            Reviews
          </Link>

          <div className={style["version-data"]}>
            <p>Version 1.0.0 {import.meta.env.MODE}</p>

            <p>© 2022 Dorsly</p>
          </div>
        </div>
      </div>
    </>
  )
}
