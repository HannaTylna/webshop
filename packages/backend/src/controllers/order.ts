import { Response, Request } from "express"
import { getAllOrders, getCart, saveOrder, OrderModel } from "../models/order"
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

export const loadCart = async (
  req: JwtRequest<string>,
  res: Response
): Promise<void> => {
  try {
    const userId: string | undefined = req.jwt?.userid
    const status: string = "cart"
    const cart = await getCart(userId, status)
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const submit = async (req: JwtRequest<string>, res: Response) => {
  const userId: string | undefined = req.jwt?.userid
  const { deliveryAddress } = req.body
  try {
    const cart = (await OrderModel.findOne({
      user: userId,
      status: "cart",
    }).exec()) as Order
    if (!cart) {
      res.status(400).json({ error: "the cart is empty" })
    } else {
      cart.status = "registered"
      cart.deliveryAddress = deliveryAddress
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

    if (cart) {
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
    }
    res.status(200).send(savedCart)
  } catch (error) {
    res.status(400).json({ message: "failed to submit order", error: error })
  }
}

export const registeredOrders = async(req: JwtRequest<string>, res: Response)=>{
  try {
    const allRegisteredOrders = await OrderModel.find({}).exec()
    res.status(200).json(allRegisteredOrders)
  } catch (error) {
    res.status(400).json(error) 
  }
}