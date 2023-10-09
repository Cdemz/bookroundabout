"use client";
import React, { useEffect, useState } from "react";
// import data from "../BooksData.json";
import { Menu, Transition } from "@headlessui/react";
import { FaFilter } from "react-icons/fa";
import MenuItem from "../components/MenuItem";
import { Fragment } from "react";
import Product from "./AProduct";
import { Provider } from "react-redux";
import store from "../store/store";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { API_BASE_URL } from "../utils/api";
import axios from "axios";

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

  // ...other properties
}

const AdAProduct = () => {
  const [activeCategory, setActiveCategory] = useState(" ");
  const [activeGenre, setActiveGenre] = useState(" ");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/book?page&limit`)
      .then((response) => {
        // Assuming the API response contains an array of book data
        setFilteredData(response.data);
        setData(response.data);

        // Initialize currentDate with the current date and time
        const currentDate = new Date();

        // Update the "isNew" property in the product data
        const updatedData = response.data.map((product: Product) => {
          // Calculate the difference between the createdAt date and the current date in milliseconds
          const timeDifferenceInMilliseconds: number =
            currentDate.getTime() - new Date(product.createdAt).getTime();

          // Calculate the number of days as a number
          const daysDifference: number = Math.ceil(
            timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
          );

          // Check if the book is "isNew" (less than 7 days old)
          const isNew: boolean = daysDifference < 7;

          // Return the updated product data with the "isNew" property
          return {
            ...product,
            isNew,
          };
        });

        // Set the updated product data with "isNew" property
        setFilteredData(updatedData);

        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

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
        <div className="mt-4">
          {" "}
          <SearchBar />
        </div>

        <div className=" flex justify-between items-center mt-4 px-4 pt-4 overflow-hidden">
          <h1 className="font-bold text-2xl  text-black lucky ">
            Best Sellers
          </h1>

          <hr className="w-[60%]e text-black " />
          {/* start */}

          {/* <Menu as="div" className="relative inline-block text-left  ">
            <div>
              <Menu.Button className="bg-[var(--color-primary)] text-white py-2   px-8 rounded-full flex items-center gap-2">
                <FaFilter />
                Fiter
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none absolute px-4 md:right-8 right-6 lato font-bold text-lg whitespace-nowrap">
                <div className="py-1">{fictionLinks}</div>
              </Menu.Items>
            </Transition>
          </Menu> */}

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
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-4 pt-2 overflow-hidden">
          {filteredData.map((product, index) => (
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdAProduct;
