import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useContext, useEffect, useRef, useState } from "react"
import style from "../static/css/locationPicker.module.css"

import LabeledInputField from "./labeledInputField"

import GpsIcon from "/assets/svg/gps3.svg"

import { PopupContext } from "../contexts/popupContext"
import { debounce } from "../static/js/util"

function LocationPicker(props) {
  const { popupData, createPopup, setPopupData } = useContext(PopupContext)
  const [activeMethod, setActiveMethod] = useState("map")
  const [locationInfo, setLocationInfo] = useState({
    geolocationAllowed: false,
    formattedAddress: "Loading...",
    searchAddress: "",
    gps: null,
  })

  const mapRef = useRef(null)

  const defaultMapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    gestureHandling: "greedy",
    zoomControl: true,
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  function handleLoad(map) {
    mapRef.current = map
  }

  useEffect(() => {
    if (!isLoaded) return

    let localIP = fetch(
      "https://api.bigdatacloud.net/data/reverse-geocode-client"
    ).then((res) => res.json())

    localIP.then((res) => {
      setLocationInfo({
        ...locationInfo,
        gps: new google.maps.LatLng(res.latitude, res.longitude),
        geolocationAllowed: true,
      })

      mapRef.current.setCenter({
        lat: res.latitude,
        lng: res.longitude,
      })
    })
  }, [mapRef.current])

  const asyncReverseGeocode = async (loc) => {
    const geocoder = new google.maps.Geocoder()

    try {
      const response = await geocoder.geocode({ location: loc })
      if (response.results[0]) {
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
          formattedAddress: res,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeActiveMethod = (method) => {
    setActiveMethod(method)

    if (method == "input") {
      mapRef.current.setOptions({
        draggable: false,
      })

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords

          let newLocationInfo = { ...locationInfo }

          asyncReverseGeocode({
            lat: latitude,
            lng: longitude,
          })
            .then((res) => {
              newLocationInfo.formattedAddress = res
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
            geolocationAllowed: true,
            gps: {
              lat: latitude,
              lng: longitude,
            },
          })
        },
        function (error) {
          setActiveMethod("map")

          createPopup(
            "Geolocation failed",
            <p>
              You didn't give us permission to estimate your location based on
              your GPS location. Please select your location on the map.
            </p>,
            "warning",
            "Close"
          )
        }
      )
    } else {
      mapRef.current.setOptions({
        draggable: true,
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
            onCenterChanged={debounce(handleCenterChanged, 1200)}
            // onBoundsChanged={(e) => {
            //   setLocationInfo({
            //     ...locationInfo,
            //     formattedAddress: "Loading...",
            //   })
            // }}
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
              {...(locationInfo.formattedAddress && {
                value: locationInfo.formattedAddress,
              })}
              handleInputChange={debounce((e) => {
                setLocationInfo(e.target.value)
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
