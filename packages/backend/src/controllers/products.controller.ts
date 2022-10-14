import express, {Router, Response, Request} from 'express'
import {getAllProducts} from '../models/products'

const productsController = express.Router()

productsController.get('/', async(req: Request, res: Response)=>{
    res.send(await getAllProducts())
})

export default productsController;