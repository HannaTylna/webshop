import { Product } from "@webshop/shared"
import { useEffect } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const ProductRow = (props: { product: Product }) => {
  const { title, price, images, _id } = props.product
  const id = _id || ""
  const values = Object.values(images)
  const imageURL = values[0]
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    getCurrentUser,
    fetchCart,
    errorMessage,
  } = useCart()

  const quantity = getItemQuantity(id)

  useEffect(() => {
    if (!errorMessage) {
      getCurrentUser()
      fetchCart()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Col>
      <Card className="h-100">
        <Link to={`/products/${_id}`}>
          <Card.Img
            variant="top"
            src={`data:image/jpg;base64,${imageURL}`}
            height="200px"
            style={{ objectFit: "cover" }}
          />
        </Link>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-6">{title}</span>
            <span className="ms-2 text-muted">{price} kr</span>
          </Card.Title>
          {!errorMessage && (
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  className="w-100"
                  onClick={() => increaseCartQuantity(id, price)}
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
                  <Button onClick={() => increaseCartQuantity(id, price)}>
                    +
                  </Button>
                </div>
              )}
            </div>
          )}
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
