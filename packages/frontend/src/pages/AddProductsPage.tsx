import { useState } from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import axios from "axios"
export default function AddProductsPage() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [categories, setCategories] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [manufacturer, setManufacturer] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: any) => {
    setFile(e.target.files[0])
  }
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await axios.post("/api/admin/add", {
      title: title,
      description: description,
      categories: categories,
      weight: weight,
      price: price,
      manufacturer: manufacturer,
      images: file,
    },
	{
		headers: { "Content-Type": "multipart/form-data" },
	}
	)
    console.log(response.data)
  }
console.log(file);

  return (
    <>
      <h1 className="text-center">Create a new item</h1>
      <Row>
        <Col sm={5} className="text-center"></Col>
        <Col sm={7}>
          <Form className="mt-5" onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>File:</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categories:</Form.Label>
              <Form.Control
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Manufacturer:</Form.Label>
              <Form.Control
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
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
