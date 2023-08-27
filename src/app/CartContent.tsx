import { createContext, useState, ReactNode } from "react";
import { productsArray, getProductData, Product } from "./productStore";

interface CartContextType {
  items: Product[];
  getProductQuantity: (id: number) => number;
  addOneToCart: (id: number) => void;
  removeOneFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  getTotalCost: () => number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  getProductQuantity: (id: number) => 0,
  addOneToCart: (id: number) => {},
  removeOneFromCart: (id: number) => {},
  deleteFromCart: (id: number) => {},
  getTotalCost: () => 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  function getProductQuantity(id: number) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  // Rest of your code...
  const contextValue: CartContextType = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart: (id: number) => {
      // Implement addOneToCart logic here.
    },
    removeOneFromCart: (id: number) => {
      // Implement removeOneFromCart logic here.
    },
    deleteFromCart: (id: number) => {
      // Implement deleteFromCart logic here.
    },
    getTotalCost: () => {
      // Implement getTotalCost logic here.
      return 0;
    },
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
