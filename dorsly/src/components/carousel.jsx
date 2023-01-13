import React, { useEffect, useRef, useState } from "react"

import style from "../static/css/carousel.module.css"

import ArrowLeftSvg from "/assets/svg/arrowLeft.svg"
import ArrowRightSvg from "/assets/svg/arrowRight.svg"

export default function carousel(props) {
  const [page, setPage] = useState(1)

  const pageCount =
    props.data.length % 3 === 0
      ? props.data.length / 3
      : Math.floor(props.data.length / 3) + 1

  const carouselRef = useRef(null)
  const carouselDotsRef = useRef(null)

  const onArrowClick = (e, direction) => {
    let carousel = carouselRef.current

    if (carousel === null) {
      return
    }

    if (direction === "left") {
      if (page - 1 > 0) {
        setPage(page - 1)
      } else {
        setPage(pageCount)
      }
    } else if (direction === "right") {
      if (page + 1 <= pageCount) {
        setPage(page + 1)
      } else {
        setPage(1)
      }
    }
  }

  const onDotClick = (e) => {
    let dots = carouselDotsRef.current.children

    for (let dot of dots) {
      dot.setAttribute("active", "false")
    }

    e.target.setAttribute("active", "true")
    setPage(e.target.id)
  }

  const loadDots = (id) => {
    let dots = carouselDotsRef.current.children

    for (let dot of dots) {
      dot.setAttribute("active", "false")
    }

    dots[id ? id - 1 : page - 1].setAttribute("active", "true")
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    let carousel = carouselRef.current
    let offset = parseInt(carousel.style.marginLeft)

    const mouseStartPos = e.clientX

    const handleMouseMove = (e) => {
      if (Math.abs(mouseStartPos - e.clientX) < 50) {
        carousel.setAttribute("dragging", "true")
      } else {
        carousel.setAttribute("dragging", "false")
      }

      carousel.style.transition = "0s"
      carousel.style.marginLeft = `${offset - (mouseStartPos - e.clientX)}px`
    }

    const handleMouseUp = (e) => {
      carousel.style.transition = "0.5s"
      carousel.style.marginLeft = `${362 * 2 * (1 - page)}px`

      if (Math.abs(mouseStartPos - e.clientX) > 181) {
        let distance = Math.floor(Math.abs(mouseStartPos - e.clientX) / 362)

        if (mouseStartPos - e.clientX > 0) {
          if (page + distance <= pageCount) {
            setPage(page + distance)
          } else if (page == pageCount && distance >= 1) {
            setPage(1)
          } else if (page + distance > pageCount) {
            setPage(pageCount)
          }
        } else {
          if (page - distance > 0) {
            setPage(page - distance)
          } else if (page == 1 && distance >= 1) {
            setPage(pageCount)
          } else if (page - distance < 0) {
            setPage(1)
          }
        }
      }

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  let dots = []

  for (let i = 0; i < pageCount; i++) {
    dots.push(
      <span
        key={i + 1}
        id={i + 1}
        className={
          props.stylesheet?.["carouselDots"]
            ? props.stylesheet?.["carouselDots"]
            : style["carouselDots"]
        }
        onClick={onDotClick}
        active={i == 0 ? "true" : "false"}>
        <div></div>
      </span>
    )
  }

  useEffect(() => {
    loadDots()

    let carousel = carouselRef.current

    if (carousel === null) {
      return
    }

    carousel.style.transition = "0.5s"
    if (carousel.children.length % 2 === 0) {
      carousel.style.marginLeft = `${362 * 2 * (1 - page)}px`
    } else {
      carousel.style.marginLeft = `${362 * 2 * (1 - page)}px`
    }
  }, [page])

  return (
    <div
      className={
        props.stylesheet?.["carouselBoundingBox"] ||
        style["carouselBoundingBox"]
      }>
      <div
        className={
          props.stylesheet?.["carouselContainer"] || style["carouselContainer"]
        }>
        <span
          className={[
            props.stylesheet?.["carouselArrow"] || style["carouselArrow"],
            props.stylesheet?.["left"] || style["left"],
          ].join(" ")}
          onClick={(e) => onArrowClick(e, "left")}>
          <img src={ArrowLeftSvg} alt=">" />
        </span>
        <div
          className={props.stylesheet?.["carousel"] || style["carousel"]}
          onMouseDown={handleMouseDown}>
          <div
            ref={carouselRef}
            className={
              props.stylesheet?.["carouselInner"] || style["carouselInner"]
            }>
            {props.data}
          </div>
        </div>
        <span
          className={[
            props.stylesheet?.["carouselArrow"] || style["carouselArrow"],
            props.stylesheet?.["right"] || style["right"],
          ].join(" ")}
          onClick={(e) => onArrowClick(e, "right")}>
          <img src={ArrowRightSvg} alt="<" />
        </span>
      </div>
      <div
        ref={carouselDotsRef}
        className={
          props.stylesheet?.["carouselDotsContainer"] ||
          style["carouselDotsContainer"]
        }>
        {dots}
      </div>
    </div>
  )
}