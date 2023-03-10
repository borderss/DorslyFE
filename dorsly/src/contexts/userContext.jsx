import React, { createContext, useMemo, useState } from "react"
import { apiMethod, bearerHeaders } from "../static/js/util"

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState(false)

  const contextValue = useMemo(() => {
    return {
      user,
      token,
      setUser,
      setToken,
    }
  }, [user, token, setUser, setToken])

  window.addEventListener("load", () => {
    const token = window.localStorage.getItem("access_token")

    if (!token) {
      setUser(null)
      setUser(null)
      return
    }

    apiMethod("/user", {
      method: "GET",
      headers: bearerHeaders(token),
    }).then((res) => {
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
