import { Stack, Button } from "react-bootstrap"
import { OrderItem } from "@webshop/shared"
import { useCart } from "../context/CartContext"

const CartItem = ({ productId, quantity, price }: OrderItem) => {
  const { increaseCartQuantity, decreaseCartQuantity } = useCart()
  const products: string | null = localStorage.getItem("products")
  const parsedProducts = JSON.parse(products || "")
  const item = parsedProducts.find((item: any) => item._id === productId)

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.images.src.small}
        style={{ width: "125px", height: "100px", objectFit: "cover" }}
        alt={item.title}
      />
      <div className="me-auto">
        <div
          style={{
            width: "75px",
            height: "75px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </div>
        <div className="text-muted">
          {quantity} X {price}
        </div>
      </div>
      <div>{price * quantity}</div>
      <div>
        <Button onClick={() => decreaseCartQuantity(productId)}>-</Button>
        <Button onClick={() => increaseCartQuantity(productId, price)}>
          +
        </Button>
      </div>
    </Stack>
  )
}

export default CartItem
