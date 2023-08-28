"use client";
import React from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import CartList from "../components/CartList";

const Cart = () => {
  const [cartItem, setCartItem] = useRecoilState(cartState);

  const totalPrice = () => {
    let total = 0;
    cartItem.forEach((item) => {
      if (item.price && item.quantity) {
        total += item.price * item.quantity;
      } else {
        console.error("Invalid item:", item);
      }
    });
    return total;
  };

  const createCheckoutSession = async () => {
    try {
      const response = await axios.post("api/checkout_sessions", { cartItem });
      console.log("Response:", response);

      if (response.data && response.data.sessionURL) {
        window.location.href = response.data.sessionURL;
      } else {
        console.error("Invalid response data:", response);
        // Display an error message to the user
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle the error and display an error message to the user
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        {cartItem.length <= 0 ? (
          <h1 className="text-center text-4xl mt-32">Your Cart Is Empty</h1>
        ) : (
          cartItem.map((item) => <CartList key={item.id} data={item} />)
        )}

        {cartItem.length > 0 && (
          <div className="max-w-[800px] mx-auto mt-4 text-black">
            <h2 className="text-right text-3xl font-bold">
              Total: ${totalPrice()}
            </h2>
            <button
              className="text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800"
              onClick={createCheckoutSession}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
