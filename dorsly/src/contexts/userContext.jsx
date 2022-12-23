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

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}
