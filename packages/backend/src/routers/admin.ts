import express, { Router } from "express"
import { adminAuth } from "../middleware/auth"
import {
  getOrder,
  registeredOrders,
  updateOrderStatus,
} from "../controllers/order"
import { addProduct } from "../controllers/products.controller"
import { updateProduct } from "../controllers/products.controller"
import upload from "../middleware/upload"

const adminRouter: Router = express.Router()
adminRouter.use("/", adminAuth, express.static("./uploads"))
adminRouter.get("/getallorders", registeredOrders)
adminRouter.post("/add", upload.single("images"), addProduct)
adminRouter.patch("/update/:id", updateProduct)
adminRouter.use("/update", adminAuth)
adminRouter.get("/update/:id", getOrder)
adminRouter.post("/update/:id", updateOrderStatus)

export default adminRouter
