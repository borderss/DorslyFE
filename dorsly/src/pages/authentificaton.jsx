import React, { useContext, useEffect, useRef, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { loginUser, registerUser } from "../static/js/util.js"

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

import { UserContext } from "../contexts/userContext"

export default function authentificaton(props) {
  document.body.style.backgroundImage = 'url("/assets/svg/backgroundlines.svg")'

  const {user, token, setUser, setToken} = useContext(UserContext)
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  })

  const [regSection, setRegSection] = useState(0)
  const [registerData, setRegisternData] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    password: null,
    passwordConfirm: null,
  })

  let submitButtonRef = useRef(null)

  useEffect(() => {
    if (props.page == "login") {
      setLoginButton()
    }
  }, [loginData])

  useEffect(() => {
    if (props.page == "register") {
      setRegisterButton()
    }
  }, [registerData])

  const handleLogoButtonClick = () => {
    navigate("/")
  }

  const setLoginButton = () => {
    if (submitButtonRef.current) {
      if (loginData.email && loginData.password) {
        submitButtonRef.current.disabled = false
      } else {
        submitButtonRef.current.disabled = true
      }
    }
  }

  const setRegisterButton = () => {
    if (!submitButtonRef.current) return

    if (regSection == 0) {
      if (
        registerData.firstName &&
        registerData.lastName &&
        registerData.phoneNumber
      ) {
        submitButtonRef.current.disabled = false
      } else {
        submitButtonRef.current.disabled = true
      }
    } else if (regSection == 1) {
      if (
        registerData.email &&
        registerData.password &&
        registerData.passwordConfirm
      ) {
        submitButtonRef.current.disabled = false
      } else {
        submitButtonRef.current.disabled = true
      }
    }
  }

  const handleLoginInputChange = (inputName, value) => {
    if (!value) {
      return false
    }

    switch (inputName) {
      case "email":
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (value.match(emailRegex)) {
          setLoginData({ ...loginData, email: value })
          return true
        } else {
          setLoginData({ ...loginData, email: null })
          return false
        }

      case "password":
        if (value.length > 8) {
          setLoginData({ ...loginData, password: value })
          return true
        } else {
          setLoginData({ ...loginData, password: null })
          return false
        }
      default:
        break
    }
  }

  const handleRegisterInputChange = (inputName, value) => {
    if (!value) {
      return false
    }

    switch (inputName) {
      case "firstName":
        if (value.length > 0) {
          setRegisternData({ ...registerData, firstName: value })
          return true
        } else {
          setRegisternData({ ...registerData, firstName: null })
          return false
        }
      case "lastName":
        if (value.length > 0) {
          setRegisternData({ ...registerData, lastName: value })
          return true
        } else {
          setRegisternData({ ...registerData, lastName: null })
          return false
        }
      case "phoneNumber":
        let phoneNumRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/

        if (value.match(phoneNumRegex)) {
          setRegisternData({ ...registerData, phoneNumber: value })
          return true
        } else {
          setRegisternData({ ...registerData, phoneNumber: null })
          return false
        }

      case "email":
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (value.match(emailRegex)) {
          setRegisternData({ ...registerData, email: value })
          return true
        } else {
          setRegisternData({ ...registerData, email: null })
          return false
        }
      case "password":
        if (value.length > 8) {
          setRegisternData({ ...registerData, password: value })
          return true
        } else {
          setRegisternData({ ...registerData, password: null })
          return false
        }
      case "passwordConfirm":
        if (value.length > 8 && value == registerData.password) {
          setRegisternData({ ...registerData, passwordConfirm: value })
          return true
        } else {
          setRegisternData({ ...registerData, passwordConfirm: null })
          return false
        }

      default:
        break
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    loginUser(loginData).then((res) => {
      if (res === null) {
        console.log("Error logging in")
      } else {
        setUser(res.user)
        setToken(res.access_token)

        navigate("/")
      }
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (regSection == 0) {
      setRegSection(1)
      return
    }

    console.log("Registering: ", registerData)

    const res = await registerUser(registerData)

    console.log(res)

    if (res === null) {
      console.log("Error registering user")
    }
  }

  let formSection

  if (props.page == "login") {
    formSection = (
      <form onSubmit={(e) => handleLogin(e)}>
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
          handleInputChange={handleLoginInputChange}
        />
        <LabeledInputField
          label="Password"
          inputName="password"
          inputType="password"
          handleInputChange={handleLoginInputChange}
        />

        <button ref={submitButtonRef} className={auth["actionBtn"]} disabled>
          Log in
        </button>
        <p className={auth["sectionSeperator"]}>or</p>
        <div className={auth["third-party-auth-options"]}>
          <Link to="/facebookauth">
            <img src={FacebookLogo} />
          </Link>
          <Link to="googleauth">
            <img src={GoogleLogo} />
          </Link>
          <Link to="twitterauth">
            <img src={TwitterLogo} />
          </Link>
          <Link to="appleauth">
            <img src={AppleLogo} />
          </Link>
        </div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    )
  } else if (props.page == "register") {
    formSection = (
      <form onSubmit={(e) => handleRegister(e)}>
        <h1>Create a new account!</h1>
        <img className={auth["sperator"]} src={Seperator} />
        <h2>Register</h2>

        {regSection == 0 ? (
          <>
            <LabeledInputField
              label="First Name"
              inputName="firstName"
              handleInputChange={handleRegisterInputChange}
            />
            <LabeledInputField
              label="Last Name"
              inputName="lastName"
              handleInputChange={handleRegisterInputChange}
            />
            <LabeledInputField
              label="Phone number"
              inputName="phoneNumber"
              placeholder="+1 123 456 7890"
              handleInputChange={handleRegisterInputChange}
            />
          </>
        ) : null}
        {regSection == 1 ? (
          <>
            <LabeledInputField
              label="Email"
              inputName="email"
              inputType="email"
              handleInputChange={handleRegisterInputChange}
            />
            <LabeledInputField
              label="Password"
              inputName="password"
              inputType="password"
              handleInputChange={handleRegisterInputChange}
            />
            <LabeledInputField
              label="Password Confirmation"
              inputName="passwordConfirm"
              inputType="password"
              handleInputChange={handleRegisterInputChange}
            />
          </>
        ) : null}

        <button
          ref={submitButtonRef}
          onSubmit={(_) => console.log(registerData)}
          className={auth["actionBtn"]}
          disabled>
          Next step
        </button>
        <p className={auth["sectionSeperator"]}>or</p>
        <div className={auth["third-party-auth-options"]}>
          <Link to="/facebookauth">
            <img src={FacebookLogo} />
          </Link>
          <Link to="googleauth">
            <img src={GoogleLogo} />
          </Link>
          <Link to="twitterauth">
            <img src={TwitterLogo} />
          </Link>
          <Link to="appleauth">
            <img src={AppleLogo} />
          </Link>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    )
  }

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
          {formSection}
        </div>
      </div>
    </>
  )
}
