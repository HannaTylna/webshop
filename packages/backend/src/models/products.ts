import { model, Schema } from "mongoose"
import { Product } from "@webshop/shared"

// const srcSchema = new Schema({
//   large: {type: String},
//   small:{type: String}
// })

// const imagesSchema = new Schema({
//   alt: {type: String},
//   src: srcSchema
// })

const productSchema = new Schema({
  // images: { type: Object, required: false },
  images: { type: Object, required: false },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  categories: [{ type: String, required: true }],
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  manufacturer: { type: String, required: true },
})

export const ProductModel = model<Product>("Product", productSchema)

export const getAllProducts = async (): Promise<Product[]> => {
  return ProductModel.find().exec()
}

export const getProductsbyCategory = async (
  categories: string | string[]
): Promise<Product[] | null> => {
  return ProductModel.find({ categories }).exec()
}
export const getProduct = async (
  productId: string | string[]
): Promise<Product | null> => {
  return ProductModel.findOne({ _id: productId }).exec()
}

export const searchProductItems = async (
  searchParam: string
): Promise<Product[] | null> => {
  return ProductModel.find({ title: { $regex: searchParam } }).exec()
}

export const createItem = async(item: Product): Promise<Product> =>{
  const newItem = new ProductModel(item)
  newItem.save()
  return newItem
}

export const updateItem = async(id: string, input: Product): Promise<void> => {
  const updatedItem = await ProductModel.findOneAndUpdate(
    { _id: id },
    {
      images: input.images,
      title: input.title,
      description: input.description,
      categories: input.categories,
      weight: input.weight,
      price: input.price,
      manufacturer: input.manufacturer
    }, 
    { returnDocument: "after" }
  )
}