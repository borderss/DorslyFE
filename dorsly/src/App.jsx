import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "../src/static/general.css"

import Home from "./pages/home"
import Login from "./pages/login"
import Test from "./pages/test"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}
