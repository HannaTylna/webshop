import { Product } from "@webshop/shared"
import React from "react"
import { Button, Card, Col } from "react-bootstrap"
import { useCart } from "../context/CartContext"

const ProductRow = (props: { product: Product }) => {
  const { title, price, images, _id } = props.product
  const id = _id || ""
  const values = Object.values(images)
  const imageURL = values[1].large
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCart()
  const quantity = getItemQuantity(id)
  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imageURL}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-6">{title}</span>
            <span className="ms-2 text-muted">{price} kr</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => increaseCartQuantity(id)}
              >
                {" "}
                + Add to cart
              </Button>
            ) : (
              <div className="d-flex align-items-center justify-content-center style={{gap:'.5rem'}}">
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-5 m-1">{quantity} in cart</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}
export default function ProductList(props: { products: Product[] }) {
  return (
    <>
      {props.products.map((product) => (
        <ProductRow key={product._id} product={product} />
      ))}
    </>
  )
}
