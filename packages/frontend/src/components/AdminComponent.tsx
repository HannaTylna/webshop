import { Button, Col, Row } from "react-bootstrap"

export default function AdminComponent() {
  return (
    <>
      <Row className="mt-5">
        <Col>
          <Button className="mb-5" variant="primary" size="lg" href="/orders">
            See and update orders
          </Button>
        </Col>
        <Col>
          <Button
            className="mb-5"
            variant="primary"
            size="lg"
            href="/add/products"
          >
            Add and update products
          </Button>
        </Col>
      </Row>
    </>
  )
}
