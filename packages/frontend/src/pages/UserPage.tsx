import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import avatar from "../images/avatar.jpg"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userDeliveryAddress, setUserDeliveryAddress] = useState("")

  const [updateFirstName, setUpdateFirstName] = useState("")
  const [updateLastName, setUpdateLastName] = useState("")
  const [updateEmail, setUpdateEmail] = useState<string>("")
  const [updatePhone, setUpdatePhoneNumber] = useState<string>("")
  const [updateAddress, setUpdateDeliveryAddress] = useState<string>("")

  const navigate = useNavigate()
  const token = localStorage.getItem("webshop")
  console.log(token)

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserFirstName(response.data.firstName)
      setUserLastName(response.data.lastName)
      setUserEmail(response.data.email)
      setUserPhoneNumber(response.data.phoneNumber)
      setUserDeliveryAddress(response.data.deliveryAddress)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (token) {
      getCurrentUser()
    } else {
      navigate("/signin")
    }
  }, [])

  return (
    <>
      <h1 className="text-center">User page</h1>
      <Row>
        <Col sm={5}>
          <img src={avatar} alt="profile avatar" height={250} width={250} />
        </Col>
        <Col sm={7}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                value={userFirstName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUpdateFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                value={userLastName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUpdateLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={userEmail}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUpdateEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                type="text"
                value={userPhoneNumber}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUpdatePhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Delivery address:</Form.Label>
              <Form.Control
                type="text"
                value={userDeliveryAddress}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUpdateDeliveryAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}
