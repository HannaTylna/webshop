import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function ProductPage() {
  const [product, setProduct] = useState<Product>()
  const [error, setError] = useState<string>("")
  const params = useParams()

  useEffect(() => {
    getProduct()
      .then(setProduct)
      .catch((error) => {
        setError("something wrong when fetching product")
      })
    // eslint-disable-next-line
  }, [])
  const getProduct = async (): Promise<Product> => {
    const response = await axios.get<Product>(`/api/products/${params.id}`)
    return response.data
  }

  return (
    <>
      {error && <p>{error}</p>}
      {product && (
        <Row>
          <Col
            style={{ height: 300 }}
            className="d-flex justify-content-center"
          >
            <img
              src={`data:image/jpg;base64,${Object.values(product?.images)[0]}`}
              alt={product?.title}
            />
          </Col>
          <Col
            md={6}
            xs={10}
            className="d-flex flex-column justify-content-center"
          >
            <p className="fs-4">{product?.title}</p>
            <p className="fs-6 mt-5">price: {product?.price} kr</p>
            <p className="fs-6">description: {product?.description}</p>
            <p className="fs-6">weight: {product?.weight}</p>
            <p className="fs-6">manufacturer: {product?.manufacturer}</p>
            <p>
              categories:
              {product?.categories.map((category) => (
                <span key={category.length}>{category}</span>
              ))}
            </p>
            <Button variant="primary" className="mt-auto mb-4">
              add to cart
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}
