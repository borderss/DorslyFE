import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import Admin from "./pages/admin"
import Authentificaton from "./pages/authentificaton"
import Error from "./pages/error"
import Home from "./pages/home"
import MainProductPage from "./pages/mainProductPage"
import PaymentGateway from "./pages/paymentGateway"
import Place from "./pages/place"

export default function App() {
  return (
    <BrowserRouter>
      <Routes history={history}>
        <Route path="/register" element={<Authentificaton page="register"/>} />
        <Route path="/login" element={<Authentificaton page="login"/>} />
        <Route path="/products" element={<MainProductPage/>} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/place" element={<Place />} />
        <Route path="/error" element={<Error/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
