import React, { useEffect, useState } from "react"
import avatar from "../images/avatar.jpg"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import OrderComponent from "../components/OrderComponent"
import AdminComponent from "../components/AdminComponent"

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [userLastName, setUserLastName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("")
  const [userDeliveryAddress, setUserDeliveryAddress] = useState<string>("")
  const [role, setRole] = useState<string>("")

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user/info")
      setUserFirstName(response.data.firstName)
      setUserLastName(response.data.lastName)
      setUserEmail(response.data.email)
      setUserPhoneNumber(response.data.phoneNumber)
      setUserDeliveryAddress(response.data.deliveryAddress)
      setRole(response.data.role)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.patch("/api/user/info", {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        deliveryAddress: userDeliveryAddress,
        phoneNumber: userPhoneNumber,
      })
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
    alert("Data is successful saved!")
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      {role !== "admin" ? "" : <AdminComponent />}
      <h1 className="text-center">User profile</h1>
      <Row>
        <Col sm={5} className="text-center">
          <img src={avatar} alt="profile avatar" height={250} width={250} />
        </Col>
        <Col sm={7}>
          <Form className="mt-5" onSubmit={handleOnUpdate}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                value={userFirstName ? userFirstName : ""}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                value={userLastName ? userLastName : ""}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={userEmail ? userEmail : ""}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                type="text"
                value={userPhoneNumber ? userPhoneNumber : ""}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Delivery address:</Form.Label>
              <Form.Control
                type="text"
                value={userDeliveryAddress ? userDeliveryAddress : ""}
                onChange={(e) => setUserDeliveryAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <OrderComponent />
      </Row>
    </>
  )
}
