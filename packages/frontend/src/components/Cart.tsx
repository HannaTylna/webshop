import { Offcanvas } from "react-bootstrap"
import { useCart } from "../context/CartContext"

type CartProps = {
  isOpen: boolean
}

const Cart = ({ isOpen }: CartProps) => {
  const { closeCart } = useCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  )
}

export default Cart
