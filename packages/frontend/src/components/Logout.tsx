import { Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function LogOut() {
  const navigate = useNavigate()
  const handOnClick = async (): Promise<void> => {
    localStorage.removeItem("webshop")
    navigate("/")
    window.location.reload()
  }
  return <Nav.Link onClick={handOnClick}>Logout</Nav.Link>
}
