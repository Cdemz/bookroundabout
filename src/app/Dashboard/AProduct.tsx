import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/nextSlice";
import { disableBook } from "../redux/actions";
import { enableBook } from "../redux/actions";

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

  const addItemsToCart = () => {
    // Dispatch the addToCart action with the product
    dispatch(addToCart({ ...product, quantity: 1 }));

    // Show a toast or perform other actions as needed
    toast(`${product.title} added to cart`);
  };

  // const handleDisableBook = () => {

  //   dispatch(disableBook(product.id.toString()));
  // };

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
          <div className=" flex gap-4 flex-col">
            <button className="bg-[var(--color-primary)] text-white px-1 py-1 lato text-sm mt-auto">
              Disable Book
            </button>
            <button className="bg-[var(--color-primary-v)] text-white px-1 py-1 lato text-sm mt-auto rounded-md">
              Edit Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AProduct;
