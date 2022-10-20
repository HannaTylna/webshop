import express, {Router, Response, Request} from 'express'
import {getAllProducts, getProduct} from '../models/products'

export const loadAllProducts = async(req: Request, res: Response)=>{
    try {
        res.status(200).json(await getAllProducts())
    } catch (error) {
        res.status(400).json(error)
    }
}

export const loadAProduct = async(req: Request, res: Response)=>{
    try {
        const productId = req.params.id
        res.status(200).json(await getProduct(productId))
    } catch (error) {
        res.status(400).send(error)
    }
}