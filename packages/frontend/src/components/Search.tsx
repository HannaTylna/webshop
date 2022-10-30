import { Product } from "@webshop/shared"
import axios from "axios"
import React, { useState } from "react"
import { Col, InputGroup, Modal, Row } from "react-bootstrap"

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
    <Row>
      <Col md={{ offset: 9 }} className="mb-5">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="search by title"
        ></input>
        <button
          type="submit"
          onClick={() => {
            onSearch(searchText)
            handleShow()
          }}
        >
          search
        </button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product) => {
            return (
              <>
                <Modal.Header>
                  <h5>{product.title}</h5>
                </Modal.Header>

                <Modal.Body key={product._id}>
                  <img
                    src={Object.values(product?.images)[1].small}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt={product.title}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <p>price: {product.price}</p>
                  <p>weight: {product.weight}</p>
                </Modal.Footer>
              </>
            )
          })
        ) : (
          <Modal.Body>sorry, no product founded!</Modal.Body>
        )}
      </Modal>
    </Row>
  )
}
