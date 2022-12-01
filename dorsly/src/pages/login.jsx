import React from "react"

import "../static/css/auth.css"
import "../static/css/general.css"

import Logo from "/assets/svg/dorslylogo.svg"
import Illustration from "/assets/svg/illustration.svg"
import Seperator from "/assets/svg/seperator.svg"

import FacebookLogo from "/assets/svg/Facebook.svg"
import GoogleLogo from "/assets/svg/Google.svg"
import TwitterLogo from "/assets/svg/Twitter.svg"
import AppleLogo from "/assets/svg/Apple.svg"


import LabeledInputField from "../components/labeledInputField"

export default function login() {
  const handleLogoButtonClick = () => {
    window.location.href ='/'
  }


  return (
    <>
      <div className="auth-container">
        <div className="content-field">
          <div className="illustration">
            <img src={Illustration} />
            <button onClick={e => {handleLogoButtonClick()}}><img className="logo" src={Logo} /></button>
          </div>
          <form>
            <h1>Welcome, we are glad<br/>to have you here</h1>
            <img className="sperator" src={Seperator} />
            <h2>Log in</h2>
            <LabeledInputField label="Name" inputName="name"/>
            <LabeledInputField label="Surname" inputName="surname"/>

            <button className="next-step">Next step</button>
            <p>or</p>
            <div className="third-party-auth-options">
              <a href="https://tempurl.com/"><img src={FacebookLogo}/></a>
              <a href="https://tempurl.com/"><img src={GoogleLogo}/></a>
              <a href="https://tempurl.com/"><img src={TwitterLogo}/></a>
              <a href="https://tempurl.com/"><img src={AppleLogo}/></a>
            </div>
            <p>Already have an account? <a href="/signin">Sign in</a></p>
          </form>
        </div>
      </div>
    </>
  )
}
