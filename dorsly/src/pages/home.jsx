import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Footer from "../components/footer"
import Header from "../components/header"
import Partner from "../components/partner"

import PhoneIllustration from "/assets/svg/phoneillustration.svg"

export default function home() {
  return (
    <>
      <Header />

      <div className={style["content"]}>
      <img className={style["phoneIllustration"]} src={PhoneIllustration}/>

      </div>


      <Partner/>
    </>
  )
}
