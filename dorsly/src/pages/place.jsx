import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function place(props) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof(props.noid) == "undefined" || props.noid || !location?.state?.place) {
      navigate("/products")
    }
  }, [props.noid, navigate])
  

  const product = location?.state?.place

  return (
    <>
      <h1>{product.name}</h1>
      <h1>{product.desc}</h1>
    </>
  )
}
