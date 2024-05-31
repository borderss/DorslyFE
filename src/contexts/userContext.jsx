import React, { createContext, useEffect, useMemo, useState } from "react"
import { apiMethod, bearerHeaders } from "../static/js/util"

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState(false)
  const [position, setPosition] = useState(false)

  const contextValue = useMemo(() => {
    return {
      user,
      token,
      position,
      setUser,
      setToken,
      setPosition,
    }
  }, [user, token, position, setUser, setToken, setPosition])

  useEffect(() => {
    const local_token = window.localStorage.getItem("access_token")

    if (!local_token) {
      setUser(null)
      setUser(null)
      return
    }

    apiMethod("/user", {
      method: "GET",
      headers: bearerHeaders(local_token),
    }).then((res) => {
      if (!res.message) {
        setUser(res)
        setToken(local_token)
      } else {
        localStorage.removeItem("access_token")
        setUser(null)
        setToken(null)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}
