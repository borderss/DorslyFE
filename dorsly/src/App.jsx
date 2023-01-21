import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/css/general.css"

import Admin from "./pages/admin"
import Authentificaton from "./pages/authentificaton"
import Home from "./pages/home"
<<<<<<< HEAD
import Admin from "./pages/admin"
import Error from "./pages/error"
=======
>>>>>>> e3cbe03a7df3006db0093f737b1f643f685e61cf
import MainProductPage from "./pages/mainProductPage"
import Place from "./pages/place"

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/login" element={<Authentificaton page="login"/>} />
        <Route path="/products" element={<MainProductPage/>} />
        <Route path="/register" element={<Authentificaton page="register"/>} />
=======
      <Routes history={history}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentificaton page="login" />} />
        <Route path="/register" element={<Authentificaton page="register" />} />

        <Route path="/products" element={<MainProductPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/place" element={<Place />} />
>>>>>>> e3cbe03a7df3006db0093f737b1f643f685e61cf
      </Routes>
    </BrowserRouter>
  )
}
