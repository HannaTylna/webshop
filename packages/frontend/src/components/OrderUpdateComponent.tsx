import axios from "axios"
import { useEffect, useState } from "react"
import { Form, Table } from "react-bootstrap"

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

  const handleOnClick = async () => {
    try {
      await axios.post(`api/admin/update/${props.id}`, {
        status: updatedStatus,
      })
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
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
            <td>{status}</td>
          </tr>
        </tbody>
      </Table>

      <div className="form-outline form-white mb-4">
        <Form.Check
          type="checkbox"
          id="registered"
          label={"Registered"}
          checked={updatedStatus === "registered"}
          onChange={() => setUpdatedStatus("registered")}
        />
        <Form.Check
          type="checkbox"
          id="processing"
          label={"Processing"}
          checked={updatedStatus === "processing"}
          onChange={() => setUpdatedStatus("processing")}
        />
        <Form.Check
          type="checkbox"
          id="inDelivery"
          label={"In delivery"}
          checked={updatedStatus === "in delivery"}
          onChange={() => setUpdatedStatus("in delivery")}
        />
        <Form.Check
          type="checkbox"
          id="delivered"
          label={"Delivered"}
          checked={updatedStatus === "delivered"}
          onChange={() => setUpdatedStatus("delivered")}
        />
      </div>
      <button
        className="btn btn-primary btn-lg px-5"
        type="submit"
        onClick={handleOnClick}
      >
        Change status
      </button>
    </>
  )
}
