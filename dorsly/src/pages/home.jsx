import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/userContext"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

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
  document.body.style.backgroundImage = ""

  const { user, token, setUser, setToken } = useContext(UserContext)

  const fakedata = [
    {
      id: 1,
      star: "5.6",
      name: "pirmais",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl:
        "https://secretldn.com/wp-content/uploads/2021/08/shutterstock_1009968298-2.jpg",
    },
    {
      id: 2,
      star: "5.6",
      name: "Burgeru Cehs",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl:
        "https://secretldn.com/wp-content/uploads/2021/08/shutterstock_1009968298-2.jpg",
    },
    {
      id: 3,
      star: "5.6",
      name: "kebab",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl:
        "https://secretldn.com/wp-content/uploads/2021/08/shutterstock_1009968298-2.jpg",
    },
    {
      id: 4,
      star: "5.6",
      name: "pica",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl:
        "https://secretldn.com/wp-content/uploads/2021/08/shutterstock_1009968298-2.jpg",
    },
  ]

  console.log(user, token)

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
            <Link to="/contact" className={[style["link"], style["inverted"]].join(" ")}>
              Register as a business
            </Link>
          </div>
        </div>

        <Carousel
          data={[
            <Card data={fakedata[0]} />,
            <Card data={fakedata[2]} />,
            <Card data={fakedata[3]} />,
            <Card data={fakedata[3]} />,
            <Card data={fakedata[2]} />,
            <Card data={fakedata[2]} />,
            <Card data={fakedata[2]} />,
          ]}
        />

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
