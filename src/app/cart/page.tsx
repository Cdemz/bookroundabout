"use client";
import React from "react";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../store/store";

import Link from "next/link";

const page = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

export default page;
