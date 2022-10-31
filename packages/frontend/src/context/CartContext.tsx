import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import Cart from "../components/Cart"
import { Order, OrderItem } from "@webshop/shared"
import axios from "axios"

type CartProviderProps = {
  children: ReactNode
}

type CartContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (id: string, price: number) => void
  decreaseCartQuantity: (id: string) => void
  cartQuantity: number
  cartItems: OrderItem[]
  cart: Order[]
}

const CartContext = createContext({} as CartContextType)

export const useCart = () => {
  return useContext(CartContext)
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hdCIsInVzZXJpZCI6IjYzNTgzM2FjNjIwZTNhM2JhM2EwN2JiMyIsImlhdCI6MTY2NzIwOTAyMywiZXhwIjoxNjY3Mjk1NDIzfQ.h2Sw3CVXXEIuFNyt0JN-lDtw2tP_r11OHjv6X32fm50"

export const headers = {
  headers: { Authorization: `Bearer ${token}` },
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Order[]>([])
  const [cartItems, setCartItems] = useState<OrderItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const openCart = () => setIsOpen(true)

  const closeCart = () => setIsOpen(false)

  const cartQuantity = cartItems?.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const fetchCart = async (): Promise<void> => {
    try {
      const response = await axios.get<Order[]>("api/orders/cart", headers)
      const cart = response.data
      setCart(cart)
      setCartItems(cart[0]?.products || [])
    } catch (err) {
      setCart([])
      setError("Something went wrong when saving cart...")
    }
  }

  const saveCart = async (cartItems: OrderItem[]): Promise<void> => {
    try {
      await axios.post("api/orders/cart", cartItems, headers)
      const response = await axios.get<Order[]>("api/orders/cart", headers)
      setCart(response.data)
    } catch (err) {
      // setCart([])
      // setError("Something went wrong when saving cart...")
      console.log(err)
    }
  }

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item.productId === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: string, price: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.productId === id) == null) {
        return [...currItems, { productId: id, quantity: 1, price: price }]
      } else {
        return currItems.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.productId === id)?.quantity == 1) {
        return currItems.filter((item) => item.productId != id)
      } else {
        return currItems.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    cartItems.length > 0 && saveCart(cartItems)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        cart,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
