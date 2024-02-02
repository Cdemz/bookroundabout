import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Promo from "./Promo";
import AdAProduct from "./AdAProduct";
import TopText from "./TopText";
import PurchaseAva from "../components/PurchaseAva";

const Dashboard = () => {
  return (
    <div className="">
      <Promo />
      <AdAProduct />
      <TopText />
      <PurchaseAva />
    </div>
  );
};

export default Dashboard;
