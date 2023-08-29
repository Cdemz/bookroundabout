// reducers/cartReducer.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CartState {
  cart: CartItem[];
  cartCount: number;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
  category?: string;
  agerange?: string;
  code?: string;
  oldprice?: number;
  quantity: number;
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
