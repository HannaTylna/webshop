import express, { Router } from "express"
import { adminAuth } from "../middleware/auth"
import { registeredOrders } from "../controllers/order"

const adminRouter: Router = express.Router()
adminRouter.use("/getallorders", adminAuth)
adminRouter.get("/getallorders", registeredOrders)

export default adminRouter