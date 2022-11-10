import { useState } from "react"
import { Offcanvas, Stack, Button } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import CartItem from "../components/CartItem"

type CartProps = {
  isOpen: boolean
}

const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems, cart, buyProducts, deliveryAddress } = useCart()
  const savedCart = cart[0] || {}
  const [address, setAddress] = useState<string>(deliveryAddress)
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      {cartItems.length > 0 && (
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
            <input
              type="text"
              className="form-control"
              placeholder="Enter your delivery address ..."
              defaultValue={deliveryAddress}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
            <Button
              className="w-100"
              onClick={() => {
                buyProducts(address ? address : deliveryAddress)
              }}
            >
              Buy
            </Button>
          </Stack>
        </Offcanvas.Body>
      )}
    </Offcanvas>
  )
}

export default Cart
