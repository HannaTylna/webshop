import axios from "axios"
import Table from "react-bootstrap/Table"
import { Order } from "@webshop/shared"

import { useEffect, useState } from "react"

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders")
      console.log(response.data)
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <h1 className="text-center">Your orders:</h1>
    </>
  )
}
