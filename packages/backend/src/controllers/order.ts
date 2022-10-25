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
