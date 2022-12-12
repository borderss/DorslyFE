import React, {useRef} from "react";

import style from "../static/css/home.module.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import ClockIcon from "/assets/svg/clock.svg"
import DropdownIcon from "/assets/svg/dropdown.svg"
import MainSearchIcon from "/assets/svg/mainsearch.svg"
import PersonIcon from "/assets/svg/person.svg"

export default function mainSearchBar() {
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  React.useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
  
    dateRef.current.value = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
    timeRef.current.value = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
  }, [])

  return (
    <div className={style["search-field"]}>
      <input ref={dateRef} type="date" className={style["date"]}style={{"--calendarSvg": `url(${CalendarIcon})`}}/>
      <input ref={timeRef} type="time" className={style["time"]} style={{"--clockSvg": `url(${ClockIcon})`}}/>

      <div className={style["person-count"]}>
        <img src={PersonIcon}/>
        <p>55 people</p>
        <img src={DropdownIcon}/>
      </div>
      <div className={style["search"]}>
        <img src={MainSearchIcon}/>
        <p>Placeholder</p>
        <button>Search</button>
      </div>
    </div>
  )
}
