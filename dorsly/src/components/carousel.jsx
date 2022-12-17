import React, { useEffect, useRef, useState } from "react"

import style from "../static/css/carousel.module.css"

import ArrowLeftSvg from "/assets/svg/arrowLeft.svg"
import ArrowRightSvg from "/assets/svg/arrowRight.svg"

export default function carousel(props) {
  const [page, setPage] = useState(1)
  const pageCount = props.data.length % 3 === 0 ? props.data.length / 3 : Math.floor(props.data.length / 3) + 1

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

      console.log(page)
      console.log(pageCount)
    } else if (direction === "right") {
      if (page + 1 <= pageCount) {
        setPage(page + 1)
      } else {
        setPage(1)
      }
      
      console.log(page)
      console.log(pageCount)
    }
  }

  const onDotClick = (e) => {
    let dots = carouselDotsRef.current.children

    for(let dot of dots){
      dot.setAttribute("active", "false")
    }

    e.target.setAttribute("active", "true")
    setPage(e.target.id)
  }

  const loadDots = () => {
    let dots = carouselDotsRef.current.children

    for(let dot of dots){
      dot.setAttribute("active", "false")
    }

    dots[page - 1].setAttribute("active", "true")
  }

  useEffect(() => {
    loadDots()
  }, [page])

  let dots = []

  for (let i = 0; i < pageCount; i++) {
    dots.push(
      <span
        id={i + 1}
        className={style["carouselDots"]}
        onClick={onDotClick}
        active={i == 0 ? "true" : "false"}>
        </span>
    )
  }

  useEffect(() => {
    let carousel = carouselRef.current
    
    if (carousel === null) {
      return
    }

    carousel.style.transition = "0.5s"
    if (carousel.children.length % 2 === 0) {
      carousel.style.marginLeft = `${362 * 2 * (1 - page)}px`
    } else {
      carousel.style.marginLeft = `${(362 * 2 * (1 - page))}px`
    }
  }, [page])


  return (
    <div className={style["carouselBoundingBox"]}>
      <div className={style["carouselContainer"]}>
        <span
          className={[style["carouselArrow"], style["left"]].join(" ")}
          onClick={(e) => onArrowClick(e, "left")}>
          <img src={ArrowLeftSvg} alt=">" />
        </span>
        <div className={style["carousel"]}>
          <div ref={carouselRef} className={style["carouselInner"]}>
            {props.data}
          </div>
        </div>
        <span
          className={[style["carouselArrow"], style["right"]].join(" ")}
          onClick={(e) => onArrowClick(e, "right")}>
          <img src={ArrowRightSvg} alt="<" />
        </span>
      </div>
      <div ref={carouselDotsRef} className={style["carouselDotsContainer"]}>
        {dots}
      </div>
    </div>
  )
}
