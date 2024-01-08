"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
// import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import "../cssstyles/searching.css";
import { API_BASE_URL } from "../utils/api";
import { addToCart } from "../store/nextSlice";
import { BookData } from "../Kategory/[category]/Category";
import useQueryParams from "./useRoute";
// import { useRouter } from "@/lib/useRouter";

interface DategoryProps {
  category: string;
}

const Dategory: React.FC<DategoryProps> = ({ category }) => {
  const queryParams = useQueryParams();
  const { name } = queryParams; // Using query parameter 'name' for category
  const [books, setBooks] = useState<BookData[]>([]);
  const [sortByPrice, setSortByPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const categoryName = Array.isArray(name) ? name[0] : name;
    const fetchBooksByCategory = async () => {
      if (!categoryName) return; // Ensure categoryName is available and not undefined
      setIsLoading(true);
      try {
        let endpoint = `${API_BASE_URL}/book?category=${encodeURIComponent(
          categoryName
        )}`;
        if (sortByPrice) {
          endpoint += `&sortByPrice=${sortByPrice}`;
        }
        const response = await axios.get(endpoint);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [name, sortByPrice]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByPrice(e.target.value);
  };

  const addItemsToCart = (product: BookData) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast(`${product.title} added to cart`);
  };

  if (isLoading) {
    return (
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
          <div className="text font-bold" data-text="Searching"></div>
        </div>
      </div>
    ); // Replace with your loading animation
  }

  return (
    <main>
      <div className="">
        <div className=" text-[var(--color-text)] font-bold lato flex gap-2 items-center bg-white border-[var( --color-primary-b)] border-t h-12 px-4 ">
          <Link href="/">Home</Link>
          <p className="text-xl">/{name}</p>
        </div>
      </div>
      {/* best selling */}

      <section className="container mx-auto bg-white ">
        <div className="mx-auto my-4 text-center py-2 ">
          <h1 className="text-[var(--color-text)] font-bold lucky text-xl">
            Our Best Selling {name} Books
          </h1>

          <div className="text-[var(--color-text)]   lucky my-2">
            <label htmlFor="sortPrice" className="mr-3">
              Sort by Price:
            </label>
            <select id="sortPrice" onChange={handleSortChange}>
              <option value="">Select</option>
              <option value="ascending">Low to High</option>
              <option value="descending">High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* ending */}
      <div className="text-black">
        {books.length > 0 ? (
          <>
            <section>
              <div className="mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
                {books.map((item) => (
                  <div key={item.imageUrl} className=" ">
                    <div className="flex flex-col gap-4 h-[100%]  ">
                      <Link href={`/aboutbook/${item.id}`}>
                        <img
                          className="w-[150px] h-[170px] object-cover "
                          src={item.imageUrl}
                          alt=""
                        />
                      </Link>
                      <div className="text-black w-[140px] overflow-hidden p-2 flex flex-col justify-between flex-1">
                        <p className="text-gray-400">{item.category}</p>

                        <p>{item.agerange}</p>
                        <h1 className="font-extrabold break-words text-[var(--color-primary-v)]">
                          {item.title}
                        </h1>
                        <p>{item.code}</p>
                        {/* <p>Amount in stock:{item.amountInStock}</p> */}

                        <p className="lato">
                          <span className="line-through italic">
                            {item.oldprice}
                          </span>{" "}
                          <span className="text-black font-extrabold whitespace-nowrap">
                            ₦
                            {item.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </p>

                        <button
                          className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm"
                          onClick={() => addItemsToCart(item)}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className=" flex flex-col gap-4 items-center justify-center">
            <p className="text-black lato font-bold">
              No books found in this category
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
  );
};

export default Dategory;
