import React from "react"

import "../static/auth.css"
import "../static/general.css"

import Logo from "/assets/svg/dorslylogo.svg"
import Illustration from "/assets/svg/illustration.svg"
import Seperator from "/assets/svg/seperator.svg"


export default function login() {
  return (
    <>
      <div className="auth-container">
        <div className="content-field">
          <div className="illustration">
            <img src={Illustration} />
            <img className="logo" src={Logo} />
          </div>
          <form>
            <h1>Welcome, we are glad<br/>to have you here</h1>
            <img className="sperator" src={Seperator} />
            <h2>Log in</h2>
          </form>
        </div>
      </div>
    </>
  )
}
