import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiMethod, defaultHeaders } from "../static/js/util.js"

import style from "../static/css/home.module.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import PersonIcon from "/assets/svg/person.svg"

export default function mainSearchBar() {
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [personCount, setPersonCount] = useState(1)
  const [searchText, setSearchText] = useState("")
  
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

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const focusChildInput = (e) => {
    e.target.closest("div").querySelector("input").focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let data = Object.fromEntries(formData.entries())
    data.personCount = parseInt(data.personCount)

    console.log(data)

    let date = data.date.split("-")
    let time = data.time.split(":")

    let dateTime = `${date[0]}-${date[1]}-${date[2]} ${time[0]}:${time[1]}`
    console.log(dateTime)

    apiMethod(`/points_of_interest?date=${dateTime}&seats=${data.personCount}${(searchText ? `&name=${searchText}` : "")}`, {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      console.log(data.data)

      navigate("/products", {
        replace: true,
        state: {
          data: data.data,
        },
      })
    })
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

      <div
        className={style["search"]}
        style={{ "--mainSearchIcon": `url(${MainSearchIcon})` }}>
        <input
          type="text"
          name="searchText"
          className={style["search-input"]}
          onChange={handleSearchTextChange}
          placeholder="Search..."
        />
        <button>Search</button>
      </div>
    </form>
  )
}
