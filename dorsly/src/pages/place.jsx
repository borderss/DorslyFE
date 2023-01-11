import React, { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export default function place(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  

  useEffect(() => {
    if (
      searchParams.get("p") == null ||
      searchParams.get("p") == "undefined" ||
      searchParams.get("p") == "null" ||
      searchParams.get("p") == "NaN" ||
      searchParams.get("p") == "false" ||
      searchParams.get("p") == "0" ||
      searchParams.get("p") == "[]"
    ) {
      navigate("/products")
    }
  }, [navigate])

  return (
    <>
      <h1>{searchParams.get("p")}</h1>
    </>
  )
}
