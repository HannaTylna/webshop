import { Response, Request } from "express"
import { getAllOrders, saveOrder, OrderModel } from "../models/order"
import { Order, OrderItem } from "@webshop/shared"
import { JwtRequest } from "../middleware/auth"

export const loadAll = async (
  req: JwtRequest<string>,
  res: Response
): Promise<void> => {
  try {
    const userId: string | undefined = req.jwt?.userid
    const orders = await getAllOrders(userId)
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const submit = async (req: JwtRequest<string>, res: Response) => {
  const userId: string | undefined = req.jwt?.userid
  try {
    const cart = (await OrderModel.findOne({
      user: userId,
      status: "cart",
    }).exec()) as Order
    if (!cart) {
      res.status(400).json({ error: "the cart is empty" })
    } else {
      cart.status = "registered"
      await saveOrder(cart)
      res.sendStatus(200)
    }
  } catch (error) {
    res.status(400).send({ message: "failed to submit order", error: error })
  }
}

export const saveCart = async (req: JwtRequest<string>, res: Response) => {
  const items: Array<OrderItem> = req.body
  const userId = req.jwt?.userid || ""
  try {
    let savedCart: Order | null
    const cart = (await OrderModel.findOne({
      user: userId,
      status: "cart",
    }).exec()) as Order

    console.info(`order: ${cart}`)

    if (cart) {
      // console.log(cart)
      //if _id is populated
      cart.products = items
      savedCart = await OrderModel.findOneAndUpdate({ _id: cart._id }, cart, {
        new: true,
      })
    } else {
      const newCart: Order = {
        user: userId,
        products: items,
        totalCost: items.reduce(
          (sum, current) => sum + current.quantity * current.price,
          0
        ),
        status: "cart",
      }
      savedCart = await saveOrder(newCart)
      console.info(`savedCart1: ${savedCart}`)
    }
    console.info(`savedCart2: ${savedCart}`)
    res.status(200).send(savedCart)
  } catch (error) {
    console.log(`error: ${error}`)

    res.status(400).json({ message: "failed to submit order", error: error })
  }
}
