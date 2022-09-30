import { model, Schema } from "mongoose"
import { Product } from "@webshop/shared"

const productSchema = new Schema({
  images: Array,
  title: String,
  description: String,
  kategory: String,
  weight: Number,
  price: Number,
  manufacturer: String,
})

const ProductModel = model<Product>("Product", productSchema)

export const getAllProducts = async (): Promise<Product[]> => {
  return ProductModel.find().exec()
}
