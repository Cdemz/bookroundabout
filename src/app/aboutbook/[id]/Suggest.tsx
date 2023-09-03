"use client";
import React, { useState } from "react";
import data from "../../BooksData.json";
import Product from "../../components/Product";
import { Provider } from "react-redux";
import store from "../../store/store";

interface product {
  // Define the structure of a cart item here
  id: number;
  title: string;
  // ...other properties
}

const shuffleArray = (array: any[]) => {
  // Use the Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Suggest = () => {
  const shuffledData = shuffleArray([...data]);

  return (
    <Provider store={store}>
      <section className="container mx-auto bg-white ">
        <div className="mx-auto my-4 text-center pt-2">
          <h1 className="text-[var(--color-text)] font-bold lucky text-4xl">
            Suggested For You
          </h1>
        </div>
        <div className="mx-auto  px-2  flex gap-6 pb-4  overflow-x-auto whitespace-nowrap ">
          {shuffledData.map((product, index) => (
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
                quantity: 1, // Add the quantity property here
              }}
            />
          ))}
        </div>
      </section>
    </Provider>
  );
};

export default Suggest;
