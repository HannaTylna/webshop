import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function ProductPage() {
  const [product, setProduct] = useState<Product>()
  const [error, setError] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const params = useParams()

  const getUserRole = async () => {
    try {
      const response = await axios.get("/api/user/info")
      setRole(response.data.role)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserRole()
  }, [])

  const getProduct = async (): Promise<Product> => {
    const response = await axios.get<Product>(`/api/products/${params.id}`)
    return response.data
  }

  useEffect(() => {
    getProduct()
      .then(setProduct)
      .catch((error) => {
        setError("something wrong when fetching product")
      })
    // eslint-disable-next-line
  }, [])

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
            <h3 className="fs-4 fw-bold text-uppercase mt-5 text-center">
              {product?.title}
            </h3>
            <p className="fs-6 mt-5">
              <span className="fw-bold text-uppercase">Price: </span>
              {product?.price} kr
            </p>
            <p className="fs-6">
              <span className="fw-bold text-uppercase">Description:</span>
              {product?.description}
            </p>
            <p className="fs-6">
              <span className="fw-bold text-uppercase">Weight: </span>
              {product?.weight}
            </p>
            <p className="fs-6">
              <span className="fw-bold text-uppercase">Manufacturer: </span>
              {product?.manufacturer}
            </p>
            <p>
              <span className="fw-bold text-uppercase">Categories: </span>
              {product?.categories.map((category) => (
                <span key={category.length}>{category}</span>
              ))}
            </p>
            <Button variant="primary" className="mt-auto mb-4">
              Add to cart
            </Button>
            {role === "admin" ? (
              <Button
                variant="primary"
                className="mt-auto mb-4"
                href={`/update/${product._id}`}
              >
                Update product
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      )}
    </>
  )
}
