import React, { useContext, useEffect, useState } from "react"

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

  const [tableMeta, setTableMeta] = useState({
    accounts: {
      columns: [
        { title: "ID", field: "id" },
        { title: "Username", field: "username" },
        { title: "Name", field: "first_name" },
        { title: "Surname", field: "last_name" },
        { title: "Email", field: "email" },
        { title: "Is admin", field: "is_admin"},
        { title: "Registration date", field: "registration_date" },
        { title: "Last change", field: "last_change" },
      ],
      data: [],
    },
    pointsofinterest: {
      columns: [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        { title: "Description", field: "description" },
        { title: "Creation date", field: "creation_date" },
        { title: "Reservations fulfilled", field: "reservations_fulfilled" },
        { title: "Pre-purchases fulfilled", field: "prepurchases_fulfilled" },
      ],
      data: [],
    },
    reservations: {
      columns: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Reservation date", field: "reservation_date" },
        { title: "Reservation time", field: "reservation_time" },
        { title: "Attending person count", field: "attending_person_count" },
        { title: "Stripe check number", field: "stripe_check_number" },
      ],
      data: [],
    },
    prepurchases: {
      columns: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Reservation ID", field: "reservation_id" },
        { title: "Pre-purchase date", field: "prepurchase_date" },
        { title: "Pre-purchase time", field: "prepurchase_time" },
        { title: "Stripe check number", field: "stripe_check_number" },
      ],
      data: [],
    },
    reviews: {
      columns: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Review date", field: "review_date" },
        { title: "Review time", field: "review_time" },
        { title: "Review text", field: "review_text" },
      ],
      data: [],
    },
  })

  const [sectionInfo, setSectionInfo] = useState({
    title: "Account overview",
    desc: "Overview account information such as username, name, surname, email, registration date, date of last change, etc.",
  })

  useEffect(() => {
    switch (section) {
      case "accounts":
        setSectionInfo({
          title: "Account overview",
          desc: "Overview, edit or delete account information such as username, name, surname, email, registration date, date of last change, etc.",
        })
        break

      case "pointsofinterest":
        setSectionInfo({
          title: "Point of interest overview",
          desc: "Check interest data, for example, name, description, creation date, number of reservations/pre-purchases fulfilled, and other general satistical data.",
        })
        break

      case "reservations":
        setSectionInfo({
          title: "Reservations overview",
          desc: "Search through reservation data, such as the billed person's account ID, relevant POI's ID, reservation date, time, attending person count, stripe check number, etc.",
        })
        break

      case "prepurchases":
        setSectionInfo({
          title: "Pre-purchase overview",
          desc: "View pre-purchase data, such as billed person's ID, relevant POI's ID, associated reservation, the date and time on which the pre-purchase was made, stripe check number, etc.",
        })
        break

      case "reviews":
        setSectionInfo({
          title: "POI review overview",
          desc: "See point of interest reviews, who posted the review, the date and time the review was posted at, etc.",
        })
        break

      default:
        break
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
    ;[...document.querySelectorAll(`.${style["side-navbar"]} > p`)].forEach(
      (el, i) => {
        el.classList.remove(style["navbar-item-active"])
      }
    )

    target.classList.toggle(style["navbar-item-active"])
  }

  const fakeData = {
    accounts: [
      {
        id: 1,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 2,
        username: "user",
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        is_admin: false,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
    ],
    pointsofinterest: [
      {
        id: 1,
        name: "Point of interest 1",
        description: "Description 1",
        creation_date: "2021-05-01 12:00:00",
        reservations_fulfilled: 0,
        prepurchases_fulfilled: 0,
      },
      {
        id: 2,
        name: "Point of interest 2",
        description: "Description 2",
        creation_date: "2021-05-01 12:00:00",
        reservations_fulfilled: 0,
        prepurchases_fulfilled: 0,
      },
    ],
    reservations: [
      {
        id: 1,
        account_id: 1,
        poi_id: 1,
        reservation_date: "2021-05-01 12:00:00",
        reservation_time: "12:00:00",
        attending_person_count: 1,
        stripe_check_number: "123456789",
      },
      {
        id: 2,
        account_id: 2,
        poi_id: 2,
        reservation_date: "2021-05-01 12:00:00",
        reservation_time: "12:00:00",
        attending_person_count: 1,
        stripe_check_number: "123456789",
      },
    ],
    prepurchases: [
      {
        id: 1,
        account_id: 1,
        poi_id: 1,
        reservation_id: 1,
        prepurchase_date: "2021-05-01 12:00:00",
        prepurchase_time: "12:00:00",
        stripe_check_number: "123456789",
      },
      {
        id: 2,
        account_id: 2,
        poi_id: 2,
        reservation_id: 2,
        prepurchase_date: "2021-05-01 12:00:00",
        prepurchase_time: "12:00:00",
        stripe_check_number: "123456789",
      },
    ],
    reviews: [
      {
        id: 1,
        account_id: 1,
        poi_id: 1,
        review_date: "2021-05-01 12:00:00",
        review_time: "12:00:00",
        review_text: "Review text 1",
      },
      {
        id: 2,
        account_id: 2,
        poi_id: 2,
        review_date: "2021-05-01 12:00:00",
        review_time: "12:00:00",
        review_text: "Review text 2",
      },
    ],
  }

  const renderColumnHeaders = () => {
    let headers = new Array()

    tableMeta[section].columns.map((col, key) => {
      headers.push(<th key={key}>{col.title}</th>)
    })

    headers.push(<th key={headers.length}>Actions</th>)

    return headers
  }

  const renderTableRow = (row) => {
    let cells = new Array()

    tableMeta[section].columns.map((col, key) => {
      cells.push(<td key={key}>{row[col.field]}</td>)
    })

    cells.push(
      <td key={cells.length}>
        <button className={style["table-action-button"]}>Edit</button>
        <button className={style["table-action-button"]}>Delete</button>
      </td>
    )

    return cells
  }

  const renderTableSectionData = (section) => {
    let rows = new Array()

    fakeData[section].map((row, key) => {
      rows.push(<tr key={key}>{renderTableRow(row)}</tr>)
    })

    return rows
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

          <p
            id="accounts"
            className={style["navbar-item-active"]}
            style={{ "--nav-item-icon": `url(${PeopleIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Accounts
          </p>
          <p
            id="pointsofinterest"
            style={{ "--nav-item-icon": `url(${GPSIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Points of interest
          </p>
          <p
            id="reservations"
            style={{ "--nav-item-icon": `url(${CalendarIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Reservations
          </p>
          <p
            id="prepurchases"
            style={{ "--nav-item-icon": `url(${TakeawayIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Pre-purchases
          </p>
          <p
            id="reviews"
            style={{ "--nav-item-icon": `url(${CommentIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
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
              You can search for a speciffic attribute by prefixing your search
              data with the attribute and a colon:
              <br />
              <br />
              <div>
                for example:
                <ul>
                  <li>first_name:john</li>
                  <li>last_name:doe</li>
                  <li>date_created:2022-12-13</li>
                  <li>email:example@email.com</li>
                </ul>
              </div>
              <br />
              <p className={style["error-disclaimer"]}>
                If you encounter any unexpected data or results, immediately
                notify any of the developers and log out of your account.
              </p>
            </div>
          </div>

          <div className={style["table"]}>
            <div className={style["searchbar"]}>
              <div>
                <input type="text" placeholder="Search..." />
                <button>Search</button>

                <button>Export</button>
              </div>

              <div>
                <p>Entries per page:</p>
                <input type="number" min="1" max="100" />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  {renderColumnHeaders()}
                </tr>
              </thead>
              <tbody>
                {
                  renderTableSectionData(section)
                }
              </tbody>
            </table>

            <div className={style["pagination"]}>
              <div>
                <button>Previous</button>
                <p>Page 2 of 1</p>
                <button>Next</button>
              </div>

              <p>Showing <div>1</div> to <div>6</div> of <div>27435345345</div> entries</p>

              <div>
                <p>Go to page:</p>
                <input type="number" min="1" max="500" />

                <button>Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
