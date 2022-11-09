import axios from "axios"
import Table from "react-bootstrap/Table"
import { Order } from "@webshop/shared"

import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [updatedStatus, setUpdatedStatus] = useState<string>("")
  const id = useParams()

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/admin/getallorders")
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    try {
      await axios.patch(`/api/admin/info${id}`)
      console.log(id)
    } catch (error) {
      console.log("Something went wrong!")
    }
    window.location.reload()
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
            <th className="text-center">Order id</th>
            <th className="text-center">Status</th>
            <th className="text-center">New status</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
                <td className="text-center">{order._id}</td>
                <td className="text-center">{order.status}</td>
                <td>
                  <Form.Select aria-label="Default select example">
                    <option>Change status</option>
                    <option value="registered">Registered</option>
                    <option value="processing">Processing</option>
                    <option value="in delivery">In delivery</option>
                    <option value="delivered">Delivered</option>
                  </Form.Select>
                </td>
                <td>
                  <Button variant="secondary" size="sm">
                    Save
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
