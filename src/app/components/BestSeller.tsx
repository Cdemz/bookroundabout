"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import Data from "../BooksData.json";

interface BookData {
  img: string;
  title: string;
  category: string;
  rating?: React.ReactNode;
  code: string;
  agerange?: string;
  price: string;
  oldprice?: string;
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
  const [randomData, setRandomData] = useState<BookData[]>([]);

  useEffect(() => {
    const shuffledData = shuffleArray(Data as BookData[]);
    const first8Items = shuffledData.slice(0, 8);
    setRandomData(first8Items);
  }, []);

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
      <div className="">
        <div className="bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 max-w-[70vw] mx-auto">
          <div className=" flex gap-2 items-center ml-2">
            <BiSearchAlt2 />
            <input
              placeholder="Type here.."
              id="input"
              className="input bg-transparent focus:outline-none w-[100%] "
              name="text"
              type="text"
            />
          </div>
          <div className="">
            <button className="bg-[var(--color-primary-v)] text-white py-2 px-8 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* search bar */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl mb-5 text-[var(--color-primary)] lucky">
          Best Sellers
        </h1>

        <hr className="w-[60%]e text-black " />

        <button className="bg-[var(--color-primary)] text-white py-2 px-4 md:px-8 rounded-full">
          View by section
        </button>
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
                  <p className="lato">
                    <span className="line-through italic">{item.oldprice}</span>{" "}
                    <span className="text-black font-extrabold whitespace-nowrap">
                      {item.price}
                    </span>
                  </p>

                  <button className="bg-[var(--color-primary-v)] text-white px-1 py-1 lato text-sm">
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
