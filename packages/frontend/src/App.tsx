import React from "react"
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <h1>Webshop 💰</h1>
      </Container>
    </>
  )
}

export default App
