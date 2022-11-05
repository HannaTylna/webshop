export default interface Product {
  _id?: string
  images: object
  title: string
  description: string
  // kategory: string
  categories: Array<string>
  weight: number
  price: number
  manufacturer: string
}
