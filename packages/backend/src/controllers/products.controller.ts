import express, {Router, Response, Request} from 'express'
import {getAllProducts, getProductItem} from '../models/products'

const productsController = express.Router()

productsController.get('/', async(req: Request, res: Response)=>{
    res.send(await getAllProducts())
})

productsController.get('/:productID', async(req: Request, res: Response)=>{
    const product = req.params.productID
    res.send(await getProductItem(product))
})

export default productsController;