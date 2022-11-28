import React from "react"

import "../static/auth.css"
import "../static/general.css"

import Logo from "/assets/svg/dorslylogo.svg"
import Illustration from "/assets/svg/illustration.svg"

export default function login() {
  return (
    <>
      <div className="auth-container">
        <div className="content-field">
          <div className="illustration">
            <img src={Illustration} />
            <img className="logo" src={Logo} />
          </div>
          <div className="form"></div>
        </div>
      </div>
    </>
  )
}
