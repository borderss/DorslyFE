import React, { createContext, useMemo, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserContextProvider from "./contexts/userContext"


import "../src/static/css/general.css"

import Authentificaton from "./pages/authentificaton"
import Home from "./pages/home"
import Test from "./pages/test"



export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authentificaton page="login" />} />
          <Route
            path="/register"
            element={<Authentificaton page="register" />}
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}