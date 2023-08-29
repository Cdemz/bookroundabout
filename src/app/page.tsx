"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import BestSeller from "./components/BestSeller";
import Product from "./components/Product";
import data from "./BooksData.json";
// import { Menu, Transition } from "@headlessui/react";
import { FaFilter } from "react-icons/fa";
// import MenuItem from "./components/MenuItem";
import { Fragment } from "react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import AdvancedProduct from "./components/AdvancedProduct";
import SubProduct from "./components/SubProduct";

export default function Home() {
  // const fictionLinks = [
  //   "Ficition",
  //   "Children Books",
  //   "Non-Ficition",
  //   "Classics",
  //   "Romance",
  //   "Crime & Thriller",
  //   "Fantasy & Horror",
  //   "Poetry & Drama",
  // ].map((linkText) => {
  //   return <MenuItem linkText={linkText} />;
  // });
  return (
    <main>
      <Herosection />
      <ShopCat />
      <AdvancedProduct />
    </main>
  );
}
