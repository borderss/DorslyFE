import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Header from "../components/header"
import Partner from "../components/partner"
import MainSarchBar from "../components/mainSearchBar"


import CalendarIllustration from "/assets/svg/calendarillustration.svg"
import PhoneGlobeIllustration from "/assets/svg/phoneglobeillustration.svg"
import WalletIllustration from "/assets/svg/walletillustration.svg"

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

          <MainSarchBar />

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
