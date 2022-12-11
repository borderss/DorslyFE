import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Header from "../components/header"
import Partner from "../components/partner"

import PhoneIllustration from "/assets/svg/phoneillustration.svg"
import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import PersonIcon from "/assets/svg/person.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import DropdownIcon from "/assets/svg/dropdown.svg"



export default function home() {
  return (
    <>
      <Header />

      <div className={style["header-content"]}>
        <img className={style["phoneIllustration"]} src={PhoneIllustration} />

        <div>
          <h1>
            Dont worry about<br/>
            reservations ever again
          </h1>
          <p>
            We are here to help you make informed decisions about<br />
            all of your reservations.
          </p>
          <div className={style["search-field"]}>
            <div className={style["date"]}>
              <img src={CalendarIcon}/>
              <p>Sep 17, 2022</p>
              <img src={DropdownIcon}/>
            </div>
            <div className={style["time"]}>
              <img src={ClockIcon}/>
              <p>00:00</p>
              <img src={DropdownIcon}/>
            </div>
            <div className={style["person-count"]}>
              <img src={PersonIcon}/>
              <p>55 people</p>
              <img src={DropdownIcon}/>
            </div>
            <div className={style["search"]}>
              <img src={MainSearchIcon}/>
              <p>Placeholder</p>
              <button>Search</button>
            </div>
          </div>
          <p className={style["seperator"]}>
            Alternatively,
          </p>
          <div className={style["actions"]}>
            <button>Register now</button>
            <button className={style["inverted"]}>Register as a business</button>
          </div>
        </div>
      </div>

      <Partner />
    </>
  )
}
