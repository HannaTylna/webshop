import express from "express"
import usersRouter from "./users"
import productsRouter from "./products.routes";

const router = express.Router()

router.use("/user", usersRouter)
router.use("/products", productsRouter)

export default router


