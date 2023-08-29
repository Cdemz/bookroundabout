import { CartItem } from "../reducers"; // Adjust the import path as needed
import { ADD_TO_CART } from "./action"; // Import the action type constant

interface CartItm {
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
  type: typeof ADD_TO_CART; // Use the action type constant
  payload: CartItem;
}

const initialState = {
  cart: [], // An array to hold the items in the shopping cart
  user: null, // If you have user authentication, you can store user information here
  // Other application-level state properties can go here
};

const rootReducer = (state = initialState, action: AddToCartAction) => {
  // ...
};

export const addToCart = (product: CartItem): AddToCartAction => {
  return {
    type: ADD_TO_CART, // Use the action type constant
    payload: product,
  };
};
