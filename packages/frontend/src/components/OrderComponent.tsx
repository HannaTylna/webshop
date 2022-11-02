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
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Delivery address</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.totalCost} kr</td>
                <td>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
