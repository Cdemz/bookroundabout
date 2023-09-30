import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto py-6">
      <Image
        src="/payment-failed-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-empty-state-app-or-web-ui-vector-removebg-preview.png"
        alt="payment failed"
        height={300}
        width={300}
        className=""
      />
      <h1 className="text-red-500 font-bold text-4xl">Oops!!</h1>
      <p className="text-black font-bold">
        Click VEIW CART to process payment again
      </p>
      <Link href="/cart">
        <p className="bg-[var(--color-primary)] py-4 px-5 mt-4 hover:bg-red-800 cursor-pointer font-bold text-xl  rounded-2xl mx-auto  ">
          VEIW CART {">"}
        </p>
      </Link>
    </div>
  );
};

export default page;
