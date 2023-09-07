"use client";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store from "../store/store";

const AdvancedNav = () => {
  return (
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
};

export default AdvancedNav;
