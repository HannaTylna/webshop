import React, { useEffect, useState } from "react"
import avatar from "../images/avatar.jpg"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import OrderComponent from "../components/OrderComponent"

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [userLastName, setUserLastName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("")
  const [userDeliveryAddress, setUserDeliveryAddress] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState("")

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user/info")
      setUserFirstName(response.data.firstName)
      setUserLastName(response.data.lastName)
      setUserEmail(response.data.email)
      setUserPhoneNumber(response.data.phoneNumber)
      setUserDeliveryAddress(response.data.deliveryAddress)
    } catch (error) {
      setErrorMessage("Please login!")
    }
  }

  const handleOnUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.patch("/api/user/info", {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        deliveryAddress: userDeliveryAddress,
        phoneNumber: userPhoneNumber,
      })
      console.log(response)
    } catch (error) {
      console.log("Something went wrong!")
    }
    window.location.reload()
    alert("Data is successful saved!")
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      <h1 className="text-center">User profile</h1>
      <Row>
        <Col sm={5}>
          <img src={avatar} alt="profile avatar" height={250} width={250} />
        </Col>
        <Col sm={7}>
          {errorMessage && (
            <p className="alert alert-warning" role="alert">
              {" "}
              {errorMessage}{" "}
            </p>
          )}
          <Form className="mt-5" onSubmit={handleOnUpdate}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                value={userFirstName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                value={userLastName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={userEmail}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                type="text"
                value={userPhoneNumber}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Delivery address:</Form.Label>
              <Form.Control
                type="text"
                value={userDeliveryAddress}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserDeliveryAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <OrderComponent />
      </Row>
    </>
  )
}
