import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiMethod, bearerHeaders } from "../static/js/util"

import CreateProductForm from "../components/createProductForm"
import Header from "../components/header"

import style from "../static/css/admin.module.css"
import "../static/css/general.css"

import CalendarIcon from "/assets/svg/calendar.svg"
import CommentIcon from "/assets/svg/reviewlogo.svg"
import TakeawayIcon from "/assets/svg/takeaway.svg"

import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function business() {
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const entryRef = useRef(null)
  const goToPageRef = useRef(null)

  const { createPopup } = useContext(PopupContext)
  const { user, token } = useContext(UserContext)

  const tableMetaData = {
    products: [
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
        title: "Ingredients",
        field: "ingredients",
      },
      {
        title: "Image",
        field: "image",
      },
      {
        title: "Price",
        field: "price",
      },
    ],
    reservations: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Date",
        field: "date",
      },
      {
        title: "Number of people",
        field: "number_of_people",
      },
      {
        title: "Creation date",
        field: "created_at",
      },
      {
        title: "Last change",
        field: "updated_at",
      },
    ],
    prepurchases: [
      {
        title: "ID",
        field: "id",
      },
      {
        title: "Status",
        field: "status",
      },
      {
        title: "Payment status",
        field: "payment_status",
      },
      {
        title: "Total price",
        field: "total_price",
      },
      {
        title: "Payment id",
        field: "payment_id",
      },
      {
        title: "Creation date",
        field: "created_at",
      },
      {
        title: "Last change",
        field: "updated_at",
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
        title: "User ID",
        field: "user_id",
      },
      {
        title: "Text",
        field: "text",
      },
    ],
  }

  const canManipulate = {
    products: true,
    reservations: false,
    prepurchases: false,
    reviews: false,
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

  const [isCreating, setIsCreating] = useState(false)

  const [section, setSection] = useState("products")

  const [data, setData] = useState(defaultData)

  const [search, setSearch] = useState("")

  const [postBody, setPostBody] = useState({
    by: "all",
    value: "_",
    paginate: 10,
  })

  const [sectionInfo, setSectionInfo] = useState({
    title: "Product overview",
    desc: "View product data, such as product name, description, relevant POI's ID, ingredients, image, price, etc.",
  })

  useEffect(() => {
    if (user === null || token === null) {
      navigate("/")
      return
    } else {
      if (user === false || token === false) {
        return
      }

      if (user.roles.includes('business_manager') == false) {
        navigate("/")
        return
      }

      apiMethod("/business_filter_products", {
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
    }
  }, [user])

  useEffect(() => {
    if (!token) return

    switch (section) {
      case "products":
        setSectionInfo({
          title: "Product overview",
          desc: "View product data, such as product name, description, relevant POI's ID, ingredients, image, price, etc.",
        })

        apiMethod("/business_filter_products", {
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
          desc: "Search through reservation data, such as the billed person's user ID, relevant POI's ID, reservation date, time, attending person count, stripe check number, etc.",
        })

        apiMethod("/business_filter_reservations", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify(defaultPostBody),
        })
          .then((data) => {
            setData(data)
          })
          .catch((error) => console.log(error))
        break

      case "prepurchases":
        setSectionInfo({
          title: "Pre-purchase overview",
          desc: "View pre-purchase data, such as billed person's ID, relevant POI's ID, associated reservation, the date and time on which the pre-purchase was made, stripe check number, etc.",
        })

        apiMethod("/business_filter_prepurchases", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify(defaultPostBody),
        })
          .then((data) => {
            setData(data)
          })
          .catch((error) => console.log(error))
        break

      case "reviews":
        setSectionInfo({
          title: "POI review overview",
          desc: "See point of interest reviews, who posted the review, the date and time the review was posted at, etc.",
        })

        apiMethod("/business_filter_comments", {
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
    isCreating && setIsCreating(false)
    let target

    if (e.target.tagName === "P") {
      target = e.target
    } else {
      target = e.target.parentElement
    }

    setData(defaultData)
    setPostBody(defaultPostBody)

    try {
      searchRef.current.value = ""
      entryRef.current.value = 10
      goToPageRef.current.value = 1
    } catch (error) {}

    setSection(e.target.id)
    ;[...document.querySelectorAll(`.${style["side-navbar"]} > p`)].forEach(
      (el, _) => {
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
      cells.push(<td key={key}>{row[col.field]?.toString()}</td>)
    })

    canManipulate[section] ? cells.push(
      <td key={cells.length} style={{
        textAlign: "right",
      }}>
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
    ) : cells.push(<td key={cells.length}></td>)

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
    let pageIndex = goToPageRef.current.value
    let pageTemplate = data.meta?.links[1].url
    pageTemplate = pageTemplate.substring(pageTemplate.lastIndexOf("/") + 1)
    pageTemplate = pageTemplate.split("=")[0]

    apiMethod("/" + pageTemplate + "=" + pageIndex, {
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
          <p>
            You appear to have specified a search parameter "<b>{searchBy}</b>".
            It will be ignored, and a general search for "<b>{searchValue}</b>"
            will be made.
          </p>,
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

      let deleteEndpointSection = section

      if (section === "reviews") {
        deleteEndpointSection = "comments"
      }

      await apiMethod("/" + deleteEndpointSection + "/" + editedHTMLData.id, {
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

    let apiData = await apiMethod(
      "/" + deleteEndpointSection + "/" + deleteData.id,
      {
        method: "DELETE",
        headers: bearerHeaders(token),
      }
    )

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

  return user === false || token === false ? (
    <div>loading...</div>
  ) : (
    <>
      <Header />
      <div className={style["main-container"]}>
        <div className={style["side-navbar"]}>
          <div className={style["greeting"]}>
            <h1>Hello, {user ? user.first_name : "user"}</h1>
            <p>Report any issues to admin@dorsly.com</p>
          </div>

          <p
            id="products"
            className={style["navbar-item-active"]}
            style={{ "--nav-item-icon": `url(${CalendarIcon})` }}
            onClick={(e) => onNavbarItemClick(e)}>
            Products
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

            <p>© 2024 Dorsly</p>
          </div>
        </div>

        {isCreating ? (
          <div className={style["content-section"]}>
              <CreateProductForm onClose={
                () => setIsCreating(false)
              } />
          </div>
        ) : (              
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

                  {canManipulate[section] && (
                    <button
                      onClick={(e) => {
                        setIsCreating(true)
                      }}>
                      Create
                    </button>
                  )}
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
        )}
      </div>
    </>
  )
}
