import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/home"
import Test from "./pages/test"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}
