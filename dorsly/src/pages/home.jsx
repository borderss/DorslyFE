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
  document.body.style.backgroundImage = ""

  const { user, token, setUser, setToken } = useContext(UserContext)

  const [cardData, setCardData] = React.useState([])
  const [cards, setCards] = React.useState([])

  useEffect(() => {
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

  let tempData = [
    {
      id: 43,
      name: "Xzavier Reichel",
      description:
        "Eos ratione eius reiciendis. Quia quos facilis quia a rerum autem. Ullam non sint ab. Eos atque vel dolorum eum suscipit nihil.",
      gps_lng: 140.54,
      gps_lat: 62.03,
      country: "Equatorial Guinea",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/43?signature=c1309a79de84952d3337aa34744d6e86c610dd5ca96e1f89d65bb0266346514f",
      opens_at: "04:13:37",
      closes_at: "10:14:32",
      is_open_round_the_clock: 1,
      is_takeaway: 0,
      is_on_location: 1,
      available_seats: 0,
      review_count: 5,
    },
    {
      id: 65,
      name: "Margaretta Streich Jr.",
      description:
        "Reprehenderit qui qui facere esse. Laborum deleniti eum est quis reprehenderit fugit voluptatibus. Nihil consequatur omnis similique voluptatem iusto numquam in.",
      gps_lng: 54.26,
      gps_lat: -85.85,
      country: "French Polynesia",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/65?signature=0e41625f15310b29b1af4d8924426696615af8671ccdd8917fe5b7a4a922c822",
      opens_at: "00:35:12",
      closes_at: "03:21:13",
      is_open_round_the_clock: 1,
      is_takeaway: 0,
      is_on_location: 0,
      available_seats: 0,
      review_count: 2,
    },
    {
      id: 5,
      name: "Cierra Sawayn",
      description:
        "Earum molestiae omnis vel quam et modi eos. Illum et harum vel deleniti dolorem qui consequatur. Non alias quasi officia natus odit. Voluptatem qui corrupti ut nihil dignissimos rem deleniti nulla.",
      gps_lng: -40.24,
      gps_lat: 16.78,
      country: "Liberia",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/5?signature=5281347096906f8ecc1bb20edea7e92f7c88ba6a76734ec7bcfa2eeecf5982b8",
      opens_at: "11:27:58",
      closes_at: "04:06:12",
      is_open_round_the_clock: 0,
      is_takeaway: 1,
      is_on_location: 1,
      available_seats: 4,
      review_count: 2,
    },
    {
      id: 27,
      name: "Shirley Russel Sr.",
      description:
        "Velit dicta veniam voluptatem corrupti. Et numquam neque sed non nam consequuntur et placeat. Sit saepe qui autem cum.",
      gps_lng: 141.39,
      gps_lat: -38.33,
      country: "Maldives",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/27?signature=1d2ac016cd9cb164850c617925ba036b880a789685e3ca79e07834c5e70cc085",
      opens_at: "19:32:50",
      closes_at: "12:39:03",
      is_open_round_the_clock: 1,
      is_takeaway: 1,
      is_on_location: 1,
      available_seats: 2,
      review_count: 0,
    },
    {
      id: 11,
      name: "Blanche Hartmann",
      description:
        "Nemo ducimus voluptatem assumenda vel reprehenderit vel. Necessitatibus minus et et iusto laudantium. Dolorem omnis quam fuga id iure. Molestiae amet sed ut provident.",
      gps_lng: 20.16,
      gps_lat: 53.95,
      country: "Lebanon",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/11?signature=a176996c1ccfd6000752cfabcb4448956841e07d5e8da283d83bdb4dc2d05787",
      opens_at: "08:56:36",
      closes_at: "16:35:33",
      is_open_round_the_clock: 0,
      is_takeaway: 0,
      is_on_location: 1,
      available_seats: 3,
      review_count: 7,
    },
    {
      id: 24,
      name: "Gregorio Balistreri",
      description:
        "Soluta tempora ducimus inventore laborum sint. Expedita voluptatem repellendus beatae perferendis quae a. Et quo placeat eum in commodi enim.",
      gps_lng: -141.18,
      gps_lat: -44.96,
      country: "Kenya",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/24?signature=83855ad76ab3dafdf7cfcf3205bd63216d98ea5d95b0bdff9a63bed7c38058fc",
      opens_at: "08:54:07",
      closes_at: "17:14:04",
      is_open_round_the_clock: 1,
      is_takeaway: 1,
      is_on_location: 1,
      available_seats: 2,
      review_count: 6,
    },
    {
      id: 19,
      name: "Ms. Mylene Swaniawski",
      description:
        "Praesentium ab nobis voluptatum atque qui. Quia ut quas libero maxime dolor. Facilis blanditiis velit quae sit unde aut.",
      gps_lng: -99.06,
      gps_lat: -0.51,
      country: "Cameroon",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/19?signature=9f3e6a9067f405bbf2e2d7717f6e857cc2726d06a7a90000ba6b0dd6dca3c9b9",
      opens_at: "17:59:52",
      closes_at: "06:04:51",
      is_open_round_the_clock: 1,
      is_takeaway: 0,
      is_on_location: 1,
      available_seats: 5,
      review_count: 2,
    },
    {
      id: 14,
      name: "Braxton Larson",
      description:
        "Ad neque aut aut earum possimus. Necessitatibus quia facilis mollitia eum porro earum maxime. Laudantium nemo rem dolor vel quibusdam quia.",
      gps_lng: -39.54,
      gps_lat: -62.99,
      country: "Rwanda",
      images:
        "http://127.0.0.1:8000/api/point_of_interest/images/14?signature=18cdd0864921ff22dfd2db4e7b884001d42dad622d5cd157bcce6d5f33984e8f",
      opens_at: "16:04:59",
      closes_at: "02:00:44",
      is_open_round_the_clock: 1,
      is_takeaway: 1,
      is_on_location: 0,
      available_seats: 2,
      review_count: 0,
    },
  ]

  let tempCards = tempData.map((card, id) => {
    return <Card key={id} data={card} />
  })

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
          <Carousel data={tempCards} stylesheet={carouselStyle} />
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