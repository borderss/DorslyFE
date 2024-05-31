import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React, { useContext, useEffect, useRef, useState } from "react"
import style from "../static/css/locationPicker.module.css"

import LabeledInputField from "./labeledInputField"

import GpsIcon from "/assets/svg/gps3.svg"
import CloseIcon from "/assets/svg/x.svg"

import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"
import { apiMethod, bearerHeaders, debounce } from "../static/js/util"

function LocationPicker(props) {
  const { createPopup } = useContext(PopupContext)
  const { token, setPosition } = useContext(UserContext)
  const [activeMethod, setActiveMethod] = useState("map")
  const [aproximateLocation, setApproximateLocation] = useState({
    gps: null,
  })
  const [locationInfo, setLocationInfo] = useState({
    geolocationAllowed: false,
    formattedAddress: "",
    searchAddress: "",
    gps: null,
  })

  const mapRef = useRef(null)

  const defaultMapOptions = {
    gestureHandling: "greedy",
    keyboardShortcuts: false,
    streetViewControl: true,
    disableDefaultUI: true,
    rotateControl: true,
    zoomControl: true,
    panControl: true,
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
    let clientData = fetch("https://api.bigdatacloud.net/data/reverse-geocode-client").then((res) => res.json())

    clientData.then((res) => {
      setApproximateLocation({
        ...aproximateLocation,
        gps: new google.maps.LatLng(res.latitude, res.longitude),
      })

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
    const newPos = new google.maps.LatLng(mapRef.current.getCenter().toJSON())

    if (!mapRef.current || activeMethod == "input" || locationInfo.formattedAddress != "Loading...") return

    asyncReverseGeocode({
      lat: newPos.lat(),
      lng: newPos.lng(),
    })
      .then((res) => {
        setLocationInfo({
          ...locationInfo,
          formattedAddress: res,
          gps: {
            lat: newPos.lat(),
            lng: newPos.lng(),
          },
        })

        apiMethod("/setUserLocation", {
          method: "POST",
          headers: bearerHeaders(token),
          body: JSON.stringify({
            gps_lng: newPos.lng(),
            gps_lat: newPos.lat(),
          }),
        }).then((res) => {
          console.log(res)
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
        zoom: 14,
      })

      mapRef.current.setCenter({
        lat: aproximateLocation.gps.lat(),
        lng: aproximateLocation.gps.lng(),
      })

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords

          asyncReverseGeocode({
            lat: latitude,
            lng: longitude,
          })
            .then((res) => {
              console.log(res)
              setLocationInfo({
                ...locationInfo,
                formattedAddress: res,
                gps: {
                  lat: latitude,
                  lng: longitude,
                },
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
              You didn't give us permission to estimate your location based on your GPS location. Please select your location on the map.
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

  const handleLocationChange = () => {
    setPosition({
      gps: locationInfo.gps,
      formattedAddress: locationInfo.formattedAddress,
    })
    console.log("Location changed to: ", locationInfo.gps, ",", locationInfo.formattedAddress)

    props.handleClose()
  }

  let timeout

  return (
    <div className={style["location-picker-container"]}>
      <div className={style["picking-options"]}>
        <div onClick={(_) => handleChangeActiveMethod("map")} {...(activeMethod == "map" && { className: style["active"] })}>
          Select your location on the map
        </div>
        <div onClick={(_) => handleChangeActiveMethod("input")} {...(activeMethod == "input" && { className: style["active"] })}>
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
            onCenterChanged={() => {
              if (locationInfo.formattedAddress != "Loading...") {
                setLocationInfo({
                  ...locationInfo,
                  formattedAddress: "Loading...",
                  gps: null,
                })
              }
            }}
            onIdle={(e) => {
              clearTimeout(timeout)
              timeout = setTimeout(handleCenterChanged, 1200)
            }}
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
            {activeMethod == "map" ? "We think you are pointing here:" : "We think you are here:"}
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
          <div className={style["location-info-actions"]}>
            <button
              {...(locationInfo.formattedAddress == "Loading..." && { disabled: true })}
              onClick={() => {
                handleLocationChange()
              }}>
              Save
            </button>
            <button
              onClick={() => {
                setLocationInfo({
                  ...locationInfo,
                  formattedAddress: "Loading...",
                })
                props.handleClose()
              }}>
              <img src={CloseIcon} alt="X" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LocationPicker)
