import React from "react"

import style from "../static/css/home.module.css"

import { useEffect, useState } from "react"
import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import PersonIcon from "/assets/svg/person.svg"

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

      if (e.target.value.length > 1){
        console.log(e.target)
        e.target.style.width = "22px"
      } else {
        e.target.style.width = "15px"
      }
    } else {
      e.target.value[-1] = ""
    }
  }

  const focusChildInput = (e) => {
    e.target.children[0].focus()
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

      <div
        className={style["person-box"]}
        onClick={focusChildInput}
        style={{
          "--personSvg": `url(${PersonIcon})`,
        }}>
        <input
          type="text"
          className={style["person-count"]}
          pattern="[0-9]*"
          placeholder="1"
          onInput={handlePersonCountChange}
          value={personCount}
        />
        <span>{personText}</span>
      </div>

      <div className={style["search"]}>
        <img src={MainSearchIcon} />
        <p>Placeholder</p>
        <button>Search</button>
      </div>
    </div>
  )
}
