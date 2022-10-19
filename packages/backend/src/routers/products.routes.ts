import express, { Router } from "express"
import productsController from "../controllers/products.controller"

const productsRouter: Router = express.Router()

productsRouter.get("/products", productsController)


export default productsRouter