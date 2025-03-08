
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/utils/mockData";
import { toast } from "sonner";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" };

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);
};

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      
      let newItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item to cart
        newItems = [...state.items, { product, quantity }];
      }
      
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }
    
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }
    
    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      
      // Don't allow quantities less than 1
      if (quantity < 1) return state;
      
      const newItems = state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: quantity }
          : item
      );
      
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }
    
    case "CLEAR_CART":
      return {
        items: [],
        subtotal: 0,
        totalItems: 0,
      };
      
    default:
      return state;
  }
};

// Initial cart state
const initialCartState: CartState = {
  items: [],
  subtotal: 0,
  totalItems: 0,
};

// Get initial state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window === "undefined") return initialCartState;
  
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : initialCartState;
};

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getInitialState());
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
    toast.success(`${product.name} added to cart`);
  };
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
    toast.info("Item removed from cart");
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.info("Cart cleared");
  };
  
  const isInCart = (productId: string) => {
    return cart.items.some((item) => item.product.id === productId);
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
