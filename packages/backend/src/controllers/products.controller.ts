import { Product } from "@webshop/shared"
import express, { Router, Response, Request } from "express"
import { getAllProducts, getProduct, getProductsbyCategory } from "../models/products"
import { productSearch } from "../services/product.service"
import { createItem, updateItem } from "../models/products"

export const loadAllProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await getAllProducts())
  } catch (error) {
    res.status(400).json(error)
  }
}

export const loadAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    res.status(200).json(await getProduct(productId))
  } catch (error) {
    res.status(400).send(error)
  }
}

export const searchProduct = async (req: Request, res: Response<Product[]>) => {
  try {
    let result = await productSearch(req.params.key)
    res.send(result)
  } catch (err) {
    res.sendStatus(404)
  }
}

export const loadProductsbyCategory = async (req: Request, res: Response) => {
  try {
    const productCategory = req.params.cat
    res.status(200).json(await getProductsbyCategory(productCategory))
  } catch (error){
    res.status(400).send(error)
  }
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await createItem(req.body))
  } catch (error) {
    res.status(200).json(error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await updateItem(req.params.id, req.body))
  } catch (error) {
    res.status(200).json(error)
  }
}