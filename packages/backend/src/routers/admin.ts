import express, { Router } from "express"
import { adminAuth } from "../middleware/auth"
import { registeredOrders, updateOrderStatus } from "../controllers/order"

const adminRouter: Router = express.Router()
adminRouter.use("/getallorders", adminAuth)
adminRouter.get("/getallorders", registeredOrders)
adminRouter.use("/update", adminAuth)
adminRouter.patch("/update/:id", updateOrderStatus)

export default adminRouter
