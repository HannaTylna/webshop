import React from "react"
import { useParams } from "react-router-dom"
import OrderUpdateComponent from "../components/OrderUpdateComponent"

export default function OrderUpdatePage() {
  const params = useParams()
  return <OrderUpdateComponent id={params.id} />
}
