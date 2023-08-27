import Image from "next/image";
import React from "react";

const Stickytop = () => {
  return (
    <div className="flex gap-2 justify-center py-2 items-center bg-white fixed z-20 w-full mb-10">
      <Image
        src="/bookslogo.png"
        alt="hero-img"
        width={300}
        height={300}
        className=" h-8 w-8 "
      />
      <h1 className="text-[var(--color-primary-v)] assistant font-bold ">
        Books Roundabout
      </h1>
    </div>
  );
};

export default Stickytop;
