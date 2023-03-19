import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useRef, useState } from "react"

import style from "../static/css/locationPicker.module.css"

function LocationPicker(props) {
  const mapRef = useRef(null)
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
      <p>Location Picker</p>
      <div>
        <p>Map</p>
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
