"use client";
import Data from "../BooksData.json";

import ProductCard from "../components/ProductCard";

function Store() {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <h1 className="text-3xl text-center font-semibold mb-8 text-black">
        Welcome to the store!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Data.map((product, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
