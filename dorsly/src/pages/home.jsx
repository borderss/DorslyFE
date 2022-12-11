import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Header from "../components/header"
import Partner from "../components/partner"

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
            <div className={style["date"]}>

            </div>
            <div className={style["time"]}>

            </div>
            <div className={style["person-count"]}>

            </div>
            <div className={style["search"]}>

            </div>
          </div>
        </div>
      </div>

      <Partner />
    </>
  )
}
