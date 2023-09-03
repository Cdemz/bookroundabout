import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../store/nextSlice";
import { StoreProduct } from "../type";
import { RiAddCircleLine } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";

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
      <div className="bg-white rounded-lg flex items-center gap-2 md:gap-4 py-4 ">
        <Image
          className="object-cover"
          width={150}
          height={150}
          src={item.img}
          alt="productImage"
          priority={true}
        />
        <div className=" flex  md:w-[80vw] flex-col  px-2 gap-4  ">
          <div className="flex flex-col gap-1 lato  ">
            <p className="text-lg font-bold text-[var(--color-text)]  ">
              {item.title}
            </p>
            <p className="text-sm text-gray-600">{item.code}</p>

            <p className="text-sm text-gray-600">
              Unit Price{" "}
              <span className="font-semibold text-amazon_blue">
                <FormattedPrice amount={item.price} />
              </span>
            </p>
            <div className="flex items-center gap-2 md:gap-6">
              <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                <button
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
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer text-black"
                >
                  <RiAddCircleLine />
                </button>
                <span className="text-[var(--color-text)]">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
                        id: item.id,

                        quantity: 1,
                        // ...other properties from item
                      })
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer text-black"
                >
                  <AiOutlineMinusCircle />
                </button>
              </div>
              <div
                onClick={() => dispatch(deleteProduct(item.id))}
                className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
              >
                <IoMdClose className="mt-[2px]" size={20} /> <p>remove</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-[var(--color-text)]">
            {" "}
            <span className="text-sm">Total:</span>
            <FormattedPrice amount={item.price * item.quantity} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartProduct;
