import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { apiMethod, defaultHeaders } from "../static/js/util"

export default function paymentGateway() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const poiID = searchParams.get("poi")

  console.log("session id", sessionId)

  React.useEffect(() => {
    if (sessionId) {
      apiMethod("/successPayment", {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify({
          session_id: sessionId,
        }),
      })
        .then((data) => {
          console.log(data)
          navigate("/place?p=" + poiID, {
            state: {
              paymentSuccess: true,
            },
          })
        })
        .catch((err) => {
          console.log(err)
          navigate("/place?p=" + poiID, {
            state: {
              paymentSuccess: true,
            },
          })
        })
    }
  }, [navigate])

  return <div>Loading...</div>
}
