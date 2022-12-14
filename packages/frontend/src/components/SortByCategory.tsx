import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function SortByCategory(props: { products: Product[] }) {
  const [category, setCategory] = useState<string>("")
  const [productsByCategory, setProductsByCategory] = useState<Product[]>([])
  const [show, setShow] = useState<boolean>(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const groupByCategories = props.products.reduce(
    (group: any, product: any) => {
      const { categories } = product

      group[categories] = group[categories] ?? []
      group[categories].push(product)
      return group
    },
    {}
  )
  const selectCategory = async () => {
    if (category) {
      const response = await axios.get(`/api/products/categories/${category}`)
      setProductsByCategory(response.data)
    }
  }

  useEffect(() => {
    selectCategory()
    // eslint-disable-next-line
  }, [category])

  return (
    <>
      <Col md={4} className="mb-5">
        <Form.Select
          onChange={(e) => {
            setCategory("")
            setCategory(e.target.value)
            handleShow()
          }}
        >
          <option>select by category</option>
          {Object.keys(groupByCategories).map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            )
          })}
        </Form.Select>
      </Col>
      <Modal show={show} onHide={handleClose}>
        {productsByCategory.length !== 0 ? (
          productsByCategory.map((product) => {
            return (
              <li key={product._id} style={{ listStyle: "none" }}>
                <Modal.Header>
                  <h5>{product.title}</h5>
                </Modal.Header>

                <Modal.Body>
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={`data:image/jpg;base64,${
                        Object.values(product?.images)[0]
                      }`}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt={product.title}
                    />
                  </Link>
                </Modal.Body>
                <Modal.Footer>
                  <p>price: {product.price}</p>
                  <p>weight: {product.weight}</p>
                </Modal.Footer>
              </li>
            )
          })
        ) : (
          <Modal.Body>please select a category!</Modal.Body>
        )}
      </Modal>
    </>
  )
}
