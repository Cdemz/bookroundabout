"use client";
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import MenuItem from "../components/MenuItem";
import { Fragment } from "react";
import Product from "./Product";
import Filter from "./Filter";
import axios from "axios"; // Import Axios
import { API_BASE_URL } from "../utils/api";
import SearchBar from "./SearchBar";
import "../cssstyles/searching.css";
import Image from "next/image";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface Product {
  // Define the structure of a cart item here
  id: number;
  title: string;
  imageUrl: string;
  code: string;
  description: string;
  agerange: string;
  price: number;
  category: string;
  discountPrice: number;
  createdAt: string;
  amountInStock: string;
  cover: string;
  isDisabled: boolean;
  discount: string;
  isNew: boolean;
  genre: string[];
  // ...other properties
}

[
  {
    id: 1,
    title: "The fuckery of death",
    code: "whl57",
    description: null,
    cover: null,
    amountInStock: "2",
    discountPrice: null,
    price: "8000.00",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664280284718-56e4309bf83f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    createdAt: "2023-09-24T21:19:01.694Z",
    category: "fiction",
    ageRange: "0-5",
    genres: ["thriller", "action", "crime"],
    discount: null,
    updatedAt: "2023-09-24T21:19:01.694Z",
  },
];

const AdvancedProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = `${API_BASE_URL}/book`;
        let params = [];
        if (selectedCategory) params.push(`category=${selectedCategory}`);
        if (selectedGenre) params.push(`genre=${selectedGenre}`);
        if (params.length) endpoint += `?${params.join("&")}`;

        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedGenre]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" overflow-hidden ">
      <main className="container mx-auto bg-white ">
        <div className="mt-4 pt-4">
          {" "}
          <SearchBar />
        </div>
        <div className=" md:flex justify-between items-center mt-4 px-4 pt-4 overflow-hidden text-center">
          <h1 className="font-bold text-2xl  text-black lucky mb-2 ">
            Best Sellers
          </h1>

          <hr className="w-[60%]e text-black " />
          {/* start */}
          <div className="flex gap-2">
            <select
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="text-black "
            >
              <option value="">Select Category</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="education">Education</option>
            </select>

            <select
              onChange={handleGenreChange}
              value={selectedGenre}
              className="text-black"
            >
              <option value="">Select Genre</option>
              <option value="drama">Drama</option>
              <option value="comedy">Comedy</option>
              <option value="romance">Romance</option>
            </select>
          </div>
          {/* end */}
        </div>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2 overflow-hidden">
          {loading ? (
            <div className="loading-animation px-10 py-[15rem] flex flex-col items-center justify-center h-[10rem]">
              <div id="wifi-loader">
                <svg className="circle-outer" viewBox="0 0 86 86">
                  <circle className="back" cx="43" cy="43" r="40"></circle>
                  <circle className="front" cx="43" cy="43" r="40"></circle>
                  <circle className="new" cx="43" cy="43" r="40"></circle>
                </svg>
                <svg className="circle-middle" viewBox="0 0 60 60">
                  <circle className="back" cx="30" cy="30" r="27"></circle>
                  <circle className="front" cx="30" cy="30" r="27"></circle>
                </svg>
                <svg className="circle-inner" viewBox="0 0 34 34">
                  <circle className="back" cx="17" cy="17" r="14"></circle>
                  <circle className="front" cx="17" cy="17" r="14"></circle>
                </svg>
                <div className="text font-bold" data-text="Filtering"></div>
              </div>
            </div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <Product
                key={index}
                product={{
                  id: product.id,
                  img: product.imageUrl,
                  title: product.title,
                  category: product.category,
                  code: product.code,
                  price: product.price,
                  oldprice: product.discountPrice,
                  description: product.description,
                  agerange: product.agerange,
                  stag: "In Stock",
                  isNew: product.isNew,
                  // sales: product.sales,
                  quantity: 1, // Add the quantity property here
                }}
              />
            ))
          ) : (
            <div className=" w-full ml-[2rem] md:ml-[10rem] flex flex-col gap-4 items-center justify-center mx-auto">
              <p className="text-black lato font-bold">
                No books found in this category or genre
              </p>
              <Image
                priority
                src="/nothing.png"
                alt="sliderImg"
                width={300}
                height={300}
                className="object-cover h-[40%] w-[40%] my-6"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdvancedProduct;
