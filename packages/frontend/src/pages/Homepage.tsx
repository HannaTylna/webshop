import React, { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "@webshop/shared"
import { Row } from "react-bootstrap"
import ProductList from "../components/ProductList"
export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>("/api/products")
    setProducts(response.data)
    return products
  }
  useEffect(() => {
    getProducts()
  }, [])
  console.log(products)
  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        <ProductList products={products} />
      </Row>
    </>
  )
}