import { Response, Request } from "express"
import { getAllOrders, saveOrder, OrderModel } from "../models/order"
import { Order, OrderItem } from "@webshop/shared"

export const loadAll = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders()
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const submit = async (req: Request, res: Response) => {
  const { orderId } = req.body
  try {
    const order = (await OrderModel.findOne({ _id: orderId }).exec()) as Order
    if (!order) {
      res.status(400).json({ error: "the cart is empty" })
    } else {
      order.status = "registered"
      await saveOrder(order)
      res.sendStatus(200)
    }
  } catch (error) {
    res.status(400).send({ message: "failed to submit order", error: error })
  }
}
