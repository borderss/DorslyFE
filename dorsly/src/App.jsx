import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import Admin from "./pages/admin"
import Authentificaton from "./pages/authentificaton"
import Home from "./pages/home"
import Error from "./pages/error"
import MainProductPage from "./pages/mainProductPage"
import Place from "./pages/place"

export default function App() {
  return (
    <BrowserRouter>
      <Routes history={history}>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Authentificaton page="login"/>} />
        <Route path="/register" element={<Authentificaton page="register"/>} />
        <Route path="/products" element={<MainProductPage/>} />
        <Route path="/place" element={<Place />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/error" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}
