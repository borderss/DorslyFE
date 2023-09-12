import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { apiMethod, bearerHeaders, defaultHeaders } from "../static/js/util"

import style from "../static/css/reservationBar.module.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import PersonIcon from "/assets/svg/person.svg"

import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function reservationBar(props) {
  const { user, token, setUser, setToken } = useContext(UserContext)
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)

  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [personCount, setPersonCount] = useState(1)

  const [personText, setPersonText] = useState("Person")

  useEffect(() => {
    const currdate = new Date()
    const year = currdate.getFullYear()
    const month = currdate.getMonth() + 1
    const day = currdate.getDate()
    const hours = currdate.getHours()
    const minutes = currdate.getMinutes()

    let inputDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`
    let inputTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`

    setDate(inputDate)
    setTime(inputTime)
  }, [])

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const handlePersonCountChange = (e) => {
    let numRegex = /^\d+$/

    if (e.target.value.match(numRegex) != null || e.target.value == "") {
      setPersonCount(e.target.value)
      if (e.target.value > 1) {
        setPersonText("People")
      } else {
        setPersonText("Person")
      }

      if (e.target.value > 25) {
        setPersonCount(25)
      } else if (e.target.value < 1) {
        setPersonCount(1)
      }

      if (e.target.value.length > 1) {
        e.target.style.width = "22px"
      } else {
        e.target.style.width = "17px"
      }
    } else {
      e.target.value[-1] = ""
    }
  }

  const focusChildInput = (e) => {
    e.target.closest("div").querySelector("input").focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let data = Object.fromEntries(formData.entries())
    data.personCount = parseInt(data.personCount)

    if (!user) {
      createPopup(
        "Login Required",
        <p>You must be logged in to make a reservation.</p>,
        "error",
        "Login Now",
        () => {
          navigate("/login")
        },
        "Close"
      )
      return
    }

    // {
    //   "point_of_interest_id": 10,
    //   "date": "2023-02-15 12:42",
    //   "people": 5
    // }

    console.log({
      point_of_interest_id: props.poi_id,
      date: `${date} ${time}`,
      people: personCount,
    })

    
    let promise = await apiMethod("/createDeal", {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify({
        point_of_interest_id: props.poi_id,
        date: `${date} ${time}`,
        people: personCount,
      })
    })

    console.log(promise.data)

    if (!promise?.data?.id) {
      createPopup(
        "Reservation Failed",
        <p>{promise.message}</p>,
        "error",
        "Close",
        () => {
          e.target.disabled = false
        }
      )
    } else {
      createPopup(
        "Reservation Successful",
        <p>Your reservation has been made! Go to <a href="/profile">Your profile</a> to check it out!</p>,
        "success",
        "Close",
        () => {
          e.target.disabled = false
        }
      )
    }
  }

  return (
    <form className={style["search-field"]} onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        className={style["date"]}
        value={date}
        onChange={handleDateChange}
        style={{ "--calendarSvg": `url(${CalendarIcon})` }}
      />
      <input
        type="time"
        name="time"
        className={style["time"]}
        value={time}
        onChange={handleTimeChange}
        style={{ "--clockSvg": `url(${ClockIcon})` }}
      />

      <div
        className={style["person-box"]}
        onClick={focusChildInput}
        style={{
          "--personSvg": `url(${PersonIcon})`,
        }}>
        <input
          type="text"
          name="personCount"
          className={style["person-count"]}
          pattern="[0-9]*"
          placeholder="1"
          onInput={handlePersonCountChange}
          value={personCount}
        />
        <span>{personText}</span>
      </div>

      <button style={{ marginBlock: "3px" }}>Reserve</button>
    </form>
  )
}
