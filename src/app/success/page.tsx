import Link from "next/link";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const Success = () => {
  return (
    <div className="h-screen grid place-items-center text-black mx-auto my-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Thank You</h1>{" "}
        <AiFillCheckCircle className="text-green-500 mx-auto my-4" size={120} />
        <p className="text-center text-2xl">Order Placed Successfully</p>
        <p>Click return home to go back homepage</p>
        <Link href="/">
          <p className="bg-yellow-500 py-4 px-5 mt-4 hover:bg-red-800 cursor-pointer font-bold text-xl  rounded-2xl w-[15rem] mx-auto  ">
            RETURN HOME {">"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Success;
