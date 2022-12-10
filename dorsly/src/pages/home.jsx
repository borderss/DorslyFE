import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Footer from "../components/footer"
import Header from "../components/header"
import Partner from "../components/partner"


export default function home() {
  return (
    <>
      <Header />

      <div className={style["content"]}>


      </div>


      <Partner/>
    </>
  )
}
