import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useRef, useState } from "react"

import style from "../static/css/locationPicker.module.css"

function LocationPicker(props) {
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

    console.log(newPos)

    // let debounce = setTimeout(() => {
    //   clearTimeout(debounce)

    //   setPosition(newPos)

    //   debounce = null
    // }, 1000)
  }

  return (
    <div className={style["location-picker-container"]}>
      <div className={style["picking-options"]}>
        <div
          onClick={() => setActiveMethod("map")}
          {...(activeMethod == "map" && { className: style["active"] })}>
          Select your location on the map
        </div>
        <div
          onClick={() => setActiveMethod("text")}
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
            onCenterChanged={handleCenterChanged}
            {...(props.containerStyle && {
              mapContainerStyle: props.containerStyle,
            })}></GoogleMap>
        )}
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
