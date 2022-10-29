import { useContext, createContext, ReactNode, useState } from "react"
// import {OrderItem} from "@webshop/shared"
type CartContextType = {
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (id: string) => void
  decreaseCartQuantity: (id: string) => void
}
const CartContext = createContext({} as CartContextType)

export const useCart = () => {
  return useContext(CartContext)
}
