import React, { useState } from "react"
import avatar from "../images/avatar.jpg"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function UserPage() {
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
              <Form.Control type="email" />
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
