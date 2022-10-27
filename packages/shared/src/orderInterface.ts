export default interface Order {
  _id?: string
  user: string
  products: Array<OrderItem>
  shippingCost?: number
  totalCost?: number
  deliveryAddress?: string
  status: string
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}
