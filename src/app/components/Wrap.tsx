"use client";
import React from "react";
import { RecoilRoot } from "recoil";

import AdvancedProduct from "./AdvancedProduct";

const wrap = () => {
  return (
    <RecoilRoot>
      <AdvancedProduct />
    </RecoilRoot>
  );
};

export default wrap;
