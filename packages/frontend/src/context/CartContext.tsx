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

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  return (
    <CartContext.Provider
    >
      {children}
    </CartContext.Provider>
  )
}
