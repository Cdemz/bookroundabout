"use client";
import React from "react";
import Cart from "./cart";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
const page = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider>
          <Cart />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default page;
