import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useContext, useRef, useState } from "react"
import { UserContext } from "../contexts/userContext"
import style from "../static/css/locationPicker.module.css"

import GpsIcon from "/assets/svg/gps3.svg"

import { debounce } from "../static/js/util"

function LocationPicker(props) {
  const userContext = useContext(UserContext)

  const mapRef = useRef(null)
  const [activeMethod, setActiveMethod] = useState("map")

  const defaultMapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    gestureHandling: "greedy",
  }

  const [pos, setPos] = useState({
    lat: -25.0270548,
    lng: 115.1824598,
  })

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  function handleLoad(map) {
    mapRef.current = map
  }

  function handleCenterChanged() {
    if (!mapRef.current) return
    const newPos = new google.maps.LatLng(mapRef.current.getCenter().toJSON())

    console.log({
      lat: newPos.lat(),
      lng: newPos.lng(),
    })
    setPos(newPos)
  }

  const handleChangeActiveMethod = (method) => {
    setActiveMethod(method)

    if (!userContext.position) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords
        console.log(latitude, longitude)
        userContext.setPos({ lat: latitude, lng: longitude })
      })
    }
  }

  return (
    <div className={style["location-picker-container"]}>
      <div className={style["picking-options"]}>
        <div
          onClick={(_) => handleChangeActiveMethod("map")}
          {...(activeMethod == "map" && { className: style["active"] })}>
          Select your location on the map
        </div>
        <div
          onClick={(_) => handleChangeActiveMethod("text")}
          {...(activeMethod == "text" && { className: style["active"] })}>
          Use my current location
        </div>
      </div>
      <div className={style["map-container"]}>
        {isLoaded && (
          <GoogleMap
            id="map"
            zoom={10}
            onLoad={handleLoad}
            center={props.center}
            onCenterChanged={debounce(handleCenterChanged, 750)}
            options={defaultMapOptions}
            {...(props.containerStyle && {
              mapContainerStyle: props.containerStyle,
            })}></GoogleMap>
        )}
        <img className={style["gps-icon"]} src={GpsIcon} alt="gps" />
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
