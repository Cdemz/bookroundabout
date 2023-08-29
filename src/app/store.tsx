import { createStore, combineReducers } from "redux";

export type RootState = {
  cart: CartState;
};
// Define the CartState type
interface CartState {
  items: CartItem[];
  cartCount: number;
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

// Initial state
const initialState: CartState = {
  items: [],
  cartCount: 0, // Initialize cartCount to 0
};

// Define your cart reducer
const cartReducer = (state: CartState = initialState, action: any) => {
  // Your reducer logic here
  return state;
};

// Combine your reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if needed
});

// Create the Redux store
const store = createStore(rootReducer);

// Export the store
export default store;
