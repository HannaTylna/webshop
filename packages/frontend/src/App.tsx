import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import ProductPage from "./pages/ProductPage"
import { CartProvider } from "./context/CartContext"
import UserPage from "./pages/UserPage"
import SigninPage from "./pages/SigninPage"
import SignupPage from "./pages/SignupPage"
import AddProductsPage from "./pages/AddProductsPage"
import OrdersPage from "./pages/OrdersPage"
import NotFound from "./pages/NotFound"
import OrderUpdatePage from "./pages/OrderUpdatePage"
import ProductUpdatePage from "./pages/ProductUpdatePage"

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
  const [role, setRole] = useState<string>("")
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user/info")
      setRole(response.data.role)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

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
          {role === "admin" ? (
            <>
              <Route path="/orders" element={<OrdersPage />} />
            </>
          ) : (
            <Route path="/orders" element={<NotFound />} />
          )}
          {role === "admin" ? (
            <>
              <Route path="/order/:id" element={<OrderUpdatePage />} />
            </>
          ) : (
            <Route path="/order/:id" element={<NotFound />} />
          )}
          {role === "admin" ? (
            <>
              <Route path="/add/products" element={<AddProductsPage />} />
            </>
          ) : (
            <Route path="/add/products" element={<NotFound />} />
          )}
          {role === "admin" ? (
            <>
              <Route path="/update/:id" element={<ProductUpdatePage />} />
            </>
          ) : (
            <Route path="/update/:id" element={<NotFound />} />
          )}
        </Routes>
      </Container>
    </CartProvider>
  )
}

export default App
