import React,{ useState, useEffect } from "react"
import { Navbar as NavbarBs, Nav, Container, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import cakelogo from "../images/cakelogo.jpg"
import avatar from "../images/avatar.jpg"
import { useCart } from "../context/CartContext"
import LogOut from "./Logout"

export default function Navbar() {
  const { openCart, cartQuantity, errorMessage } = useCart()
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false)

  useEffect(()=>{
    if(localStorage.getItem('webshop')){
      setIsLoggedin(true)
    }
    // eslint-disable-next-line
  },[])
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 p-4">
      <Container>
        <Nav className="d-flex justify-content-center align-items-center">
          {
            isLoggedin?
            <LogOut/>
            :
            <>
            <Nav.Link as={NavLink} to="/signin">
              login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup">
              signup
            </Nav.Link>
            </>
          }
        </Nav>
        <NavbarBs.Brand
          href="/"
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: "-50px",
            padding: 0,
          }}
        >
          <img src={cakelogo} alt="logo" height={80} width={150} />
        </NavbarBs.Brand>
        {!errorMessage && (
          <Nav className="d-flex justify-content-center align-items-center">
            <Button
              onClick={openCart}
              style={{
                width: "3rem",
                height: "3rem",
                position: "relative",
              }}
              variant="outline-primary"
              className="rounded-circle "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>

              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  position: "absolute",
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%,25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
            <Nav.Link as={NavLink} to="/profile">
              <img
                src={avatar}
                alt="profile avatar"
                height={60}
                width={60}
                style={{ borderRadius: "50%" }}
              />
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </NavbarBs>
  )
}
