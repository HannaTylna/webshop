import express, { Router } from "express"
import { loadAll, loadCart, submit, saveCart } from "../controllers/order"
import { authenticateJwtTokenMiddleware } from "../middleware/auth"

const ordersRouter: Router = express.Router()

// Fetch all orders
ordersRouter.use("/", authenticateJwtTokenMiddleware)
ordersRouter.get("/", loadAll)

// Submit order
ordersRouter.post("/", submit)

// Save cart to orders
ordersRouter.use("/cart", authenticateJwtTokenMiddleware)
ordersRouter.get("/cart", loadCart)
ordersRouter.post("/cart", saveCart)
ordersRouter.patch("/cart", saveCart)

export default ordersRouter
