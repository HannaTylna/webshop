import express, { Router } from "express"
import {
  loadAllProducts,
  loadAProduct,
  searchProduct,
  loadProductsbyCategory
} from "../controllers/products.controller"

const productsRouter: Router = express.Router()

productsRouter.get("/", loadAllProducts)
productsRouter.get("/:id", loadAProduct)
productsRouter.get("/categories/:cat", loadProductsbyCategory)
productsRouter.get("/search/:key", searchProduct)

export default productsRouter
