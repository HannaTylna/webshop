import { useContext, createContext, ReactNode, useState } from "react"
// import {OrderItem} from "@webshop/shared"
const CartContext = createContext({} as CartContextType)

export const useCart = () => {
  return useContext(CartContext)
}
