import React, { useContext, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { apiMethod, bearerHeaders } from "../static/js/util"

import Header from "../components/header"

import style from "../static/css/admin.module.css"
import "../static/css/general.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import GPSIcon from "/assets/svg/gps2.svg"
import PeopleIcon from "/assets/svg/people.svg"
import CommentIcon from "/assets/svg/reviewlogo.svg"
import TakeawayIcon from "/assets/svg/takeaway.svg"

import { UserContext } from "../contexts/userContext"
import { PopupContext } from "../contexts/popupContext"

export default function admin() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)
  const entryRef = useRef(null)
  const goToPageRef = useRef(null)

  const { popupData, createPopup, setPopupData } = useContext(PopupContext)
  const { user, token, setUser, setToken } = useContext(UserContext)

  const [reloadCounter, setReloadCounter] = useState(0)

  const tableMetaData = {
    users: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Name",
        field: "first_name",
      },
      {
        title: "Surname",
        field: "last_name",
      },
      {
        title: "Phone number",
        field: "phone_number",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Is admin",
        field: "is_admin",
      },
      {
        title: "Registration date",
        field: "created_at",
      },
      {
        title: "Last change",
        field: "updated_at",
      },
    ],
    pointsofinterest: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Description",
        field: "description",
      },
      {
        title: "Longitue",
        field: "gps_lng",
      },
      {
        title: "Latitude",
        field: "gps_lat",
      },
      {
        title: "Country",
        field: "country",
      },
      {
        title: "Opens at",
        field: "opens_at",
      },
      {
        title: "Closes at",
        field: "closes_at",
      },
      {
        title: "24h open",
        field: "is_open_round_the_clock",
      },
      {
        title: "Takeaway",
        field: "is_takeaway",
      },
      {
        title: "On location",
        field: "is_on_location",
      },
      {
        title: "Available seats",
        field: "available_seats",
      },
      {
        title: "Review count",
        field: "review_count",
      },
    ],
    reservations: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Account ID",
        field: "account_id",
      },
      {
        title: "POI ID",
        field: "poi_id",
      },
      {
        title: "Reservation date",
        field: "reservation_date",
      },
      {
        title: "Reservation time",
        field: "reservation_time",
      },
      {
        title: "Attending person count",
        field: "attending_person_count",
      },
      {
        title: "Stripe check number",
        field: "stripe_check_number",
      },
    ],
    prepurchases: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Account ID",
        field: "account_id",
      },
      {
        title: "POI ID",
        field: "poi_id",
      },
      {
        title: "Reservation ID",
        field: "reservation_id",
      },
      {
        title: "Pre-purchase date",
        field: "prepurchase_date",
      },
      {
        title: "Pre-purchase time",
        field: "prepurchase_time",
      },
      {
        title: "Stripe check number",
        field: "stripe_check_number",
      },
    ],
    reviews: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Name",
        field: "first_name",
      },
      {
        title: "Surname",
        field: "last_name",
      },
      {
        title: "Account ID",
        field: "user_id",
      },
      {
        title: "POI ID",
        field: "point_of_interest_id",
      },
      {
        title: "Text",
        field: "text",
      },
    ],
  }

  const defaultData = {
    data: [],
    links: {
      first: "",
      last: "",
      prev: "",
      next: "",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 0,
      links: [
        {
          url: "",
          label: "",
          active: false,
        },
      ],
      path: "",
      per_page: 10,
      to: 0,
      total: 0,
    },
  }

  const defaultPostBody = {
    by: "all",
    value: "_",
    paginate: 10,
  }

  const [section, setSection] = useState("users")

  const [data, setData] = useState(defaultData)

  const [search, setSearch] = useState("")

  const [postBody, setPostBody] = useState({
    by: "all",
    value: "_",
    paginate: 10,
  })

  const [sectionInfo, setSectionInfo] = useState({
    title: "Account overview",
    desc: "Overview account information such as username, name, surname, email, registration date, date of last change, etc.",
  })

  useEffect(() => {
    let safe = true
    if (!token) {
      safe = false

      setReloadCounter(reloadCounter + 1)

      if (reloadCounter > 3) {
        navigate("/")
      }
    }

    if (safe)
      apiMethod("/filter_users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(defaultPostBody),
      })
        .then((data) => {
          console.log(data)
          setData(data)
        })
        .catch((error) => console.log(error))
  }, [token])

  useEffect(() => {
    if (!token) return

    switch (section) {
      case "users":
        setSectionInfo({
          title: "Account overview",
          desc: "Overview, edit or delete account information such as username, name, surname, email, registration date, date of last change, etc.",
        })

        apiMethod("/filter_users", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify(defaultPostBody),
        })
          .then((data) => {
            console.log(data)
            setData(data)
          })
          .catch((error) => console.log(error))
        break

      case "pointsofinterest":
        setSectionInfo({
          title: "Point of interest overview",
          desc: "Check interest data, for example, name, description, creation date, number of reservations/pre-purchases fulfilled, and other general satistical data.",
        })

        apiMethod("/filter_points_of_interest", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify(defaultPostBody),
        })
          .then((data) => {
            setData(data)
          })
          .catch((error) => console.log(error))
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

        apiMethod("/filter_comments", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify(defaultPostBody),
        })
          .then((data) => {
            setData(data)
          })
          .catch((error) => console.log(error))
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

    setData(defaultData)
    setPostBody(defaultPostBody)

    searchRef.current.value = ""
    entryRef.current.value = 10
    goToPageRef.current.value = 1

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

    tableMetaData[section].map((col, key) => {
      headers.push(<th key={key}>{col.title}</th>)
    })

    headers.push(<th key={headers.length}>Actions</th>)

    return headers
  }

  const renderTableRow = (row) => {
    let cells = new Array()

    tableMetaData[section].map((col, key) => {
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
    let rows = new Array()

    data.data?.map((row, key) => {
      rows.push(
        <tr id={row.id} key={key}>
          {renderTableRow(row)}
        </tr>
      )
    })

    return rows
  }

  const handleNextPageClick = () => {
    let nextPage = data.links.next.substring(
      data.links.next.lastIndexOf("/") + 1
    )

    apiMethod("/" + nextPage, {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify(postBody),
    })
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.log(error))
  }

  const handlePrevPageClick = () => {
    let prevPage = data.links.prev?.substring(
      data.links.prev?.lastIndexOf("/") + 1
    )

    apiMethod("/" + prevPage, {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify(postBody),
    })
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.log(error))
  }

  const handleEntriesPerPageSubmit = (e) => {
    let paginateCount = parseInt(e.target.parentElement.children[1].value)

    setPostBody({
      ...postBody,
      paginate: paginateCount,
    })

    let page = data.meta?.path.substring(data.meta?.path.lastIndexOf("/") + 1)

    apiMethod("/" + page, {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify({
        ...postBody,
        paginate: paginateCount,
      }),
    }).then((data) => {
      setData(data)
    })
  }

  const handleGoToPageClick = (e) => {
    let page = parseInt(e.target.parentElement.children[1].value)

    let pageLink = data.meta?.links[page].url

    page = pageLink.substring(pageLink.lastIndexOf("/") + 1)

    apiMethod("/" + page, {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify(postBody),
    }).then((data) => {
      setData(data)
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    let searchText = e.target.parentElement.children[0].value

    let searchBy
    let searchValue

    if (
      searchText.includes(":") &&
      searchText.split(":")[0].length > 0 &&
      searchText.split(":")[1].length > 0
    ) {
      searchBy = searchText.split(":")[0]
      searchValue = searchText.split(":")[1]

      let searchByValid = false

      tableMetaData[section].map((col) => {
        if (col.field == searchBy) {
          searchByValid = true
        }
      })

      if (searchByValid) {
        setPostBody({
          ...postBody,
          by: searchBy,
          value: searchValue,
        })
      } else {
        setPostBody({
          ...postBody,
          by: "all",
          value: searchValue,
        })

        createPopup(
          "Invalid search parameter",
          <p>You appear to have specified a search parameter "<b>{searchBy}</b>". It will be ignored, and a general search for "<b>{searchValue}</b>" will be made.</p>,
          "error",
          "Close",
          () => {
            console.log("close")
          }
        )

        searchBy = "all"
        searchValue = searchValue
      }
    } else {
      searchBy = "all"
      searchValue = e.target.parentElement.children[0].value

      if (searchValue === "") {
        searchValue = "_"
      }

      setPostBody({
        ...postBody,
        by: searchBy,
        value: searchValue,
      })
    }

    let page = data.links.first.substring(data.links.first.lastIndexOf("/") + 1)

    apiMethod("/" + page, {
      method: "POST",
      headers: bearerHeaders(token),
      body: JSON.stringify({
        ...postBody,
        by: searchBy,
        value: searchValue,
      }),
    }).then((data) => {
      setData(data)
    })
  }

  const handleSaveClick = async (e, editedHTMLData, initialData) => {
    e.stopPropagation()

    let saveData = {}

    editedHTMLData.childNodes.forEach((cell, i) => {
      if (i === editedHTMLData.childNodes.length - 1) return

      if (typeof initialData[tableMetaData[section][i].field] === "number") {
        saveData[tableMetaData[section][i].field] = parseInt(cell.innerText)
      } else {
        saveData[tableMetaData[section][i].field] = cell.innerText
      }
    })

    if (JSON.stringify(saveData) != JSON.stringify(initialData)) {
      e.target.innerText = "Edit"
      e.target.style["padding-inline"] = "15px"
      e.target.style["background-color"] = "#ffb82e"
      e.target.style["transition"] = "0.2s"

      editedHTMLData.childNodes.forEach((cell, i) => {
        if (i === editedHTMLData.childNodes.length - 1) return

        cell.contentEditable = false
        cell.style["border-block"] = "initial"
        cell.style["border-bottom"] = "1px solid #f1f1f1"
      })

      let new_element = e.target.cloneNode(true)
      e.target.parentNode.replaceChild(new_element, e.target)

      new_element.addEventListener("click", (e) => {
        handleEditClick(e)
      })

      await apiMethod("/" + section + "/" + editedHTMLData.id, {
        method: "PUT",
        headers: bearerHeaders(token),
        body: JSON.stringify(saveData),
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

    let rowHtml = e.target.parentElement.parentElement
    let rowData = data.data.find((row) => row.id == rowHtml.id)

    rowHtml.childNodes.forEach((cell, i) => {
      if (i === rowHtml.childNodes.length - 1) return

      Object.keys(rowData).map((key) => {
        if (key === tableMetaData[section][i].field) {
          cell.innerText = rowData[key]
        }
      })

      if (
        i != 0 &&
        i != rowHtml.childNodes.length - 2 &&
        i != rowHtml.childNodes.length - 3
      ) {
        cell.contentEditable = true
        cell.style["border-bottom"] = "none"
        cell.style["border-block"] = "2px solid #ffb82e"
      }
    })

    e.target.addEventListener("click", (e) =>
      handleSaveClick(e, e.target.parentElement.parentElement, rowData)
    )
  }

  const handleDeleteClick = async (e) => {
    let rowItemIndex = e.target.parentElement.parentElement.id

    let deleteData = data.data.find((row) => row.id == rowItemIndex)

    let deleteEndpointSection = section
    
    if (section === "reviews") {
      deleteEndpointSection = "comments"
    }
    
    let apiData = await apiMethod("/" + deleteEndpointSection + "/" + deleteData.id, {
      method: "DELETE",
      headers: bearerHeaders(token),
    })

    if (apiData && apiData.data.id == deleteData?.id) {
      let new_data = data.data.filter((item) => item.id != deleteData.id)

      setData({
        ...data,
        data: new_data,
        meta: {
          ...data.meta,
          to: data.meta?.to - 1,
          total: data.meta?.total - 1,
        },
      })
    }
  }

  return (
    <>
      <Header />
      <div className={style["main-container"]}>
        <div className={style["side-navbar"]}>
          <div className={style["greeting"]}>
            <h1>Hello, {user ? user.first_name : "user"}</h1>
            <p>Report any issues to admin@dorsly.com</p>
          </div>

          <p
            id="users"
            className={style["navbar-item-active"]}
            style={{ "--nav-item-icon": `url(${PeopleIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Users
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
              <h2 className={style["search"]}>Searchable fields</h2>
              <div className={style["searchable-keys"]}>
                {(Object.keys(tableMetaData[section]) || []).map((key) => (
                  <div key={key}>{tableMetaData[section][key].field}</div>
                ))}
              </div>
            </div>
          </div>

          <div className={style["table"]}>
            <div className={style["searchbar"]}>
              <div>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  defaultValue={search}
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
                  max={data.meta?.total}
                  placeholder={data.meta?.per_page}
                />
                <button onClick={(e) => handleEntriesPerPageSubmit(e)}>
                  Set
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>{data != defaultData && renderColumnHeaders()}</tr>
              </thead>
              <tbody>
                {data != defaultData && renderTableSectionData(section)}
              </tbody>
            </table>

            <div className={style["pagination"]}>
              <div>
                {data.links?.prev ? (
                  <button onClick={handlePrevPageClick}>Previous</button>
                ) : (
                  <button disabled>Previous</button>
                )}
                <p>
                  Page {data.meta.current_page} of {data.meta.last_page}
                </p>
                {data.links.next ? (
                  <button onClick={handleNextPageClick}>Next</button>
                ) : (
                  <button disabled>Next</button>
                )}
              </div>

              <p>
                Showing <span>{data.meta.from}</span> to{" "}
                <span>{data.meta.to}</span> of <span>{data.meta.total}</span>{" "}
                entries
              </p>

              <div>
                <p>Go to page:</p>
                <input
                  ref={goToPageRef}
                  type="number"
                  min={1}
                  max={data.meta.last_page}
                  placeholder={data.meta.current_page}
                  onChange={(e) => {
                    if (e.target.value > data.meta.last_page) {
                      e.target.value = data.meta.last_page
                    }

                    if (e.target.value < 1) {
                      e.target.value = 1
                    }

                    if (e.target.value === "") {
                      e.target.value = data.meta.current_page
                    }
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
