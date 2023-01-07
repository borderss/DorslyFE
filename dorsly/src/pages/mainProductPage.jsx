import React from "react"

import "../static/css/general.css"
import Header from "../components/header"

import Card from "../components/card"
import Carousel from "../components/carousel"

import style from "../static/css/mainProductPage.module.css"
import carouselStyle from "../static/css/mainProductPageCarousel.module.css"

import TodaysDeals from "/assets/svg/todaysdeals.svg"
import PageSeperator from "/assets/svg/pageseperator.svg"

export default function mainProductPage() {

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

  const cardData = fakedata.map((item, id) => {
    return (
      <Card key={id} data={item} />
    )
  })

  return (
    <>
      <Header />

      <div className={style["content"]}>
        <div className={style["todays-deals"]}
        style={{"--background-img": `url(${TodaysDeals})`}}>
          <h1 className={style["section-title"]}>Today's deals!</h1>
          <Carousel
            data={cardData}
            stylesheet={carouselStyle}
          />
          <img src={PageSeperator}/>
        </div>
      </div>
    </>
  )
}
