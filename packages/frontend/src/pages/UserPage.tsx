import React, { useEffect, useState } from "react"
import avatar from "../images/avatar.jpg"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { User } from "@webshop/shared"
import axios from "axios"

const getUser = async (): Promise<User> => {
  const response = await axios.get<User>("/api/info")
  return response.data
}

export default function UserPage() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const token = localStorage.getItem("chatapp")
    console.log(token)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    console.log(config)
    axios.get("/api/info", config).then(console.log).catch(console.log)
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
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={user?.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Delivery address:</Form.Label>
              <Form.Control type="text" />
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
