"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Data from "../BooksData.json";
import SearchBar from "./SearchBar";
import { BsArrowDownRightCircle, BsStarFill, BsStarHalf } from "react-icons/bs";
import { starRatings } from "../functions/RatingConverter";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import MenuItem from "./MenuItem";

export interface BookData {
  img: string;
  title: string;
  category: string;
  rating?: number | string[];
  code: string;
  agerange?: string;
  price: number;
  oldprice?: number;
  id?: number;
  tag?: string[];
}

function shuffleArray(array: BookData[]) {
  // Fisher-Yates shuffle algorithm
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const BestSeller = () => {
  const fictionLinks = [
    "Ficition",
    "Children Books",
    "Non-Ficition",
    "Classics",
    "Romance",
    "Crime & Thriller",
    "Fantasy & Horror",
    "Poetry & Drama",
  ].map((linkText) => {
    return <MenuItem linkText={linkText} />;
  });
  const [randomData, setRandomData] = useState<BookData[]>([]);

  useEffect(() => {
    const shuffledData = shuffleArray(Data as BookData[]);
    const first8Items = shuffledData.slice(0, 8);
    setRandomData(first8Items);
  }, []);

  useEffect(() => {
    starRatings(randomData);
  }, [randomData]);

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <main className="bg-white px-4 py-6 mx-2">
      <div className="text-black">
        <SearchBar />
      </div>
      {/* search bar */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl  text-[var(--color-primary)] lucky ">
          Best Sellers
        </h1>

        <hr className="w-[60%]e text-black " />
        {/* start */}

        <Menu as="div" className="relative inline-block text-left  ">
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
        </Menu>

        {/* end */}
      </div>

      <section>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
          {randomData.map((item) => (
            <div key={item.img} className=" ">
              <div className=" flex flex-col gap-4 h-[100%]">
                <Image
                  {...srcset(item.img, 12)}
                  width={300}
                  height={300}
                  alt={item.title}
                  loading="lazy"
                  className="w-[120px] h-[170px] object-cover  "
                />
                <div className="text-black w-[140px] overflow-hidden p-2 flex flex-col justify-between flex-1">
                  <p className="text-gray-400">{item.category}</p>

                  <p>{item.agerange}</p>
                  <h1 className="font-extrabold break-words text-[var(--color-primary-v)]">
                    {item.title}
                  </h1>
                  <p>{item.code}</p>
                  <p className=" flex gap-2">
                    {item.rating instanceof Array ? (
                      item.rating.map((rating, index) => (
                        <span key={index}>
                          {rating === "full" ? (
                            <BsStarFill className="text-yellow-300" />
                          ) : rating === "half" ? (
                            <BsStarHalf className=" " />
                          ) : (
                            <AiOutlineStar className="" />
                          )}
                        </span>
                      ))
                    ) : (
                      <p>No rating yet</p>
                    )}
                  </p>
                  <p className="lato">
                    <span className="line-through italic">{item.oldprice}</span>{" "}
                    <span className="text-black font-extrabold whitespace-nowrap">
                      ₦
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>

                  <button className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BestSeller;
