import express from "express"
import usersRouter from "./users"
import productsRouter from "./products.routes"
import ordersRouter from "./order"
import adminRouter from "./admin"

const router = express.Router()

router.use("/user", usersRouter)
router.use("/products", productsRouter)
router.use("/orders", ordersRouter)
router.use("/admin", adminRouter)

export default router
