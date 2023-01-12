import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { apiMethod, defaultHeaders } from "../static/js/util"

import Header from "../components/header"
import "../static/css/general.css"

import Card from "../components/card"
import Carousel from "../components/carousel"

import style from "../static/css/mainProductPage.module.css"
import carouselStyle from "../static/css/mainProductPageCarousel.module.css"

import PageSeperator from "/assets/svg/pageseperator.svg"
import PopularChoices from "/assets/svg/popularchoices.svg"
import TodaysDeals from "/assets/svg/todaysdeals.svg"

import { UserContext } from "../contexts/userContext"

export default function mainProductPage() {
  const location = useLocation()
  const { user, token, setUser, setToken } = useContext(UserContext)

  const searchText = location?.state?.searchText

  const [todaysDealsCardData, setTodaysDealsCardData] = useState()
  const [popularChociesCardData, setPopularChociesCardData] = useState()

  const [todaysDealsCards, setTodaysDealsCards] = useState()
  const [popularChoicesCards, setPopularChoicesCards] = useState()

  const searchdata = [
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

  useEffect(() => {
    apiMethod("/todays_deals", {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setTodaysDealsCardData(data.data)
    })

    apiMethod("/popular_choices", {
      method: "GET",
      headers: defaultHeaders(),
    }).then((data) => {
      setPopularChociesCardData(data.data)
    })
  }, [])

  useEffect(() => {
    if (todaysDealsCardData) {
      let cardsTemp = todaysDealsCardData?.map((card, id) => {
        return <Card key={id} data={card} />
      })

      setTodaysDealsCards(cardsTemp)
    }
  }, [todaysDealsCardData])

  useEffect(() => {
    if (popularChociesCardData) {
      let cardsTemp = popularChociesCardData?.map((card, id) => {
        return <Card key={id} data={card} />
      })

      setPopularChoicesCards(cardsTemp)
    }
  }, [popularChociesCardData])

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

  const carouselPlaceholderData = [
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "#FAB733",
        "line-height": "532px",
        "text-align": "center",
        "font-size": "40px",
        "font-family": "Lexend",
        "font-weight": "300",
      }}>
      Loading Cards...
    </div>,
  ]

  return (
    <>
      <Header />

      <div className={style["content"]}>
        {location?.state && (
          <div
            className={style["section"]}
            style={{ "--background-img": `url(${TodaysDeals})` }}>
            <h1 className={style["section-title"]}>Search results:</h1>
            <div>
              <span>{location?.state?.date}</span>
              <span>{location?.state?.time}</span>
              <span>{location?.state?.personCount}</span>
              <span>{location?.state?.searchText}</span>
            </div>

            <div className={style["card-data-list"]}>
              {searchdata.map((item, id) => {
                return <Card key={id} data={item} />
              })}
            </div>
            <img src={PageSeperator} />
          </div>
        )}

        <div
          className={style["section"]}
          style={{ "--background-img": `url(${TodaysDeals})` }}>
          <h1 className={style["section-title"]}>Today's deals!</h1>
          {todaysDealsCards != null ? (
            <>
              <Carousel data={todaysDealsCards} stylesheet={carouselStyle} />
            </>
          ) : (
            <>
              <Carousel
                data={carouselPlaceholderData}
                stylesheet={carouselStyle}
              />
            </>
          )}
          <img src={PageSeperator} />
        </div>

        <div
          className={style["section"]}
          style={{ "--background-img": `url(${PopularChoices})` }}>
          <h1 className={style["section-title"]}>Popular choices!</h1>
          {popularChoicesCards != null ? (
            <>
              <Carousel data={popularChoicesCards} stylesheet={carouselStyle} />
            </>
          ) : (
            <>
              <Carousel
                data={carouselPlaceholderData}
                stylesheet={carouselStyle}
              />
            </>
          )}
          <img src={PageSeperator} />
        </div>

        <div
          className={style["section"]}
          style={{ "--background-img": `url(${PopularChoices})` }}>
          <h1 className={style["section-title"]}>Near you</h1>

          <div className={style["card-data-list"]}>{tempCards}</div>
        </div>
      </div>
    </>
  )
}
