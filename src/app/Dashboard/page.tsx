import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Layout from "../admin/layout";
import Promo from "./Promo";
import AdAProduct from "./AdAProduct";

const Dashboard = () => {
  return (
    <Layout>
      <div className="">
        <Promo />
        <AdAProduct />
      </div>
    </Layout>
  );
};

export default Dashboard;
