import { PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../reducers"; // Adjust the import path as needed

// Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

// Define action interfaces
export interface AddToCartAction extends PayloadAction<ProductItem> {
  type: typeof ADD_TO_CART;
}

export interface RemoveFromCartAction extends PayloadAction<number> {
  type: typeof REMOVE_FROM_CART;
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

// Define ActionTypes type
export type ActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | ClearCartAction;

// Action Creators
export const addToCart = (product: ProductItem): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId: number): RemoveFromCartAction => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const clearCart = (): ClearCartAction => {
  return {
    type: CLEAR_CART,
  };
};
