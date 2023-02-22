import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import MainProductPage from "./pages/mainProductPage"
import Authentificaton from "./pages/authentificaton"
import PaymentGateway from "./pages/paymentGateway"
import AboutUs from "./pages/aboutUs";
import Instruction from "./pages/instruction"
import Profile from "./pages/profile"
import Place from "./pages/place"
import Error from "./pages/error"
import Admin from "./pages/admin"
import Home from "./pages/home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes history={history}>
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/products" element={<MainProductPage />} />
        <Route path="/register" element={<Authentificaton page="register" />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Authentificaton page="login" />} />
        <Route path="/place" element={<Place />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
