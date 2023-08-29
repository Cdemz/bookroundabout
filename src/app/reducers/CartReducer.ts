// reducers/cartReducer.js
import { CartItem } from "../reducers"; // Import your CartItem type
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CartState {
  cart: CartItem[];
  cartCount: number;
}

interface CartItem {
  id: number; // Unique identifier for the item
  title: string; // Title or name of the item
  price: number; // Price of the item
  description: string; // Description of the item
  img: string; // URL or path to the item's image
  category?: string; // Optional category for the item
  agerange?: string; // Optional age range for the item
  code?: string; // Optional product code or identifier
  oldprice?: number; // Optional previous price (if on sale)
  quantity: number; // Quantity of this item in the cart
}

const initialState: CartState = {
  cart: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
      state.cartCount += 1;
    },
    // Define other reducers here for removing items, clearing cart, etc.
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
