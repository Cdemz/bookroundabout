import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../store/nextSlice";
import { StoreProduct } from "../type";

interface Item {
  category: string;
  description: string;
  img: string;
  isNew: boolean;
  oldprice: number;
  price: number;
  title: string;
  id: number;
  quantity: number;
}

interface CartProductProps {
  item: StoreProduct;
}

const CartProduct = ({ item }: CartProductProps) => {
  const dispatch = useDispatch();

  return (
    <section>
      <div className="bg-[var(--color-primary-v)] rounded-lg flex items-center gap-4">
        <Image
          className="object-cover"
          width={150}
          height={150}
          src={item.img}
          alt="productImage"
          priority={true}
        />
        <div className="flex items-center px-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-blue-700">{item.title}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-600">
              Unit Price{" "}
              <span className="font-semibold text-amazon_blue">
                <FormattedPrice amount={item.price} />
              </span>
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                <span
                  onClick={() =>
                    dispatch(
                      increaseQuantity({
                        id: item.id,
                        category: item.category,
                        description: item.description,
                        img: item.img,
                        isNew: item.isNew,
                        oldPrice: item.oldprice,
                        price: item.price,
                        title: item.title,
                        quantity: 1,
                        // ...other properties from item
                      })
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                >
                  <LuPlus />
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
                        id: item.id,
                        category: item.category,
                        description: item.description,
                        img: item.img,
                        isNew: item.isNew,
                        oldPrice: item.oldprice,
                        price: item.price,
                        title: item.title,
                        quantity: 1,
                        // ...other properties from item
                      })
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                >
                  <LuMinus />
                </span>
              </div>
              <div
                onClick={() => dispatch(deleteProduct(item.id))}
                className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
              >
                <IoMdClose className="mt-[2px]" /> <p>remove</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-amazon_blue">
            <FormattedPrice amount={item.price * item.quantity} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartProduct;
