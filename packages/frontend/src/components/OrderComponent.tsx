import axios from "axios"
import Table from "react-bootstrap/Table"
import { Order } from "@webshop/shared"

import { useEffect, useState } from "react"

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders")
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
      <hr />
      <h1 className="text-center">Your orders:</h1>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Delivery address</th>
            <th className="text-center">Total</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-center">
                  {order.deliveryAddress ? order.deliveryAddress : "-"}
                </td>
                <td className="text-center">{order.totalCost} kr</td>
                <td className="text-center">{order.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
