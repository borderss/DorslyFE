import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React from "react"

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(props.center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={props.containerStyle}
      center={props.center}
      zoom={10}>
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(Map)
