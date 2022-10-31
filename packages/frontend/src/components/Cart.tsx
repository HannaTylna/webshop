import { Offcanvas, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import CartItem from "../components/CartItem"

type CartProps = {
  isOpen: boolean
}

const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems } = useCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Cart
