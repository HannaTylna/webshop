import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import Cart from "../components/Cart"
import { Order } from "@webshop/shared"
import axios from "axios"

type CartProviderProps = {
  children: ReactNode
}
type CartItem = {
  id: string
  quantity: number
}

type CartContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (id: string) => void
  decreaseCartQuantity: (id: string) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const CartContext = createContext({} as CartContextType)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cart, setCart] = useState<Order[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const openCart = () => setIsOpen(true)

  const closeCart = () => setIsOpen(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const createCart = async (cartItems: CartItem[]): Promise<void> => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hdCIsInVzZXJpZCI6IjYzNTgzM2FjNjIwZTNhM2JhM2EwN2JiMyIsImlhdCI6MTY2NzIwOTAyMywiZXhwIjoxNjY3Mjk1NDIzfQ.h2Sw3CVXXEIuFNyt0JN-lDtw2tP_r11OHjv6X32fm50"

    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    }

    try {
      await axios.post("api/orders/cart", cartItems, headers)
      const response = await axios.get<Order[]>("api/orders/cart", headers)
      setCart(response.data)
    } catch (err) {
      setCart([])
      setError("Something went wrong when saving cart...")
    }
  }

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

  const decreaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id != id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  console.log("cart", cart)

  useEffect(() => {
    createCart(cartItems)
    // .then(setTodos)
    // .catch((error) => {
    //   setTodos([])
    //   setError("Something went wrong when fetching my todos...")
    // })
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
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
