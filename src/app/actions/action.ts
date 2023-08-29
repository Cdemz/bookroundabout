// actions.ts
import { CartItem } from "../reducers"; // Adjust the import path as needed

interface ProductItem {
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
  payload: ProductItem; // Use the ProductItem type for the payload
}

export const ADD_TO_CART = "ADD_TO_CART";

export const ActionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  // Other action types
};

export const addToCart = (product: ProductItem): AddToCartAction => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
