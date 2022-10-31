import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useState } from "react"
import { Form } from "react-bootstrap"

export default function SortByCategory(props: { products: any }) {
  const [category, setCategory] = useState<string>("")
  const [productsByCategory, setProductsByCategory] = useState<
    Product[] | null
  >([])

  const groupByCategories = props.products.reduce(
    (group: any, product: any) => {
      const { categories } = product

      group[categories] = group[categories] ?? []
      group[categories].push(product)
      return group
    },
    {}
  )
  const selectCategory = async (category: string) => {
    console.log("category", category)
    const response = await axios.get(`/api/products/categories/${category}`)
    setProductsByCategory(response.data)
  }
  console.log(productsByCategory)
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        setCategory(e.target.value)
      }}
      onSubmit={() => {
        selectCategory(category)
      }}
    >
      <option>select by category</option>
      {Object.keys(groupByCategories).map((category) => {
        return (
          <option key={category.length} value={category}>
            {category}
          </option>
        )
      })}
    </Form.Control>
  )
}
