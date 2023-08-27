"use client";
import Herosection from "./components/Herosection";
import ShopCat from "./components/ShopCat";
import BestSeller from "./components/BestSeller";
import Product from "./components/Product";
import data from "./BooksData.json";

export default function Home() {
  return (
    <main>
      <Herosection />
      <ShopCat />
      <section className="container mx-auto">
        <h1 className="text-4xl mt-4 text-center">Our Products</h1>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
          {data.map((product) => (
            <Product product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
