import React from "react"

import "../static/css/general.css"
import style from "../static/css/home.module.css"

import Header from "../components/header"
import Partner from "../components/partner"
import Card from "../components/card"

export default function home() {

  const fakedata=[
    {
      star: "5.6",
      name: "Burgeru Cehs",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl: "https://www.eastendfood.coop/wp-content/uploads/2018/06/Recipe_SouthwesternVeggieBurger.jpg"
    },
    {
      star: "5.6",
      name: "kebab",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl: "https://www.eastendfood.coop/wp-content/uploads/2018/06/Recipe_SouthwesternVeggieBurger.jpg"
    },
    {
      star: "5.6",
      name: "pica",
      desc: "Lieli un garšīgi burgeri, labākā ātrā uzskoda baltijas valstu robežās.",
      time: "6:00 - 24:00",
      place: "Takeaway or on location",
      seats: "25 available seats",
      gps: "1.3km away",
      comments: "253 reviews",
      imgurl: "https://www.eastendfood.coop/wp-content/uploads/2018/06/Recipe_SouthwesternVeggieBurger.jpg"
    }
  ];
  
  return (
    <>
      <Header />
      <Card data ={fakedata[0]}/>
      <Card data ={fakedata[0]} sideways={true}/>
      <Partner/>
      <Footer />
    </>
  )
}
