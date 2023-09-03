"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import Wishlist from "./Wishlist";

const page = () => {
  const item = {
    id: 1,
    category: "Category",
    description: "Product description",
    img: "product-image.jpg",
    isNew: true,
    oldprice: 100,
    price: 80,
    title: "Product Title",
    quantity: 1,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider>{/* <Wishlist item={item} /> */}</SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default page;
