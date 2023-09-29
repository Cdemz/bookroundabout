"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import AdvancedProduct from "./components/AdvancedProduct";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main className="">
      <Slider />
      <ShopCat />
      <AdvancedProduct />
    </main>
  );
}
