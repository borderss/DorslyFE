import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useContext, useRef, useState } from "react"
import { debounce } from "../static/js/util"

import { UserContext } from "../contexts/userContext"

import style from "../static/css/locationPicker.module.css"

function LocationPicker(props) {
  const userContext = useContext(UserContext)

  const mapRef = useRef(null)
  const [activeMethod, setActiveMethod] = useState("map")

  const [position, setPosition] = useState({
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
    const newPos = mapRef.current.getCenter().toJSON()

    console.log("new pos: ", newPos)
    setPosition(newPos)
  }

  const handleChangeActiveMethod = (method) => {
    setActiveMethod(method)

    if (!userContext.position) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords
        userContext.setPosition({ lat: latitude, lng: longitude })
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
      <div>
        {isLoaded && (
          <GoogleMap
            id="map"
            zoom={10}
            onLoad={handleLoad}
            center={props.center}
            onCenterChanged={debounce(handleCenterChanged, 750)}
            {...(props.containerStyle && {
              mapContainerStyle: props.containerStyle,
            })}></GoogleMap>
        )}
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
