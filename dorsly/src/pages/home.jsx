import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Header from "../components/header"
import Partner from "../components/partner"

import CalendarIllustration from "/assets/svg/calendarillustration.svg"
import PhoneGlobeIllustration from "/assets/svg/phoneglobeillustration.svg"
import WalletIllustration from "/assets/svg/walletillustration.svg"


import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import DropdownIcon from "/assets/svg/dropdown.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import PersonIcon from "/assets/svg/person.svg"
import PhoneIllustration from "/assets/svg/phoneillustration.svg"



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
          <input type="date" className={style["date"]} style={{"--calendarSvg": `url(${CalendarIcon})`}}/>

            {/* <div className={style["date"]}>
              <img src={CalendarIcon}/>
              <input type="date"></input>
              <img src={DropdownIcon}/>
            </div> */}

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

        <div className={style["carousel"]}>

        </div>

        <div className={style["description"]}>
          <div>
            <img src={CalendarIllustration}/>
            <h2>Schedule any hour<br/>of any day</h2>
            <p>We try our best to help people the<br/>
              process of reservation as simple as possible.</p>
          </div>
          <div>
            <img src={WalletIllustration}/>
            <h2>Find options that fit your<br/>price range</h2>
            <p>Dorsly provides tools to search for the best<br/>
              restaurant in your selected price range.</p>
          </div>
          <div>
            <img src={PhoneGlobeIllustration}/>
            <h2>Freely make reservations<br/>anywhere across the globe</h2>
            <p>You can access our application and its services<br/>
              world wide.</p>
          </div>
        </div>
      </div>

      <Partner />
    </>
  )
}
