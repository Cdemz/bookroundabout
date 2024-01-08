// Import necessary modules and components
"use client";
import { useRouter } from "next/navigation";
// import Data from "../../BooksData.json";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "../store/nextSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import FormattedPrice from "@/app/components/FormattedPrice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import ShareIcons from "../aboutbook/[id]/ShareIcons";
import Suggest from "../aboutbook/[id]/Suggest";
import useQueryParams from "../Category/useRoute";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface BookData {
  imageUrl: string;
  title: string;
  category: string;
  rating?: number | string[];
  code: string;
  agerange?: string;
  price: number;
  oldprice?: number;
  id?: number;
  tag?: string[];
  description: string;
  amountInStock: number;
}

interface ProductProps {
  book: {
    id: number;
    img: string;
    title: string;
    category?: string;
    code?: string;
    price: number;
    oldprice?: number;
    description: string;
    agerange?: string;
    amountInStock: number;
    quantity: number; // Include the quantity property
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default function BookDetailPage({ params }: Props) {
  const queryParams = useQueryParams();
  const { name } = queryParams;
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState<BookData | null>(null); // Use state to handle book data

  useEffect(() => {
    const bookId = typeof name === "string" ? parseInt(name, 10) : null;

    if (bookId !== null) {
      // Fetch book data from the API
      fetch(`${API_BASE_URL}/book/${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Book not found");
          }
          return response.json();
        })
        .then((data) => {
          // Set the book data from the API response
          setBook(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [name]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (book) {
      // Dispatch the addToCart action with the product
      dispatch(addToCart({ ...book, quantity: 1 }));

      // Show a toast or perform other actions as needed
      toast(`${book.title} added to cart`);
    }
  };

  const handleAddToFavorites = () => {
    if (book) {
      // Dispatch the addToFavorite action with the product
      dispatch(addToFavorite({ ...book, quantity: 1 }));

      // Show a toast or perform other actions as needed
      toast(`${book.title} added to favorites`);
    }
  };
  const encodeCategory = (category: string) => encodeURIComponent(category);

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
        {isLoading ? (
          <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-[var(--color-text)]">
            <p>Your book is loading...</p>
            <BeatLoader color="#4d5bf8" size={40} />
          </div>
        ) : book ? ( // Check if book is not null
          <main>
            <div className="flex text-[var(--color-text)] item-center text-sm md:text-lg gap-1 mb-3 lato">
              <Link href="/">Home</Link>
              <Link href={`/Category/${encodeCategory(book.category)}`}>
                <p className=" font-semibold -mb-3 text-[var(--color-bg)]">
                  {" "}
                  <span>{"> "} </span>
                  {book.category}
                </p>
              </Link>
              <p className=" font-bold -mb-3 text-[var(--color-bg)]">
                {" "}
                <span>{"> "}</span>
                {book.title}
              </p>
            </div>
            <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
              <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
                <Image
                  src={book.imageUrl}
                  alt="book image"
                  width={500}
                  height={500}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4 lato">
                <div className="flex text-[var(--color-text)] item-center text-xs md:text-sm gap-1 ">
                  <Link href="/">Home</Link>
                  <p className="text-xs md:text-sm  font-semibold -mb-3 text-[var(--color-bg)]">
                    {" "}
                    /{book.category}
                  </p>
                </div>

                <h1 className="text-2xl md:text-3xl tracking-wide font-semibold text-[var(--color-text)]">
                  {book.title}
                </h1>
                <div className="">
                  <p className="  text-gray-600   font-semibold text-lg ">
                    <FormattedPrice amount={book.price} />

                    {book.oldprice && (
                      <span className="ml-1 line-through">
                        <FormattedPrice amount={book.oldprice} />
                      </span>
                    )}
                  </p>
                  <p className="  text-black   font-semibold text-lg ">
                    Amount In Stock: {book.amountInStock}
                  </p>

                  {book.oldprice && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      Your saved:{" "}
                      <span>
                        <FormattedPrice amount={book.oldprice - book.price} />
                      </span>
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-600">{book.description}</p>
                <div className=" ">
                  {/* <button
                    onClick={handleAddToFavorites}
                    className="px-3 py-2 md:w-96  border-2 border-[var(--color-primary)] text-[var(--color-primary)]  hover:bg-[var(--color-primary)] hover:text-white duration-300 rounded-full text-base font-semibold flex   gap-2"
                  >
                    <FaRegHeart size={20} />
                    Add to Wishlist
                  </button> */}
                </div>
                <div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full md:w-96 h-12 bg-[var(--color-primary)] text-gray-200 hover:bg-gray-200  hover:text-[var(--color-primary)] duration-300 rounded-lg mt-2 text-base font-semibold"
                  >
                    Add to Cart
                  </button>

                  <Link href="/cart">
                    <button
                      className="w-full md:w-96 h-12 bg-[var(--color-primary)] text-gray-200 hover:bg-gray-200  hover:text-[var(--color-primary)] duration-300 rounded-lg mt-2 text-base font-semibold"
                      onClick={handleAddToCart}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
                <ShareIcons book={book} />
              </div>
            </div>
          </main>
        ) : (
          <p>Book not found.</p> // Display a message when book is null
        )}
      </div>

      <Suggest />
    </main>
  );
}

// // Import necessary modules and components
// "use client";
// import { useRouter } from "next/navigation";
// import Data from "../../BooksData.json";
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, addToFavorite } from "../../store/nextSlice";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import FormattedPrice from "@/app/components/FormattedPrice";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { HiShoppingCart } from "react-icons/hi";
// import Image from "next/image";
// import { BeatLoader } from "react-spinners";
// import Suggest from "./Suggest";
// import ShareIcons from "./ShareIcons";

// export interface BookData {
//   img: string;
//   title: string;
//   category: string;
//   rating?: number | string[];
//   code: string;
//   agerange?: string;
//   price: number;
//   oldprice?: number;
//   id?: number;
//   tag?: string[];
//   description: string;
// }

// interface ProductProps {
//   book: {
//     id: number;
//     img: string;
//     title: string;
//     category?: string;
//     code?: string;
//     price: number;
//     oldprice?: number;
//     description: string;
//     agerange?: string;
//     quantity: number; // Include the quantity property
//   };
// }

// type Props = {
//   params: {
//     id: string;
//   };
// };

// function getBookById(id: number): BookData | null {
//   // Find the book with the matching id
//   const book = Data.find((item) => item.id === id);

//   // Return the book if found, or null if not found
//   return book || null;
// }

// export default function BookDetailPage({ params }: Props) {
//   const router = useRouter();
//   const { id } = params;
//   const [isLoading, setIsLoading] = useState(true);
//   const [book, setBook] = useState<BookData | null>(null); // Use state to handle book data

//   useEffect(() => {
//     // Ensure id is a number
//     const bookId = typeof id === "string" ? parseInt(id, 10) : null;

//     if (bookId !== null) {
//       // Call the function to get book information by ID
//       const foundBook = getBookById(bookId);
//       setBook(foundBook);
//       setIsLoading(false); // Set isLoading to false when data is available
//     } else {
//       setIsLoading(false); // Set isLoading to false when id is not valid
//     }
//   }, [id]);

//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     if (book) {
//       // Dispatch the addToCart action with the product
//       dispatch(addToCart({ ...book, quantity: 1 }));

//       // Show a toast or perform other actions as needed
//       toast(`${book.title} added to cart`);
//     }
//   };

//   const handleAddToFavorites = () => {
//     if (book) {
//       // Dispatch the addToFavorite action with the product
//       dispatch(addToFavorite({ ...book, quantity: 1 }));

//       // Show a toast or perform other actions as needed
//       toast(`${book.title} added to favorites`);
//     }
//   };
//   const encodeCategory = (category: string) => encodeURIComponent(category);

//   return (
//     <main>
//       <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
//         {isLoading ? (
//           <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-[var(--color-text)]">
//             <p>Your book is loading...</p>
//             <BeatLoader color="#4d5bf8" size={40} />
//           </div>
//         ) : book ? ( // Check if book is not null
//           <main>
//             <div className="flex text-[var(--color-text)] item-center text-sm md:text-lg gap-1 mb-3 lato">
//               <Link href="/">Home</Link>
//               <Link href={`/Category/${encodeCategory(book.category)}`}>
//                 <p className=" font-semibold -mb-3 text-[var(--color-bg)]">
//                   {" "}
//                   <span>{"> "} </span>
//                   {book.category}
//                 </p>
//               </Link>
//               <p className=" font-bold -mb-3 text-[var(--color-bg)]">
//                 {" "}
//                 <span>{"> "}</span>
//                 {book.title}
//               </p>
//             </div>
//             <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
//               <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
//                 <Image
//                   src={book.img}
//                   alt="book image"
//                   width={500}
//                   height={500}
//                 />
//                 <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
//                   <span
//                     onClick={handleAddToCart}
//                     className="w-full h-full border-b-[1px] border-b-[var(--color-primary)] flex items-center justify-center text-xl bg-transparent hover:bg-[var(--color-primary-v)] cursor-pointer duration-300 text-[var(--color-text)]"
//                   >
//                     <HiShoppingCart />
//                   </span>
//                   <span
//                     onClick={handleAddToFavorites}
//                     className="w-full h-full border-b-[1px] border-b-[var(--color-primary)] flex items-center justify-center text-xl bg-transparent hover:bg-[var(--color-primary-v)] cursor-pointer duration-300 text-[var(--color-text)]"
//                   >
//                     <FaHeart />
//                   </span>
//                 </div>
//               </div>
//               <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4 lato">
//                 <div className="flex text-[var(--color-text)] item-center text-xs md:text-sm gap-1 ">
//                   <Link href="/">Home</Link>
//                   <p className="text-xs md:text-sm  font-semibold -mb-3 text-[var(--color-bg)]">
//                     {" "}
//                     /{book.category}
//                   </p>
//                 </div>

//                 <h1 className="text-2xl md:text-3xl tracking-wide font-semibold text-[var(--color-text)]">
//                   {book.title}
//                 </h1>
//                 <div className="">
//                   <p className="  text-gray-600   font-semibold text-lg ">
//                     <FormattedPrice amount={book.price} />

//                     {book.oldprice && (
//                       <span className="ml-1 line-through">
//                         <FormattedPrice amount={book.oldprice} />
//                       </span>
//                     )}
//                   </p>
//                   {book.oldprice && (
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       Your saved:{" "}
//                       <span>
//                         <FormattedPrice amount={book.oldprice - book.price} />
//                       </span>
//                     </p>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-600">{book.description}</p>
//                 <div className=" ">
//                   {/* <button
//                     onClick={handleAddToFavorites}
//                     className="px-3 py-2 md:w-96  border-2 border-[var(--color-primary)] text-[var(--color-primary)]  hover:bg-[var(--color-primary)] hover:text-white duration-300 rounded-full text-base font-semibold flex   gap-2"
//                   >
//                     <FaRegHeart size={20} />
//                     Add to Wishlist
//                   </button> */}
//                 </div>
//                 <div>
//                   <button
//                     onClick={handleAddToCart}
//                     className="w-full md:w-96 h-12 bg-[var(--color-primary)] text-gray-200 hover:bg-gray-200  hover:text-[var(--color-primary)] duration-300 rounded-lg mt-2 text-base font-semibold"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//                 <ShareIcons book={book} />
//               </div>
//             </div>
//           </main>
//         ) : (
//           <p>Book not found.</p> // Display a message when book is null
//         )}
//       </div>

//       <Suggest />
//     </main>
//   );
// }
