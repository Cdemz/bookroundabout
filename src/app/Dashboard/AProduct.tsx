import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/nextSlice";
// import { disableBook } from "../redux/actions";
// import { enableBook } from "../redux/actions";
import { API_BASE_URL } from "../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
    quantity: number;
    sales?: boolean;
    isNew?: boolean;
    stag: string;
    isDisabled: boolean;
    bookId: number;
    // Include the quantity property
  };
}

interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
  category?: string;
  agerange?: string;
  code?: string;
  oldprice?: number;
  quantity: number;
  sales?: boolean;
  isNew?: boolean;
  stag: string; // Include the quantity property
}

const AProduct: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const addItemsToCart = () => {
    // Dispatch the addToCart action with the product
    dispatch(addToCart({ ...product, quantity: 1 }));

    // Show a toast or perform other actions as needed
    toast(`${product.title} added to cart`);
  };

  const enableBook = async (bookId: string) => {
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const postData = { enabled: true };
      const response = await axios.post(
        `${API_BASE_URL}/book/${bookId}/toggle`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      // Handle successful enable
      toast.success(`Book ${product.title} enabled`);
      // Update local state or dispatch a Redux action if necessary
    } catch (error) {
      console.error("Error enabling book:", error);
      toast.error("Error enabling book");
    }
  };

  const disableBook = async (bookId: string) => {
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const postData = { enabled: false };
      const response = await axios.post(
        `${API_BASE_URL}/book/${bookId}/toggle`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      // Handle successful disable
      toast.success(`Book ${product.title} disabled`);
      // Update local state or dispatch a Redux action if necessary
    } catch (error) {
      console.error("Error disabling book:", error);
      toast.error("Error disabling book");
    }
  };

  const handleEnableBook = () => {
    enableBook(product.id.toString());
  };

  const handleDisableBook = () => {
    disableBook(product.id.toString());
  };

  const handleEditBook = () => {
    // Navigate to the edit page with the book's ID
    router.push(`/editBook?name=${product.id}`);
  };

  const renderOnSale = () => {
    if (product.sales === true) {
      return (
        <div className="bg-red-500 py-1 px-1 font-bold text-center flex items-center justify-center lato ml-[4rem]">
          On Sale!
        </div>
      );
    }
    // return null; // Render nothing if not on sale
  };

  return (
    <div className="bg-[#fff] pt-6 pb-4 flex flex-col gap-2">
      <div className="relative">
        <img
          className="w-[150px] h-[170px] object-cover mx-auto"
          src={product.img}
          alt=""
        />

        <div className="absolute top-0 right-4">
          {renderOnSale()}

          {product.isNew && (
            <div className="bg-red-500 h-12 w-12 rounded-full text-sm font-bold text-center flex items-center justify-center lato mt-[6rem] ml-[6rem]">
              New
            </div>
          )}
        </div>
      </div>

      <div className="px-6 h-[100%]">
        <div className="text-black w-[140px] overflow-hidden p-2 flex flex-col justify-between flex-1 h-[100%]">
          <p className="text-gray-400">{product.category}</p>
          <p>{product.agerange}</p>
          <h1 className="font-extrabold break-words text-[var(--color-primary-v)]">
            {product.title}
          </h1>
          <p>{product.code}</p>
          <p className="lato">
            <span className="line-through italic mr-2 ">
              {product.oldprice}
            </span>
            <span className="text-black font-extrabold whitespace-nowrap">
              ₦
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <div className=" flex gap-2 flex-col">
            <button
              onClick={handleDisableBook}
              className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm mt-auto"
            >
              Disable Book
            </button>
            <button
              onClick={handleEditBook}
              className="bg-[var(--color-primary-v)] text-white px-1 py-1 lato text-sm mt-auto rounded-md"
            >
              Edit Book
            </button>{" "}
            <button
              onClick={handleEnableBook}
              className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm mt-auto"
            >
              Enable Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AProduct;
