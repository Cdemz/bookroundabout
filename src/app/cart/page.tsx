"use client";
import React from "react";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../store/store";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  if (!session) {
    // User is not authenticated; display a message and a login link
    return (
      <div>
        <p>Please log in to access this page.</p>
        <Link href="/login">Login</Link>
      </div>
    );
  }
  return (
    <Provider store={store}>
      <SessionProvider>
        <Cart />
      </SessionProvider>
    </Provider>
  );
};

export default page;
