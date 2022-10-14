import express, {Router, Response, Request} from 'express'
import {getAllProducts, getProduct} from '../models/products'

const productsController = express.Router()

productsController.get('/', async(req: Request, res: Response)=>{
    res.send(await getAllProducts())
})

productsController.get('/:id', async(req: Request, res: Response)=>{
    try {
        const productId = req.params.id
        res.send(await getProduct(productId))
    } catch (error) {
        res.send(error)
    }
})

export default productsController;