import axios from "axios"
import React from "react"
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import UserPage from "./pages/UserPage"

axios.defaults.baseURL =
  process.env.REACT_APP_WEBSHOP_API || "http://localhost:4000"

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
