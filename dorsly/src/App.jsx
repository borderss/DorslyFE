import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import Authentificaton from "./pages/authentificaton"
import Home from "./pages/home"
import Admin from "./pages/admin"
import Error from "./pages/error"
import MainProductPage from "./pages/mainProductPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/login" element={<Authentificaton page="login"/>} />
        <Route path="/products" element={<MainProductPage/>} />
        <Route path="/register" element={<Authentificaton page="register"/>} />
      </Routes>
    </BrowserRouter>
  )
}