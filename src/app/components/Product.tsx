"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import toast from "react-hot-toast";

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    img: string;
    category?: string;
    agerange?: string;
    code?: string;
    // Add other properties as needed
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [cartItem, setCartItem] = useRecoilState<any[]>(cartState);

  const addItemsToCart = () => {
    setCartItem((prevState) => {
      const itemIndex = prevState.findIndex((pro) => pro.id === product.id);

      if (itemIndex === -1) {
        return [...prevState, { ...product, quantity: 1 }];
      } else {
        const updatedCart = prevState.map((item, index) => {
          if (index === itemIndex) {
            return { ...item, quantity: (item.quantity || 0) + 1 };
          }
          return item;
        });
        return updatedCart;
      }
    });

    toast(`${product.title} added to cart`);
  };

  return (
    <div className="bg-[#fff] pt-6 pb-4 shadow-2xl  flex flex-col gap-4 h-[100%]">
      <img
        className="w-[120px] h-[170px]  object-contain"
        src={product.img}
        alt=""
      />

      <div className="mt-4 px-6">
        <div className="text-black w-[140px] overflow-hidden p-2 flex flex-col justify-between flex-1">
          <p className="text-gray-400">{product.category}</p>

          <p>{product.agerange}</p>
          <h1 className="font-extrabold break-words text-[var(--color-primary-v)]">
            {product.title}
          </h1>
          <p>{product.code}</p>
        </div>

        <button
          className="bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800"
          onClick={addItemsToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
