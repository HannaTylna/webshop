import { useParams } from "react-router-dom"
import ProductUpdateComponent from "../components/ProductUpdateComponent"

export default function ProductUpdatePage() {
  const params = useParams()
  return <ProductUpdateComponent id={params.id} />
}
