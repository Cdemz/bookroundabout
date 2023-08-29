"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import AdvancedProduct from "./components/AdvancedProduct";

export default function Home() {
  return (
    <main>
      <Herosection />
      <ShopCat />
      <AdvancedProduct />
    </main>
  );
}
