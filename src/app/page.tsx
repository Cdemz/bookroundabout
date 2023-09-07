"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import AdvancedProduct from "./components/AdvancedProduct";
import Slider from "./components/Slider";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default function Home() {
  return (
    <main className="">
      <Slider />

      {/* <Herosection /> */}
      <ShopCat />

      <AdvancedProduct />
    </main>
  );
}
