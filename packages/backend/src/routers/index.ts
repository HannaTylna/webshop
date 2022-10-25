import express from "express"
import usersRouter from "./users"
import productsRouter from "./products.routes"
import ordersRouter from "./order"

const router = express.Router()

router.use("/user", usersRouter)
router.use("/products", productsRouter)
router.use("/orders", ordersRouter)

export default router
