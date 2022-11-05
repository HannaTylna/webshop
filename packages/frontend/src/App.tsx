import axios from "axios"
import React from "react"
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import ProductPage from "./pages/ProductPage"
import { CartProvider } from "./context/CartContext"
import UserPage from "./pages/UserPage"
import SigninPage from "./pages/SigninPage"
import SignupPage from "./pages/SignupPage"

axios.defaults.baseURL =
  process.env.REACT_APP_WEBSHOP_API || "http://localhost:4000"

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {}
  }
  const jwt = localStorage.getItem("webshop")
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`
  }
  return config
})

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Container>
    </CartProvider>
  )
}

export default App
