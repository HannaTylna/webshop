import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Search() {
  const [searchText, setSearchText] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [show, setShow] = useState<boolean>(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const onSearch = async (searchText: string): Promise<Product[] | null> => {
    const response = await axios.get(`/api/products/search/${searchText}`)
    setFilteredProducts(response.data)
    setSearchText("")
    return filteredProducts
  }

  return (
    <>
      <Col md={{ span: 4, offset: 4 }} className="mb-5">
        <Form className="d-flex">
          <Form.Control
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="search by title"
          />
          <Button
            variant="outline-success"
            onClick={() => {
              onSearch(searchText)
              handleShow()
            }}
          >
            search
          </Button>
        </Form>
      </Col>
      <Modal show={show} onHide={handleClose}>
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product) => {
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
          <Modal.Body>sorry, no product founded!</Modal.Body>
        )}
      </Modal>
    </>
  )
}
