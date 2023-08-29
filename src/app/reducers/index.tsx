// reducers.ts
import { ActionTypes } from "../actions/action";
import { ADD_TO_CART } from "../actions/actionTypes";
import { combineReducers } from "redux";

export interface CartItem {
  // Define the structure of a cart item here
  id: number;
  title: string;
  // ...other properties
}

export interface ProductItem {
  // Define the structure of a cart item here
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

interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: ProductItem; // Use the CartItem type for the payload
}

const initialState = {
  cart: [],
};

// Cart reducer
const cartReducer = (
  state: ProductItem[] = initialState.cart,
  action: AddToCartAction
) => {
  if (action.type === ADD_TO_CART) {
    // Add your logic to update the cart state here
    return [...state, action.payload];
  }
  // Handle other actions if needed
  return state;
};

// Root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  cartCount: (state = 0, action) => {
    // You can initialize cartCount here if needed
    return state;
  },
  // Add other reducers here if needed
});

export default rootReducer;
