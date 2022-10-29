import { Offcanvas } from "react-bootstrap"

const Cart = () => {
  return (
    <Offcanvas show={true} plasement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  )
}

export default Cart
