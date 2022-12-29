import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import Authentificaton from "./pages/authentificaton"
import Home from "./pages/home"
import Admin from "./pages/admin"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Authentificaton page="login"/>} />
        <Route path="/register" element={<Authentificaton page="register"/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}
