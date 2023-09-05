"use client";
import React from "react";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../store/store";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Cart />
      </SessionProvider>
    </Provider>
  );
};

export default page;
