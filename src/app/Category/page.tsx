"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import Dategory from "./Dategory";
import { useRouter } from "@/lib/useRouter";
import useQueryParams from "./useRoute";

const Page = () => {
  const queryParams = useQueryParams();
  const { category } = queryParams; // Accessing the category from the query string

  // Ensure that category is a string
  const categoryString = typeof category === "string" ? category : "";

  // Client-side data fetching can be implemented here if necessary
  // For example, fetching category-specific data from an API
  // ...

  return (
    <Provider store={store}>
      {/* Pass the categoryString as a prop */}
      <Dategory category={categoryString} />
    </Provider>
  );
};

export default Page;
