import axios from "axios"
import Table from "react-bootstrap/Table"
import { Order } from "@webshop/shared"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/admin/getallorders")
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
      <h1 className="text-center">User's orders:</h1>
      <Table striped>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Order id</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{order._id}</td>
                <td className="text-center">{order.status}</td>
                <td className="text-center">
                  <Button href={`/order/${order._id}`}>More ...</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
