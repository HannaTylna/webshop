import { model, Schema } from "mongoose"
import { Product } from "@webshop/shared"

const productSchema = new Schema({
  images: {type: Object, required: true},
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  categories: [{type: String, required: true}],
  weight: {type: Number, required: true},
  price: {type: Number, required: true},
  manufacturer: {type: String, required: true},
})

const ProductModel = model<Product>("Product", productSchema)

export const getAllProducts = async (): Promise<Product[]> => {
  return ProductModel.find().exec()
}

export const getProduct = async (productId: string| string[]): Promise<Product | null> => {
  return ProductModel.findOne({_id: productId}).exec()
}