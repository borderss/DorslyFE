import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/userContext"
import { apiMethod, defaultHeaders } from "../static/js/util"

import "../static/css/general.css"
import style from "../static/css/home.module.css"
import carouselStyle from "../static/css/homeCarouselStyle.module.css"

import Card from "../components/card"
import Carousel from "../components/carousel"
import Header from "../components/header"
import MainSarchBar from "../components/mainSearchBar"
import Partner from "../components/partner"

import CalendarIllustration from "/assets/svg/calendarillustration.svg"
import PhoneGlobeIllustration from "/assets/svg/phoneglobeillustration.svg"
import WalletIllustration from "/assets/svg/walletillustration.svg"

import PhoneIllustration from "/assets/svg/phoneillustration.svg"
// import Footer from "../components/footer"

export default function home() {
  const { user, token, setUser, setToken } = useContext(UserContext)

  const [cardData, setCardData] = React.useState([])
  const [cards, setCards] = React.useState([])

  useEffect(() => {
    document.body.style.backgroundImage = ''
    
    window.scrollTo(0, 0)

    apiMethod("/popular_choices", {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setCardData(data.data)
    })
  }, [])

  useEffect(() => {
    let cardsTemp = cardData.map((card, id) => {
      return <Card key={id} data={card} />
    })

    setCards(cardsTemp)
  }, [cardData])

  const carouselPlaceholderData = [
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "#FFF",
        "line-height": "532px",
        "text-align": "center",
        "font-size": "40px",
        "font-family": "Lexend",
        "font-weight": "450",
      }}>
      Loading Cards...
    </div>,
  ]

  return (
    <>
      <Header />

      <div className={style["header-content"]}>
        <img className={style["phoneIllustration"]} src={PhoneIllustration} />

        <div>
          <h1>
            Dont worry about
            <br />
            reservations ever again
          </h1>
          <p>
            We are here to help you make informed decisions about
            <br />
            all of your reservations.
          </p>

          <MainSarchBar />

          <p className={style["seperator"]}>Alternatively,</p>
          <div className={style["actions"]}>
            <Link to="/register" className={style["link"]}>
              Register now
            </Link>
            <Link
              to="/contact"
              className={[style["link"], style["inverted"]].join(" ")}>
              Register as a business
            </Link>
          </div>
        </div>

        {cards.length > 0 ? (
          <Carousel data={cards} stylesheet={carouselStyle} />
        ) : (
          <Carousel data={carouselPlaceholderData} stylesheet={carouselStyle} />
        )}

        <div className={style["description"]}>
          <div>
            <img src={CalendarIllustration} />
            <h2>
              Schedule any hour
              <br />
              of any day
            </h2>
            <p>
              We try our best to help people the
              <br />
              process of reservation as simple as possible.
            </p>
          </div>
          <div>
            <img src={WalletIllustration} />
            <h2>
              Find options that fit your
              <br />
              price range
            </h2>
            <p>
              Dorsly provides tools to search for the best
              <br />
              restaurant in your selected price range.
            </p>
          </div>
          <div>
            <img src={PhoneGlobeIllustration} />
            <h2>
              Freely make reservations
              <br />
              anywhere across the globe
            </h2>
            <p>
              You can access our application and its services
              <br />
              world wide.
            </p>
          </div>
        </div>
      </div>
      <Partner />
      {/* <Footer /> */}
    </>
  )
}