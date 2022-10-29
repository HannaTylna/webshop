import { useContext, createContext, ReactNode, useState } from "react"
// import {OrderItem} from "@webshop/shared"

type CartProviderProps = {
  children: ReactNode
}
type CartItem = {
  id: string
  quantity: number
}

type CartContextType = {
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (id: string) => void
  decreaseCartQuantity: (id: string) => void
}

const CartContext = createContext({} as CartContextType)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  return (
    <CartContext.Provider
    >
      {children}
    </CartContext.Provider>
  )
}
