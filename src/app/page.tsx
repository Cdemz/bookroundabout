"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import AdvancedProduct from "./components/AdvancedProduct";
import Slider from "./components/Slider";
import User from "./components/User";

export default function Home() {
  return (
    <main className="">
      <Slider />
      <h1 className="text[var(--color-text)]">Client Side Rendered</h1>
      <User />
      {/* <Herosection /> */}
      <ShopCat />

      <AdvancedProduct />
    </main>
  );
}
