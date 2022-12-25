import React, { createContext, useMemo, useState } from "react"

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

  window.onload = () => {
    const data = localStorage.getItem("user")

    if (!data) {
      return
    }

    const token = JSON.parse(data)
    if (token.user && token.access_token) {
      setUser(token.user)
      setToken(token.access_token)
    }
  }

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}
