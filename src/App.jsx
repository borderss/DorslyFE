import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import AboutUs from "./pages/aboutUs"
import Admin from "./pages/admin"
import Authentificaton from "./pages/authentificaton"
import Business from "./pages/business"
import Error from "./pages/error"
import Home from "./pages/home"
import Instruction from "./pages/instruction"
import MainProductPage from "./pages/mainProductPage"
import PaymentGateway from "./pages/paymentGateway"
import Place from "./pages/place"
import Profile from "./pages/profile"

export default function App() {
  return (
    <BrowserRouter>
      <Routes history={history}>
        <Route path="/products" element={<MainProductPage />} />
        <Route path="/register" element={<Authentificaton page="register" />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Authentificaton page="login" />} />
        <Route path="/error" element={<Error />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/business" element={<Business />} />
        <Route path="/place" element={<Place />} />
        <Route path="/help" element={<Instruction />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
