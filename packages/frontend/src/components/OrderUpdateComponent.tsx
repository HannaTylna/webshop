import axios from "axios"
import { useEffect } from "react"

export default function OrderUpdateComponent(props: any) {
  const getOrder = async () => {
    try {
      const response = await axios.get(`api/admin/update/${props.id}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrder()
  }, [])
  return <h1>Order with id: ${}</h1>
}
