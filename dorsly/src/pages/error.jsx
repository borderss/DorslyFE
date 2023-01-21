import React from "react"
import { Link } from "react-router-dom"

import style from "../static/css/error.module.css"
import "../static/css/general.css"

import ErrorIcon from "/assets/svg/error.svg"

export default function error() {
  return (
    <>
      <div className={style["container"]}>
        <img src={ErrorIcon} />
        <h1>Error</h1>
        <p>Something went wrong. Please try again later.</p>

        <Link to="/">Go back to home</Link>
      </div>
    </>
  )
}
