import { Stack, Button } from "react-bootstrap"
import { OrderItem } from "@webshop/shared"
import { useCart } from "../context/CartContext"

const CartItem = ({ productId, quantity, price }: OrderItem) => {
  const { increaseCartQuantity, decreaseCartQuantity } = useCart()
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      {/* <img
        src={item.url}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      /> */}
      <div className="me-auto">
        <div>Item Name</div>
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
