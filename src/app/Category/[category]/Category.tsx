"use client";
import { useRouter } from "next/navigation";
// import Data from "../../BooksData.json";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/nextSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import { API_BASE_URL } from "../../utils/api";
import axios from "axios";
export interface BookData {
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
  img: string;
  stag: any;
  oldprice: string;
}

interface ProductProps {
  product: {
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
    img: string;
    stag: any;
  };
}

type Props = {
  params: {
    category: string;
  };
};
// function getBookByCategory(category: string): BookData[] {
//   const response = await axios.get(`${API_BASE_URL}/book`);
//   const Data = response.data;
//   // Find the books with the matching category
//   const filteredBooks = Data.filter((item) => item.category === category);
//   return filteredBooks;
// }

// ... Rest of your component

export default function Home({ params }: Props) {
  const { category } = params;
  const [books, setBooks] = useState<BookData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book`);
        const allBooks = response.data; // Assuming the response has the array of all books
        const filteredBooks = allBooks.filter(
          (book: any) => book.category === category
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books", error);
        // Handle errors, maybe set an error state and display it
      }
    };

    fetchBooks();
  }, [category]);

  const addItemsToCart = (product: BookData) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
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
