import { CartItem } from "../reducers"; // Adjust the import path as needed
import { ActionTypes } from "../actions/action";

interface CartItem {
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
  payload: CartItem; // Use the CartItem type for the payload
}

export const ADD_TO_CART = "ADD_TO_CART";

const initialState = {
  cart: [], // An array to hold the items in the shopping cart
  user: null, // If you have user authentication, you can store user information here
  // Other application-level state properties can go here
};

const rootReducer = (state = initialState, action: typeof ActionTypes) => {
  // ...
};

export const addToCart = (product: CartItem): AddToCartAction => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
