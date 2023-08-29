import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import Products from "./Product";

const SubProduct = () => {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

export default SubProduct;
