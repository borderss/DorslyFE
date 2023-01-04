import React, { useContext, useEffect, useRef, useState } from "react"

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
  const searchRef = useRef(null)
  const entryRef = useRef(null)
  const goToPageRef = useRef(null)

  const { user, token, setUser, setToken } = useContext(UserContext)

  const [section, setSection] = useState("accounts")

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

  const renderColumnHeaders = () => {
    let headers = new Array()

    tableMetaData.columns[section].map((col, key) => {
      headers.push(<th key={key}>{col.title}</th>)
    })

    headers.push(<th key={headers.length}>Actions</th>)

    return headers
  }

  const renderTableRow = (row) => {
    let cells = new Array()

    tableMetaData.columns[section].map((col, key) => {
      cells.push(<td key={key}>{row[col.field].toString()}</td>)
    })

    cells.push(
      <td key={cells.length}>
        <button
          className={style["table-action-button"]}
          onClick={(e) => handleEditClick(e)}>
          Edit
        </button>
        <button
          className={style["table-action-button"]}
          onClick={(e) => handleDeleteClick(e)}>
          Delete
        </button>
      </td>
    )

    return cells
  }

  const renderTableSectionData = () => {
    //
  }

  const handleNextPageClick = () => {
    //
  }

  const handlePrevPageClick = () => {
    //
  }

  const handleEntriesPerPageSubmit = (e) => {
    //
  }

  const handleGoToPageClick = (e) => {
    //
  }

  const handleSearchSubmit = (e) => {
    //
  }

  const handleSaveClick = (e, data) => {
    e.stopPropagation()

    if (Math.random() > 0.5) {
      // FAILED SAVE

      e.target.innerText = "fail"
      e.target.style["padding-inline"] = "15px"
      e.target.style["background-color"] = "#ee5a5a"
      e.target.style["transition"] = "0.2s"
      e.target.disabled = true

      let row = e.target.parentElement.parentElement

      row.childNodes.forEach((cell, i) => {
        if (i === row.childNodes.length - 1) return

        cell.innerText = data[tableMetaData.columns[section][i].field]

        cell.contentEditable = false
        cell.style["border-block"] = "initial"
        cell.style["border-bottom"] = "1px solid #f1f1f1"
      })

      setTimeout(() => {
        e.target.innerText = "Edit"
        e.target.style["padding-inline"] = "15px"
        e.target.style["background-color"] = "#ffb82e"
        e.target.style["transition"] = "0.2s"
        e.target.disabled = false

        let new_element = e.target.cloneNode(true)
        e.target.parentNode.replaceChild(new_element, e.target)

        new_element.addEventListener("click", (e) => {
          handleEditClick(e)
        })
      }, 2000)
    } else {
      // SUCCESSFUL SAVE

      console.log("save", e.target)
      e.target.innerText = "Edit"
      e.target.style["padding-inline"] = "15px"
      e.target.style["background-color"] = "#ffb82e"
      e.target.style["transition"] = "0.2s"

      let row = e.target.parentElement.parentElement

      row.childNodes.forEach((cell, i) => {
        if (i === row.childNodes.length - 1) return

        cell.contentEditable = false
        cell.style["border-block"] = "initial"
        cell.style["border-bottom"] = "1px solid #f1f1f1"
      })

      let new_element = e.target.cloneNode(true)
      e.target.parentNode.replaceChild(new_element, e.target)

      new_element.addEventListener("click", (e) => {
        handleEditClick(e)
      })
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    e.target.innerText = "Save"
    e.target.style["transition"] = "0s"
    e.target.style["padding-inline"] = "10.7px"
    e.target.style["background-color"] = "#5aee5a"

    let row = e.target.parentElement.parentElement

    let data = {}

    row.childNodes.forEach((cell, i) => {
      if (i === row.childNodes.length - 1) return

      cell.contentEditable = true
      cell.style["border-bottom"] = "none"
      cell.style["border-block"] = "2px solid #ffb82e"
    })

    // pass data to handleSaveClick so that it can be removed later
    e.target.addEventListener("click", (e) => handleSaveClick(e, data))
  }

  const handleDeleteClick = (e) => {
    if (Math.random() > 0.5) {
      // FAILED DELETE

      e.target.innerText = "fail"
      e.target.style["padding-inline"] = "15px"
      e.target.style["background-color"] = "#ee5a5a"
      e.target.style["transition"] = "0.2s"
      e.target.disabled = true

      setTimeout(() => {
        e.target.innerText = "Delete"
        e.target.style["padding-inline"] = "15px"
        e.target.style["background-color"] = "#ffb82e"
        e.target.style["transition"] = "0.2s"
        e.target.disabled = false
      }, 2000)
    }

      e.target.parentElement.parentElement.remove()
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
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  defaultValue={tableMetaData.search}
                  onChange={(e) => {
                    if (e.target.value === "clear") {
                      clearAllFilters()
                    }
                  }}
                />
                <button onClick={(e) => handleSearchSubmit(e)}>Search</button>

                <button>Export</button>
              </div>

              <div>
                <p>Entries per page:</p>
                <input
                  ref={entryRef}
                  type="number"
                  min={1}
                  max={
                    tableMetaData.totalEntries > 25
                      ? 25
                      : tableMetaData.totalEntries
                  }
                  placeholder={tableMetaData.entriesPerPage}
                />
                <button onClick={e => handleEntriesPerPageSubmit(e)}>Set</button>
              </div>
            </div>
            <table>
              <thead>
                <tr>{renderColumnHeaders()}</tr>
              </thead>
              <tbody>{renderTableSectionData(section)}</tbody>
            </table>

            <div className={style["pagination"]}>
              <div>
                {tableMetaData.currentPage !== 1 ? (
                  <button onClick={handlePrevPageClick}>Previous</button>
                ) : (
                  <button disabled>Previous</button>
                )}
                <p>
                  Page {tableMetaData.currentPage} of {" "}
                  {tableMetaData.totalPageCount}
                </p>
                {tableMetaData.currentPage !== tableMetaData.totalPageCount ? (
                  <button onClick={handleNextPageClick}>Next</button>
                ) : (
                  <button disabled>Next</button>
                )}
              </div>

              <p>
                Showing{" "}
                <span>
                  {(tableMetaData.currentPage - 1) *
                    tableMetaData.entriesPerPage +
                    1}
                </span>{" "}
                to{" "}
                <span>
                  {tableMetaData.currentPage !== tableMetaData.totalPageCount
                    ? tableMetaData.currentPage * tableMetaData.entriesPerPage
                    : tableMetaData.totalEntries}
                </span>{" "}
                of <span>{tableMetaData.totalEntries}</span> entries
              </p>

              <div>
                <p>Go to page:</p>
                <input
                  ref={goToPageRef}
                  type="number"
                  min="1"
                  max={tableMetaData.totalPageCount}
                  placeholder={tableMetaData.currentPage}
                  onChange={(e) => {
                    e.target.value > tableMetaData.totalPageCount
                      ? (e.target.value = tableMetaData.totalPageCount)
                      : e.target.value

                    e.target.value < 1 ? (e.target.value = 1) : e.target.value

                    e.target.value = parseInt(e.target.value)
                  }}
                />

                <button onClick={(e) => handleGoToPageClick(e)}>Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
