import {Nav} from "react-bootstrap"

export default function LogOut() {
    const handOnClick = async():Promise<void> => {
        await localStorage.removeItem('webshop')
        window.location.reload()
    }
  return (
    <Nav.Link onClick={handOnClick}>
    Logout
    </Nav.Link>
  )
}
