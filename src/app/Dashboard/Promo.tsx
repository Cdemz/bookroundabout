import Image from "next/image";
import React from "react";
import "../cssstyles/Abook.css";
import { BiBookAdd } from "react-icons/bi";
import Link from "next/link";

const Promo = () => {
  return (
    <div className="relative">
      <div className="w-[100%] md:h-[50%]">
        <Image
          src="/group book.png"
          width={300}
          height={300}
          alt="book store"
          className="w-full h-full"
        />
      </div>
      <div className="bg-black bg-opacity-70 absolute top-0 h-full w-full flex flex-col justify-center px-5 py-4 lato text-center items-center gap-3">
        <h1 className="font-bold text-lg"> Expand Your Collection</h1>
        <h2 className="text-md">
          {" "}
          Handpick the books that define your bookstore
        </h2>
        <Link href="/addBook">
          <div className="Abook flex gap-4 px-4 py-2 items-center w-[14rem] mt-2">
            <BiBookAdd />
            <b>Add new book</b>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Promo;
