"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";

const AdvancedNav = () => {
  return (
    <RecoilRoot>
      <Toaster position="bottom-center" />
      <NavBar />
    </RecoilRoot>
  );
};

export default AdvancedNav;
