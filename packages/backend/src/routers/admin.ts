import express, { Router } from "express"
import { adminAuth } from "../middleware/auth"
import { registeredOrders } from "../controllers/order"
import { addProduct } from "../controllers/products.controller"

const adminRouter: Router = express.Router()
adminRouter.use("/", adminAuth)
adminRouter.get("/getallorders", registeredOrders)
adminRouter.post("/add", addProduct)

export default adminRouter