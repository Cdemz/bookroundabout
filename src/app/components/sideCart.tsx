import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { StoreProduct } from "../type";
import ScartProduct from "./ScartProduct";
import ScartPayment from "./ScartPayment";
import Image from "next/image";
import Link from "next/link";

const sideCart = () => {
  const { productData } = useSelector((state: RootState) => state.next);

  return (
    <div className="max-w-screen-2xl mx-auto px-6   gap-10 py-4">
      {productData.length > 0 ? (
        <>
          <div className="  col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold text-[var(--color-text)] lato">
                My Cart
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <div className="overflow-y-scroll h-[50vh] w-full">
                {productData.map((item: StoreProduct) => (
                  <div key={item.id}>
                    <ScartProduct item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg h-64  col-span-1 p-4 rounded-lg flex items-center justify-center">
            <button></button>
            <ScartPayment />
          </div>
        </>
      ) : (
        <div className="bg-white h-[70vh] col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg lato">
          <Image
            src="/empty cart.png"
            alt=""
            width={300}
            height={300}
            priority={true}
            className="h-[21vh] w-[70vw] lg:h-[55vh]"
          />
          <h1 className="text-lg text-[var(--color-text)] font-bold">
            Your cart is empty!
          </h1>
          <p className="text-[var(--color-primary-b)] text-center px-4">
            Looks like you have not added anything to your cart. Go ahead &
            explore top categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default sideCart;
