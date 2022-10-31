import { Stack, Button } from "react-bootstrap"

type CartItemProps = {
  id: string
  quantity: number
}
const CartItem = ({ id, quantity }: CartItemProps) => {
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      {/* <img
        src={item.url}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      /> */}
      <div className="me-auto">
        <div className="d-flex align-items-center">
          <div>Item Name</div>
          <div>{quantity}</div>
        </div>
        <div className="text-muted">Item Price</div>
      </div>
      <div>Total sum</div>
      <div>
        <Button>-</Button>
        <Button>+</Button>
      </div>
    </Stack>
  )
}

export default CartItem
