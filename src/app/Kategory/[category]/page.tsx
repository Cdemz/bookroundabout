"use client";
import store from "@/app/store/store";
import React from "react";
import { Provider } from "react-redux";
import Category from "./Category";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    category: string;
    title: string;
  };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const { category } = params;

  // Ensure that category is a string
  const categoryString = typeof category === "string" ? category : "";

  return (
    <Provider store={store}>
      {/* Pass the categoryString as a prop */}
      <Category params={{ category: categoryString }} />
    </Provider>
  );
}
