"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import AdvancedProduct from "./components/AdvancedProduct";
import Slider from "./components/Slider";
// import { options } from "./api/auth/[...nextauth]/options";
import ClientPage from "./components/ClientPage";
import UserProfile from "./components/User";

export default function Home() {
  return (
    <main className="">
      <Slider />
      {/* <ClientPage /> */}
      {/* <Herosection /> */}
      <ShopCat />
      <UserProfile />

      <AdvancedProduct />
    </main>
  );
}
