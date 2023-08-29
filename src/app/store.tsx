import { createStore, Reducer } from "redux";
import rootReducer from "./reducers"; // Make sure this import is correct

// Define the RootState type
interface RootState {
  cart: CartItem[];
  cartCount: number; // Add a cartCount property
}

// Define the CartItem type
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

// Define the AddToCartAction type
interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

// Initial state
const initialState: RootState = {
  cart: [],
  cartCount: 0, // Initialize cartCount to 0
};

const store = createStore<RootState, AddToCartAction, unknown, unknown>(
  rootReducer as Reducer<RootState, AddToCartAction>, // Cast rootReducer as Reducer
  initialState
);

// Export the RootState type
export type { RootState };

export default store;
