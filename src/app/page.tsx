import Image from "next/image";
import Link from "next/link";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import BestSeller from "./components/BestSeller";

export default function Home() {
  return (
    <main>
      <Herosection />
      <ShopCat />
      <BestSeller />
    </main>
  );
}
