"use client";
import React, { useState } from "react";
import data from "../BooksData.json";
import { Menu, Transition } from "@headlessui/react";
import { FaFilter } from "react-icons/fa";
import MenuItem from "../components/MenuItem";
import { Fragment } from "react";
import Product from "./Product";
import { Provider } from "react-redux";
import store from "../store/store";
import Filter from "./Filter";

interface product {
  // Define the structure of a cart item here
  id: number;
  title: string;
  // ...other properties
}

const AdvancedProduct = () => {
  const [activeCategory, setActiveCategory] = useState(" ");
  const [activeGenre, setActiveGenre] = useState(" ");
  const [filteredData, setFilteredData] = useState(data);

  const fictionLinks = [
    "Ficition",
    "Children Books",
    "Non-Ficition",
    "Classics",
    "Romance",
    "Crime & Thriller",
    "Fantasy & Horror",
    "Poetry & Drama",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });
  return (
    <div className=" overflow-hidden ">
      <main className="container mx-auto bg-white ">
        <div className="flex justify-between items-center mt-4 px-4 pt-4 overflow-hidden">
          <h1 className="font-bold text-2xl  text-black lucky ">
            Best Sellers
          </h1>

          <hr className="w-[60%]e text-black " />
          {/* start */}

          <Filter
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            setActiveGenre={setActiveGenre}
            activeGenre={activeGenre}
            setFiltered={setFilteredData}
            data={data}
          />

          {/* end */}
        </div>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2 overflow-hidden">
          {filteredData.map((product, index) => (
            <Product
              key={index}
              product={{
                id: product.id,
                img: product.img,
                title: product.title,
                category: product.category,
                code: product.code,
                price: product.price,
                oldprice: product.oldprice,
                description: product.description,
                agerange: product.agerange,
                stag: "In Stock",
                isNew: product.isNew,
                sales: product.sales,
                quantity: 1, // Add the quantity property here
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdvancedProduct;
