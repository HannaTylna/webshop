import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

export default function ProductUpdateComponent(props: any) {
  const [updatedTitle, setUpdatedTitle] = useState<string>("")
  const [updatedDescription, setUpdatedDescription] = useState<string>("")
  const [updatedCategories, setUpdatedCategories] = useState<string>("")
  const [updatedWeight, setUpdatedWeight] = useState<string>("")
  const [updatedPrice, setUpdatedPrice] = useState<string>("")
  const [updatedManufacturer, setUpdatedManufacturer] = useState<string>("")
  const [updatedFile, setUpdatedFile] = useState<File | null>(null)

  const getCurrentProduct = async () => {
    try {
      const response = await axios.get(`api/products/${props.id}`)
      setUpdatedTitle(response.data.title)
      setUpdatedDescription(response.data.description)
      setUpdatedCategories(response.data.categories)
      setUpdatedWeight(response.data.weight)
      setUpdatedPrice(response.data.price)
      setUpdatedManufacturer(response.data.manufacturer)
      setUpdatedFile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //   const handleChange = (e: any) => {
  //     setUpdatedFile(e.target.files[0])
  //   }
  const handleOnUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.patch(
      `/api/admin/update/${props.id}`,
      {
        title: updatedTitle,
        description: updatedDescription,
        categories: updatedCategories,
        weight: updatedWeight,
        price: updatedPrice,
        manufacturer: updatedManufacturer,
        // images: updatedFile,
      }
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
    )
  }

  useEffect(() => {
    getCurrentProduct()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className="text-center">Update product {updatedTitle}</h1>
      <Row>
        <Col sm={5} className="text-center">
          {/* <img
            src={`data:image/jpg;base64,${Object.values(updatedFile)[0]}`}
            alt="profile avatar"
            height={250}
            width={250}
          /> */}
        </Col>
        <Col sm={7}>
          <Form className="mt-5" onSubmit={handleOnUpdate}>
            {/* <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label  className="fw-bold">File:</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="fw-bold">Title:</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle ? updatedTitle : ""}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="fw-bold">Description:</Form.Label>
              <Form.Control
                type="text"
                value={updatedDescription ? updatedDescription : ""}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Categories:</Form.Label>
              <Form.Control
                type="text"
                value={updatedCategories ? updatedCategories : ""}
                onChange={(e) => setUpdatedCategories(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Weight:</Form.Label>
              <Form.Control
                type="text"
                value={updatedWeight ? updatedWeight : ""}
                onChange={(e) => setUpdatedWeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="fw-bold">Price:</Form.Label>
              <Form.Control
                type="text"
                value={updatedPrice ? updatedPrice : ""}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="fw-bold">Manufacturer:</Form.Label>
              <Form.Control
                type="text"
                value={updatedManufacturer ? updatedManufacturer : ""}
                onChange={(e) => setUpdatedManufacturer(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}
