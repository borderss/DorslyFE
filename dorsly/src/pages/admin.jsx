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

  const [tableMetaData, setTableMetaData] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalPageCount: 0,
    shownEntries: 0,
    totalEntries: 0,
    searchQuery: "",

    columns: {
      accounts: [
        { title: "ID", field: "id" },
        { title: "Username", field: "username" },
        { title: "Name", field: "first_name" },
        { title: "Surname", field: "last_name" },
        { title: "Email", field: "email" },
        { title: "Is admin", field: "is_admin" },
        { title: "Registration date", field: "registration_date" },
        { title: "Last change", field: "last_change" },
      ],
      pointsofinterest: [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        { title: "Description", field: "description" },
        { title: "Creation date", field: "creation_date" },
        { title: "Reservations fulfilled", field: "reservations_fulfilled" },
        { title: "Pre-purchases fulfilled", field: "prepurchases_fulfilled" },
      ],
      reservations: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Reservation date", field: "reservation_date" },
        { title: "Reservation time", field: "reservation_time" },
        { title: "Attending person count", field: "attending_person_count" },
        { title: "Stripe check number", field: "stripe_check_number" },
      ],
      prepurchases: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Reservation ID", field: "reservation_id" },
        { title: "Pre-purchase date", field: "prepurchase_date" },
        { title: "Pre-purchase time", field: "prepurchase_time" },
        { title: "Stripe check number", field: "stripe_check_number" },
      ],
      reviews: [
        { title: "ID", field: "id" },
        { title: "Account ID", field: "account_id" },
        { title: "POI ID", field: "poi_id" },
        { title: "Review date", field: "review_date" },
        { title: "Review time", field: "review_time" },
        { title: "Review text", field: "review_text" },
      ],
    },
  })

  const [filteredTableData, setFilteredTableData] = useState({
    accounts: [],
    pointsofinterest: [],
    reservations: [],
    prepurchases: [],
    reviews: [],
  })

  const [tableData, setTableData] = useState({
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
      {
        id: 3,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 4,
        username: "user",
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        is_admin: false,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 5,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 6,
        username: "user",
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        is_admin: false,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 7,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 8,
        username: "user",
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        is_admin: false,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 9,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 10,
        username: "user",
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        is_admin: false,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 11,
        username: "admin",
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        is_admin: true,
        registration_date: "2021-05-01 12:00:00",
        last_change: "2021-05-01 12:00:00",
      },
      {
        id: 12,
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

    setFilteredTableData({
      accounts: [],
      pointsofinterest: [],
      reservations: [],
      prepurchases: [],
      reviews: [],
    })

    return () => {
      setTableMetaData({
        ...tableMetaData,
        searchQuery: "",
        totalPageCount: Math.ceil(
          tableData[section].length / tableMetaData.entriesPerPage
        ),
        shownEntries:
          tableData[section].length % tableMetaData.entriesPerPage === 0
            ? tableMetaData.entriesPerPage
            : tableData[section].length % tableMetaData.entriesPerPage,
        totalEntries: tableData[section].length,
      })

      setFilteredTableData({
        accounts: [],
        pointsofinterest: [],
        reservations: [],
        prepurchases: [],
        reviews: [],
      })

      if (searchRef.current && entryRef.current && goToPageRef.current) {
        searchRef.current.value = ""
        entryRef.current.value = ""
        goToPageRef.current.value = ""
      }
    }
  }, [section, tableData])

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

  const renderTableSectionData = (section) => {
    let rows = new Array()
    let dataTable

    if (tableMetaData.searchQuery !== "") {
      dataTable = filteredTableData
    } else {
      dataTable = tableData
    }

    dataTable[section]
      .slice(
        (tableMetaData.currentPage - 1) * tableMetaData.entriesPerPage,
        tableMetaData.currentPage * tableMetaData.entriesPerPage
      )
      .map((row, key) => {
        rows.push(<tr key={key}>{renderTableRow(row)}</tr>)
      })

    if (rows.length === 0) {
      rows.push(
        <tr key={0}>
          <td
            colSpan={tableMetaData.columns[section].length + 1}
            style={{ height: "50px" }}>
            No data to display
          </td>
        </tr>
      )
    }

    return rows
  }

  const handleNextPageClick = () => {
    if (tableMetaData.currentPage < tableMetaData.totalPageCount) {
      setTableMetaData({
        ...tableMetaData,
        currentPage: tableMetaData.currentPage + 1,
      })
    }
  }

  const handlePrevPageClick = () => {
    if (tableMetaData.currentPage > 1) {
      setTableMetaData({
        ...tableMetaData,
        currentPage: tableMetaData.currentPage - 1,
      })
    }
  }

  const handleEntriesPerPageChange = (e) => {
    let realVal = parseInt(e.target.value)

    if (parseInt(e.target.value).toString() !== e.target.value) {
      realVal = 1
    } else if (parseInt(e.target.value) > 25) {
      realVal = 25
    } else if (parseInt(e.target.value) < 1) {
      realVal = 1
    }

    setTableMetaData({
      ...tableMetaData,
      entriesPerPage: realVal,
      currentPage: 1,
      totalPageCount: Math.ceil(tableData[section].length / realVal),
      shownEntries:
        tableData[section].length % realVal === 0
          ? realVal
          : tableData[section].length % realVal,
    })
  }

  const handleGoToPageClick = (e) => {
    let realVal = e.target.parentElement.querySelector("input").value

    let clampedVal

    clampedVal = Math.min(realVal, tableMetaData.totalPageCount)

    clampedVal = Math.max(realVal, 1)

    setTableMetaData({
      ...tableMetaData,
      currentPage: clampedVal,
    })
  }

  const handleSearchSubmit = (e) => {
    let query = e.target.parentElement.querySelector("input").value

    let filteredData = tableData[section].filter((row) => {
      let match = false

      tableMetaData.columns[section].forEach((col) => {
        if (row[col.field].toString().includes(query)) {
          match = true
        }
      })

      return match
    })

    setTableMetaData({
      ...tableMetaData,
      searchQuery: query,
      totalPageCount: Math.ceil(
        filteredData.length / tableMetaData.entriesPerPage
      ),
      shownEntries:
        filteredData.length % tableMetaData.entriesPerPage === 0
          ? tableMetaData.entriesPerPage
          : filteredData.length % tableMetaData.entriesPerPage,
      totalEntries: filteredData.length,
    })

    setFilteredTableData({
      ...filteredTableData,
      [section]: filteredData,
    })
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

      data[tableMetaData.columns[section][i].field] = cell.innerText

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
    } else {
      // SUCCESSFUL DELETE
      setTableMetaData((prevState) => {
        return {
          ...prevState,
          totalPageCount: Math.ceil(
            (prevState.totalEntries - 1) / prevState.entriesPerPage
          ),
          shownEntries:
            prevState.totalEntries % prevState.entriesPerPage === 0
              ? prevState.entriesPerPage
              : prevState.totalEntries % prevState.entriesPerPage,
          totalEntries: prevState.totalEntries - 1,

          // if the last page is empty, go back one page
          currentPage:
            prevState.currentPage === prevState.totalPageCount &&
            prevState.totalEntries % prevState.entriesPerPage === 0
              ? prevState.currentPage - 1
              : prevState.currentPage,
        }
      })

      console.log(e.target.parentElement.parentElement.querySelectorAll("td")[0].innerText)

      setTableData((prevState) => {
        return {
          ...prevState,
          [section]: prevState[section].filter(
            (item) => item.id+1 != e.target.parentElement.parentElement.querySelectorAll("td")[0].innerText
          ),
        }
      })

      // delete row
      e.target.parentElement.parentElement.remove()
    }
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
                  onChange={(e) => handleEntriesPerPageChange(e)}
                />
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
                  Page {tableMetaData.currentPage} of{" "}
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
