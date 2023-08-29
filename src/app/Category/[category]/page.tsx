"use client";
import { useRouter } from "next/navigation";
import Data from "../../BooksData.json";
import { useState, useEffect } from "react";

type Props = {
  params: {
    category: string;
  };
};

function getBookByCategory(category: string) {
  // Find the book with the matching category
  const book = Data.find((item) => item.category === category);

  // Return the book if found, or null if not found
  return book || null;
}
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
// ...
export default function Home({ params }: Props) {
  const router = useRouter();
  const { category } = params;

  // State to store the books of the specified category
  const [books, setBooks] = useState<BookData[]>([]);

  // Effect to filter and load books based on the category
  useEffect(() => {
    const filteredBooks = Data.filter((item) => item.category === category);
    setBooks(filteredBooks);
  }, [category]);

  return (
    <div className="text-black">
      {books.length > 0 ? (
        <>
          <section>
            <div className="mx-auto px-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
              {books.map((item) => (
                <div key={item.img} className=" ">
                  <div className="flex flex-col gap-4 h-[100%]">
                    <img
                      className="w-[150px] h-[170px] object-cover mx-auto"
                      src={item.img}
                      alt=""
                    />
                    <div className="text-black w-[140px] overflow-hidden p-2 flex flex-col justify-between flex-1">
                      <p className="text-gray-400">{item.category}</p>

                      <p>{item.agerange}</p>
                      <h1 className="font-extrabold break-words text-[var(--color-primary-v)]">
                        {item.title}
                      </h1>
                      <p>{item.code}</p>

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

                      <button className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm">
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
        <p className="text-black">No books found in this category</p>
      )}
    </div>
  );
}
