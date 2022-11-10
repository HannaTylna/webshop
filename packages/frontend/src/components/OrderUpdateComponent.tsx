import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"

export default function OrderUpdateComponent(props: any) {
  const [user, setUser] = useState<string>("")
  const [shippingCost, setShippingCost] = useState<number>()
  const [deliveryAddress, setDeliveryAddress] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [updatedStatus, setUpdatedStatus] = useState<string>("")

  const getOrder = async () => {
    try {
      const response = await axios.get(`api/admin/update/${props.id}`)
      setUser(response.data.user)
      setShippingCost(response.data.shippingCost)
      setDeliveryAddress(response.data.deliveryAddress)
      setStatus(response.data.status)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.patch(`api/admin/update/${props.id}`, {
        status: updatedStatus,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrder()
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <h3 className="text-center mt-5 mb-5 font-weight-bold">
        Order ID: {props.id}
      </h3>
      <Table bordered>
        <tbody>
          <tr>
            <td className="text-center text-uppercase">User ID</td>
            <td>{user}</td>
          </tr>
          <tr>
            <td className="text-center text-uppercase">Shipping cost</td>
            <td>{shippingCost}</td>
          </tr>
          <tr>
            <td className="text-center text-uppercase">Delivery address</td>
            <td>{deliveryAddress}</td>
          </tr>
          <tr>
            <td className="text-center text-uppercase">Status</td>
            <td>{updatedStatus ? updatedStatus : status}</td>
          </tr>
        </tbody>
      </Table>

      <Form className="mb-5" onSubmit={handleSubmit}>
        <div className="form-outline form-white mb-4">
          <Form.Check
            type="checkbox"
            id="registered"
            label={"Registered"}
            checked={status === "registered"}
            onChange={() => setStatus("registered")}
          />
          <Form.Check
            type="checkbox"
            id="processing"
            label={"Processing"}
            checked={status === "processing"}
            onChange={() => setStatus("processing")}
          />
        </div>
        <button className="btn btn-primary btn-lg px-5" type="submit">
          Change status
        </button>
      </Form>
    </>
  )
}
