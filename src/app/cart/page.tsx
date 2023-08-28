"use client";
import React from "react";
import Cart from "./cart";
import { RecoilRoot } from "recoil";

const page = () => {
  return (
    <RecoilRoot>
      <Cart />
    </RecoilRoot>
  );
};

export default page;
