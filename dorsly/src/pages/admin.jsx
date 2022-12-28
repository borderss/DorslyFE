import React, { useContext, useState, useEffect } from "react"

import Header from "../components/header"

import style from "../static/css/admin.module.css"
import "../static/css/general.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import GPSIcon from "/assets/svg/gps2.svg"
import PeopleIcon from "/assets/svg/people.svg"
import CommentIcon from "/assets/svg/reviewlogo.svg"
import TakeawayIcon from "/assets/svg/takeaway.svg"

import { UserContext } from "../contexts/userContext"

export default function test() {
  const { user, token, setUser, setToken } = useContext(UserContext)

  const [section, setSection] = useState("accounts")

  const [sectionInfo, setSectionInfo] = useState({
    title: 'Account overview',
    desc: 'Overview account information such as username, name, surname, email, registration date, date of last change, etc.'
  })

  useEffect(()=>{
    switch (section) {
      case "accounts":
        setSectionInfo({
          title: 'Account overview',
          desc: 'Overview, edit or delete account information such as username, name, surname, email, registration date, date of last change, etc.'
        })
        break;

      case "pointsofinterest":
        setSectionInfo({
          title: 'Point of interest overview',
          desc: 'Check interest data, for example, name, description, creation date, number of reservations/pre-purchases fulfilled, and other general satistical data.'
        })
        break;
    
      case "reservations":
        setSectionInfo({
          title: 'Reservations overview',
          desc: 'Search through reservation data, such as the billed person\'s account ID, relevant POI\'s ID, reservation date, time, attending person count, stripe check number, etc.'
        })
        break;
    
      case "prepurchases":
        setSectionInfo({
          title: 'Pre-purchase overview',
          desc: 'View pre-purchase data, such as billed person\'s ID, relevant POI\'s ID, associated reservation, the date and time on which the pre-purchase was made, stripe check number, etc.'
        })
        break;
      
      case "reviews":
        setSectionInfo({
          title: 'POI review overview',
          desc: 'See point of interest reviews, who posted the review, the date and time the review was posted at, etc.'
        })
        break;
    
      default:
        break;
    }
  }, [section])

  const onNavbarItemClick = (e) => {
    let target

    if (e.target.tagName === "P") {
      target = e.target
    } else {
      target = e.target.parentElement
    }

    setSection(e.target.id)

    ;[...document.querySelectorAll(`.${style["side-navbar"]} > p`)].forEach((el, i) => {
      el.classList.remove(style["navbar-item-active"])
    })

    target.classList.toggle(style["navbar-item-active"])
  }

  return (
    <>
      <Header />
      <div className={style["main-container"]}>
        <div className={style["side-navbar"]}>
          <div className={style["greeting"]}>
            <h1>Hello, {user.first_name}</h1>
            <p>Report any issues to admin@dorsly.com</p>
          </div>

          <p id="accounts" className={style["navbar-item-active"]} style={{ "--nav-item-icon": `url(${PeopleIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Accounts
          </p>
          <p id="pointsofinterest" style={{ "--nav-item-icon": `url(${GPSIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Points of interest
          </p>
          <p id="reservations" style={{ "--nav-item-icon": `url(${CalendarIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Reservations
          </p>
          <p id="prepurchases" style={{ "--nav-item-icon": `url(${TakeawayIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Pre-purchases
          </p>
          <p id="reviews" style={{ "--nav-item-icon": `url(${CommentIcon})` }} onClick={e => onNavbarItemClick(e)}>
            Reviews
          </p>

          <div className={style["version-data"]}>
            <p>Version 1.0.0 {import.meta.env.MODE}</p>

            <p>© 2022 Dorsly</p>
          </div>
        </div>

        <div className={style["content-section"]}>
          <div className={style["info"]}>
            <h1>{sectionInfo.title}</h1>
            <p>{sectionInfo.desc}</p>

            <div>
              <h2 className={style["search"]}>How to search?</h2>
              You can search for a speciffic attribute by prefixing your search data with the attribute and a colon:
              <br/>
              <br/>
              
              <div>
                for example:
                <ul>
                  <li>first_name:john</li>
                  <li>last_name:doe</li>
                  <li>date_created:2022-12-13</li>
                  <li>email:example@email.com</li>
                </ul>
              </div>
              <br/>
              <p className={style["error-disclaimer"]}>
                If you encounter any unexpected data or results, immediately notify any of the developers and log out of your account.
              </p>
            </div>
          </div>

          <div className={style["searchbar"]}>
            <input type="text" placeholder="Search..." />
            <button>Search</button>

            <button>Export</button>

            <p>Entries per page:</p>
              <input type="number" min="1" max="100" />
          </div>

          <div className={style["table"]}>
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Registration date</th>
                  <th>Last change</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John</td>
                  <td>Doe</td>
                  <td>email@example.com</td>
                  <td>john.doe</td>
                  <td>2021-12-13</td>
                  <td>2021-12-13</td>
                  <td>
                    <button>View</button>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className={style["pagination"]}>
              <button>Previous</button>
              <button>Next</button>

              <p>Page 1 of 1</p>

              <p>Showing 1 to 1 of 1 entries</p>

              <p>Go to page:</p>
              <input type="number" min="1" max="500" />

              <button>Go</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
