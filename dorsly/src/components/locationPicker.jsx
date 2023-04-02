import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useRef, useState } from "react"
import style from "../static/css/locationPicker.module.css"

import LabeledInputField from "./labeledInputField"

import GpsIcon from "/assets/svg/gps3.svg"

import { debounce } from "../static/js/util"

function LocationPicker(props) {
  const [activeMethod, setActiveMethod] = useState("map")
  const [locationInfo, setLocationInfo] = useState({
    geolocation_allowed: false,
    formatted_address: "",
    gps: null,
  })

  const mapRef = useRef(null)

  const defaultMapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    gestureHandling: "greedy",
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  function handleLoad(map) {
    mapRef.current = map
  }

  const asyncReverseGeocode = async (loc) => {
    const geocoder = new google.maps.Geocoder()

    try {
      const response = await geocoder.geocode({ location: loc })

      console.log(response)

      if (response.results[0]) {
        console.log(response.results[0].formatted_address)
        return response.results[0].formatted_address
      } else {
        console.log("No results found")
      }
    } catch (error) {
      console.log("err:", error)
    }
  }

  const handleCenterChanged = async () => {
    if (!mapRef.current || activeMethod == "input") return
    const newPos = new google.maps.LatLng(mapRef.current.getCenter().toJSON())

    setLocationInfo({
      ...locationInfo,
      gps: newPos,
    })

    asyncReverseGeocode({
      lat: newPos.lat(),
      lng: newPos.lng(),
    })
      .then((res) => {
        setLocationInfo({
          ...locationInfo,
          formatted_address: res,
        })
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeActiveMethod = (method) => {
    setActiveMethod(method)

    if (!locationInfo.gps && method == "input") {
      mapRef.current.set
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords

        let newLocationInfo = { ...locationInfo }

        asyncReverseGeocode({
          lat: latitude,
          lng: longitude,
        })
          .then((res) => {
            newLocationInfo.formatted_address = res
            setLocationInfo(newLocationInfo)

            // TweenJS?
            mapRef.current.setCenter({
              lat: latitude,
              lng: longitude,
            })
          })
          .catch((err) => {
            console.log(err)
          })

        setLocationInfo({
          ...locationInfo,
          geolocation_allowed: true,
          gps: {
            lat: latitude,
            lng: longitude,
          },
        })
      })
    } else {
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
          onClick={(_) => handleChangeActiveMethod("input")}
          {...(activeMethod == "input" && { className: style["active"] })}>
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
            onCenterChanged={debounce(handleCenterChanged, 1000)}
            options={defaultMapOptions}
            {...(props.containerStyle && {
              mapContainerStyle: props.containerStyle,
            })}></GoogleMap>
        )}
        <img className={style["gps-icon"]} src={GpsIcon} alt="gps" />
      </div>
      <div className={style["location-info-container"]}>
        <div className={style["location-info"]}>
          <div className={style["location-info-label"]}>
            {activeMethod == "map"
              ? "We think you are pointing here:"
              : "We think you are here:"}
          </div>
          <div className={style["location-info-value"]}>
            <LabeledInputField
              label=""
              {...(locationInfo.formatted_address && {
                value: locationInfo.formatted_address,
              })}
              handleInputChange={debounce((e) => {
                setLocationInfo(e.target.value)
                console.log(e.target.value)
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
