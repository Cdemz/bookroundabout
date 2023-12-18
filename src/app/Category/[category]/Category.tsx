"use client";
import { useRouter } from "next/navigation";
import Data from "../../BooksData.json";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/nextSlice";
import toast from "react-hot-toast";
import Link from "next/link";

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

interface ProductProps {
  product: {
    id: number;
    img: string;
    title: string;
    category?: string;
    code?: string;
    price: number;
    oldprice?: number;
    description: string;
    agerange?: string;
    quantity: number; // Include the quantity property
  };
}

type Props = {
  params: {
    category: string;
  };
};
function getBookByCategory(category: string): BookData[] {
  // Find the books with the matching category
  const filteredBooks = Data.filter((item) => item.category === category);
  return filteredBooks;
}

// ... Rest of your component

export default function Home({ params }: Props) {
  const { category } = params;

  // State to store the books of the specified category
  const [books, setBooks] = useState<BookData[]>([]);

  // Effect to filter and load books based on the category
  useEffect(() => {
    // Use 'category' in your filtering logic, e.g., getBookByCategory(category)
    const filteredBooks = getBookByCategory(category);
    setBooks(filteredBooks);
  }, [category]);
  const dispatch = useDispatch();

  const addItemsToCart = (product: BookData) => {
    // Dispatch the addToCart action with the product
    dispatch(addToCart({ ...product, quantity: 1 }));

    // Show a toast or perform other actions as needed
    toast(`${product.title} added to cart`);
  };

  return (
    <main>
      <div className="">
        <div className=" text-[var(--color-text)] font-bold lato flex gap-2 items-center bg-white border-[var( --color-primary-b)] border-t h-12 px-4 ">
          <Link href="/">Home</Link>
          <p className="text-xl">/{category}</p>
        </div>
      </div>
      {/* best selling */}

      <section className="container mx-auto bg-white ">
        <div className="mx-auto my-4 text-center py-2 ">
          <h1 className="text-[var(--color-text)] font-bold lucky text-xl">
            Our Best Selling {category} Books
          </h1>
          <p className="text-[var(--color-text)]   lucky">
            i suppose put sort or filter for here
          </p>
        </div>
      </section>

      {/* ending */}
      <div className="text-black">
        {books.length > 0 ? (
          <>
            <section>
              <div className="mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
                {books.map((item) => (
                  <div key={item.img} className=" ">
                    <div className="flex flex-col gap-4 h-[100%]  ">
                      <img
                        className="w-[150px] h-[170px] object-cover "
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
          <p className="text-black">No books found in this category</p>
        )}
      </div>
    </main>
  );
}
