import React from "react"

import "../static/css/general.css"
import style from "../static/css/instruction.module.css"

import Header from "../components/header"

export default function instruction() {
  return (
    <>
      <Header />

      <div className={style["container"]}>
        Hello
      </div>
    </>
  )
}
