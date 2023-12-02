import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Promo from "./Promo";
import AdAProduct from "./AdAProduct";
import TopText from "./TopText";

const Dashboard = () => {
  return (
    <div className="">
      <Promo />
      <AdAProduct />
      <TopText />
    </div>
  );
};

export default Dashboard;
