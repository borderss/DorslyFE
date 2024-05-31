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
import Results from "/assets/svg/results.svg"
import TodaysDeals from "/assets/svg/todaysdeals.svg"

import { UserContext } from "../contexts/userContext"

export default function mainProductPage() {
  const location = useLocation()
  const { user, token } = useContext(UserContext)

  const [searchCards, setSearchCards] = useState()

  const [todaysDealsCardData, setTodaysDealsCardData] = useState()
  const [popularChociesCardData, setPopularChociesCardData] = useState()
  const [nearMeCardData, setNearMeCardData] = useState()

  const [todaysDealsCards, setTodaysDealsCards] = useState()
  const [popularChoicesCards, setPopularChoicesCards] = useState()
  const [nearMeCards, setNearMeCards] = useState()

  useEffect(() => {
    async function getNearestChoices() {
      let gps_lat = 0
      let gps_lng = 0

      console.log(user?.gps_lat, user?.gps_lng)

      if (user?.gps_lat && user?.gps_lng) {
        gps_lat = user?.gps_lat
        gps_lng = user?.gps_lng

        apiMethod(`/nearest_choices`, {
          method: "POST",
          headers: defaultHeaders(),
          body: JSON.stringify({
            lat: user?.gps_lat,
            lng: user?.gps_lng,
          }),
        }).then((data) => {
          setNearMeCardData(data.data)
        })
      } else {
        await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
          .then((res) => res.json())
          .then(async (res) => {
            apiMethod(`/nearest_choices`, {
              method: "POST",
              headers: defaultHeaders(),
              body: JSON.stringify({
                lat: res.latitude,
                lng: res.longitude,
              }),
            }).then((data) => {
              setNearMeCardData(data.data)
            })
          })
      }
    }

    getNearestChoices()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

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

    const searchCardsData = location?.state?.data?.map((card, id) => {
      return <Card key={id} data={card} />
    })

    setSearchCards(searchCardsData)
  }, [token])

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

  useEffect(() => {
    if (nearMeCardData) {
      let cardsTemp = nearMeCardData?.map((card, id) => {
        return <Card key={id} data={card} />
      })

      setNearMeCards(cardsTemp)
    }
  }, [nearMeCardData])

  const carouselPlaceholderData = [
    <div
      key={0}
      style={{
        width: "100%",
        height: "100%",
        color: "#FAB733",
        lineHeight: "532px",
        textAlign: "center",
        fontSize: "40px",
        fontFamily: "Lexend",
        fontWeight: "300",
      }}>
      Loading Cards...
    </div>,
  ]

  return (
    <>
      <Header />

      <div className={style["content"]}>
        {location?.state?.data ? (
          location?.state?.data?.length > 0 ? (
            <div
              className={style["section"]}
              style={{ "--background-img": `url(${Results})` }}>
              <h1 className={style["section-title"]}>Search results:</h1>
              <div className={style["card-data-list"]}>{searchCards}</div>
              <img src={PageSeperator} />
            </div>
          ) : (
            <div
              className={style["section"]}
              style={{ "--background-img": `url(${Results})` }}>
              <h1 className={style["section-title"]}>Search results:</h1>
              <div className={style["card-data-list"]}>
                <h1>No results found.</h1>
              </div>
              <img src={PageSeperator} />
            </div>
          )
        ) : null}

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

          <div
            className={style["card-data-list"]}
            style={{ paddingBottom: "100px" }}>
            {nearMeCards}
          </div>
        </div>
      </div>
    </>
  )
}
