// reducers.ts
import { combineReducers } from "redux";
import cartReducer from "./CartReducer";

interface RootState {
  cart: ReturnType<typeof cartReducer>;
  cartCount: number;
  // Add other slices here if needed
}

export interface CartItem {
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
export interface ProductItem {
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

const rootReducer = combineReducers<RootState>({
  cart: cartReducer,
  cartCount: (state = 0, action) => {
    if (action.type === "ADD_TO_CART") {
      return state + 1;
    }
    return state;
  },
  // Add other reducers here if needed
});

export default rootReducer;
