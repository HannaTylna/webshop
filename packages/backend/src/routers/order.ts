import express, { Router } from "express"
import { loadAll, submit, saveCart } from "../controllers/order"

const ordersRouter: Router = express.Router()

// Fetch all orders
ordersRouter.get("/", loadAll)

// Submit order
ordersRouter.post("/", submit)

// Save cart to orders
ordersRouter.post("/cart", saveCart)
ordersRouter.patch("/cart", saveCart)

export default ordersRouter
