import express, { Router } from "express"
import {loadAllProducts, loadAProduct} from "../controllers/products.controller"

const productsRouter: Router = express.Router()

productsRouter.get("/", loadAllProducts)
productsRouter.get("/:id", loadAProduct)

export default productsRouter