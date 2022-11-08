import React, { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "@webshop/shared"
import { Row } from "react-bootstrap"
import ProductList from "../components/ProductList"
import Search from "../components/Search"
import SortByCategory from "../components/SortByCategory"

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>("/api/products")
    setProducts(response.data)
    localStorage.setItem("products", JSON.stringify(response.data))
    return products
  }
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <Row>
        <Search />
        <SortByCategory products={products} />
      </Row>

      <Row md={2} xs={1} lg={3} className="g-3">
        <ProductList products={products} />
      </Row>
    </>
  )
}
