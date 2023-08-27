// atoms/cartState.ts
import { atom } from "recoil";

// Define the type for a single cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
  // Add other properties if necessary
}

// Define the initial state for the cart
const initialCartState: CartItem[] = [];

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: initialCartState,
});
