import React, { createContext, useMemo, useState } from "react"
import { apiMethod, bearerHeaders } from "../static/js/util"

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const contextValue = useMemo(() => {
    return {
      user,
      token,
      setUser,
      setToken,
    }
  }, [user, token, setUser, setToken])

  window.addEventListener("load", (event) => {
    console.log("page is fully loaded")
    const token = window.localStorage.getItem("access_token")

    if (!token) {
      return
    }

    apiMethod("/user", {
      method: "GET",
      headers: bearerHeaders(token)
    })
      .then((res) => {
      console.log("user returned with token")
      console.log(res)

      if (!res.message) {
        setUser(res)
        setToken(token)
      } else {
        localStorage.removeItem("access_token")
        setUser(null)
        setToken(null)
      }
    })
  })

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}
