import React from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { apiMethod, defaultHeaders } from "../static/js/util"

export default function paymentGateway() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")


  React.useEffect(() => {
    if (sessionId) {
      apiMethod("/successPayment", {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify({
          session_id: sessionId,
        }),
      }).then((data) => {
        console.log(data)
        navigate(-1, { state: { paymentSuccess: true } })
      }).catch((err) => {
        console.log(err)
        navigate(-1, { state: { paymentSuccess: false } })
      })
    }
  }, [sessionId])

  return <div>Loading...</div>
}
