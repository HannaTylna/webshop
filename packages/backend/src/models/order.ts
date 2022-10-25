import { model, Schema } from "mongoose"
import { Order } from "@webshop/shared"

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [],
  shippingCost: { type: Number },
  // totalCost: { type: Number },
  deliveryAddress: { type: String },
  status: { type: String, required: true },
})

export const OrderModel = model<Order>("Order", orderSchema)

export const getAllOrders = async (): Promise<Order[]> => {
  return OrderModel.find().exec()
}

export const saveOrder = async (order: Order): Promise<Order> => {
  const newModel = new OrderModel(order)
  return await newModel.save()
}
