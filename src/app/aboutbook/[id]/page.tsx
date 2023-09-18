"use client";
import store from "@/app/store/store";

import React from "react";
import { Provider } from "react-redux";
import About from "./about";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
    title: string;
  };
};

export default function Home({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  // Ensure that id is a string or set it to an empty string if null
  const bookId = typeof id === "string" ? id : "";

  return (
    <Provider store={store}>
      <About params={{ id: bookId }} />
    </Provider>
  );
}
