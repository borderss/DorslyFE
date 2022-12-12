import React from "react"

import style from "../static/css/home.module.css"

import { useEffect, useState } from "react"
import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import PersonIcon from "/assets/svg/person.svg"
import { useRef } from "react"

export default function mainSearchBar() {
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
    e.target.innerText = e.target.innerText.replace(/[^0-9]/g, "").slice(0, 2)

    if (e.target.innerText === "") {
      e.target.innerText = 1
    }

    if (e.target.innerText > 25) {
      e.target.innerText = 25
    }

    if (e.target.innerText.startsWith("0") && e.target.innerText.length > 1) {
      e.target.innerText = e.target.innerText.slice(1)
    }

    if (e.target.innerText === "1") {
      setPersonText("Person")
    } else {
      setPersonText("People")
    }


    setPersonCount(e.target.innerText)
  }

  return (
    <div className={style["search-field"]}>
      <input
        type="date"
        className={style["date"]}
        value={date}
        onChange={handleDateChange}
        style={{ "--calendarSvg": `url(${CalendarIcon})` }}
      />
      <input
        type="time"
        className={style["time"]}
        value={time}
        onChange={handleTimeChange}
        style={{ "--clockSvg": `url(${ClockIcon})` }}
      />

      <div className={style["person-count"]}>
        <img src={PersonIcon} />
        <p><span className={style["person-count-input"]} onInput={handlePersonCountChange} contentEditable>{personCount}</span><span> {personText}</span></p>
      </div>
      <div className={style["search"]}>
        <img src={MainSearchIcon} />
        <p>Placeholder</p>
        <button>Search</button>
      </div>
    </div>
  )
}
