import { Offcanvas, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import CartItem from "../components/CartItem"

type CartProps = {
  isOpen: boolean
}

const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems, cart } = useCart()
  const savedCart = cart[0] || {}
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      {cartItems && (
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.productId} {...item} />
            ))}
          </Stack>
          <Stack gap={3}>
            <div className="ms-auto fw-bold fs-5">
              Shipping cost: {savedCart.shippingCost}
            </div>
            <div className="ms-auto fw-bold fs-5">
              Total cost: {savedCart.totalCost}
            </div>
          </Stack>
        </Offcanvas.Body>
      )}
    </Offcanvas>
  )
}

export default Cart
