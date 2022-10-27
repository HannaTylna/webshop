import { Product } from "@webshop/shared"
import { searchProductItems } from "../models/products"

export const productSearch = async (
  searchParam: string
): Promise<Product[]> => {
  const products = await searchProductItems(searchParam)
  if (!products) {
    throw new Error(`products not found with ${searchParam}`)
  }
  return products
}
