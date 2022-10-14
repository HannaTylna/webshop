import { model, Schema } from "mongoose"
import { Product } from "@webshop/shared"

const productSchema = new Schema({
  images: Array,
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  // kategory: String,
  kategory: Array,
  weight: Number,
  price: {type: Number, required: true},
  manufacturer: String,
})

const ProductModel = model<Product>("Product", productSchema)

export const getAllProducts = async (): Promise<Product[]> => {
  return ProductModel.find().exec()
}

export const getProductItem = async (productID: string): Promise<Product | null> => {
  return ProductModel.findOne({id: productID}).exec()
}