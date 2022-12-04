import React, { useEffect, useRef, useState } from "react"

import auth from "../static/css/auth.module.css"
import "../static/css/general.css"

import Logo from "/assets/svg/dorslylogo.svg"
import Illustration from "/assets/svg/illustration.svg"
import Seperator from "/assets/svg/seperator.svg"

import AppleLogo from "/assets/svg/Apple.svg"
import FacebookLogo from "/assets/svg/Facebook.svg"
import GoogleLogo from "/assets/svg/Google.svg"
import TwitterLogo from "/assets/svg/Twitter.svg"

import LabeledInputField from "../components/labeledInputField"

export default function login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let submitButtonRef = useRef(null)

  const handleLogoButtonClick = () => {
    window.location.href = "/"
  }

  const setLoginButton = () => {
    if (email && password) {
      submitButtonRef.current.disabled = false
    } else {
      submitButtonRef.current.disabled = true
    }
  }

  useEffect(() => {
    setLoginButton()
  }, [email, password])

  const handleLogin = () => {
    window.location.href = "/"
  }

  const handleInputChange = (inputType, value) => {
    switch (inputType) {
      case "email":
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (value.match(emailRegex)) {
          setEmail(value)
          return true
        } else {
          setEmail("")
          return false
        }
      case "password":
        if (value.length > 8) {
          setPassword(value)
          return true
        } else {
          setPassword("")
          return false
        }
      default:
        console.warn("invalid input.")
        break
    }
  }

  document.body.style.backgroundImage = 'url("/assets/svg/backgroundlines.svg")'

  return (
    <>
      <div className={auth["auth-container"]}>
        <div className={auth["content-field"]}>
          <div className={auth["illustration"]}>
            <img src={Illustration} />
            <button
              onClick={(e) => {
                handleLogoButtonClick()
              }}>
              <img className={auth["logo"]} src={Logo} />
            </button>
          </div>
          <form>
            <h1>
              Welcome, we are glad
              <br />
              to have you here
            </h1>
            <img className={auth["sperator"]} src={Seperator} />
            <h2>Log in</h2>

            <LabeledInputField
              label="Email"
              inputName="email"
              inputType="email"
              handleInputChange={handleInputChange}
            />
            <LabeledInputField
              label="Password"
              inputName="password"
              inputType="password"
              handleInputChange={handleInputChange}
            />

            <button ref={submitButtonRef} className={auth["submit"]} disabled>
              Log in
            </button>
            <p>or</p>
            <div className={auth["third-party-auth-options"]}>
              <a href="/facebookauth">
                <img src={FacebookLogo} />
              </a>
              <a href="googleauth">
                <img src={GoogleLogo} />
              </a>
              <a href="twitterauth">
                <img src={TwitterLogo} />
              </a>
              <a href="appleauth">
                <img src={AppleLogo} />
              </a>
            </div>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
