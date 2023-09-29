import Link from "next/link";
import React from "react";
import { FaSmile } from "react-icons/fa";
import Slider from "./Slider";
import Image from "next/image";
import "../cssstyles/Seller.css";

const page = () => {
  return (
    <div className=" text-[var(--color-text)] md:p-4 ">
      <div className="bg-white my-3 p-4 ">
        <div className="flex text-[var(--color-primary)] item-center text-lg md:text-2xl gap-1 mb-3 lato ">
          <Link href="/">Home</Link>
          <Link href="/aboutUs">
            <p className=" font-semibold -mb-3 text-[var(--color-bg)]">
              {" "}
              <span> / </span>
              About Us
            </p>
          </Link>
        </div>
        <h1 className="font-bold text-2xl">About Us</h1>

        <p className="md:w-[85%]">
          We are a prominent independent book retailer in Nigeria, boasting
          multiple branches across Lagos. Our extensive inventory comprises a
          wide variety of books, spanning numerous genres and categories.
          Whatever type of book you're seeking, we provide top-notch options,
          making us your premier choice.{" "}
        </p>
      </div>
      <div className="p-4 md:w-[85%]">
        <h3 className="font-bold text-2xl">Our Mission</h3>
        <p>
          Our mission is to provide our customers with a wide variety of books
          at affordable prices. We strive to make our inventory as extensive as
          possible, so that we can provide something for everyone. Whether
          you're looking for a new release or a classic, we have you covered.
        </p>
      </div>
      <Slider />
      <div className="flex flex-col gap-4 p-4 md:w-[85%]">
        <p>
          Books Roundabout stands as Nigeria's most proficient book store
          featuring enomorsly cheap books, with a rich history dating back to
          its establishment in 2015. Today, our company boasts both wholesale
          and retail operations spread across various locations. Notably, our
          storehouses the largest book collection in Nigeria.
        </p>
        <p>
          Our stores offer an inviting literary ambiance and showcase a diverse
          range of local and international books. We proudly represent many of
          the world's renowned publishers in Nigeria, ensuring that we cater to
          readers of all ages. Furthermore, we provide a wide array of
          stationery items suitable for home, school, and office use.
        </p>
      </div>
      {/* are you a writer */}
      <div className="relative mb-3">
        <div className="">
          <div className="h-[20%] md:h-[40vh]">
            <Image
              priority
              src="/bgwriter.avif"
              alt="sliderImg"
              width={300}
              height={300}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="absolute top-0 bg-black bg-opacity-30 text-white flex flex-col gap-4 h-full text-center p-4 pb-4 ">
          <div className="mx-auto flex flex-col justify-center items-center">
            <FaSmile size={50} />
          </div>

          <h3 className="font-bold text-2xl">Are you an author or creator? </h3>
          <p>
            We're eager to support up-and-coming talents, including people from
            all over the world, and especially those from Nigeria. Everyone is
            welcome, so please feel free to reach out.
          </p>
          <div className="mb-6">
            <Link href="/contact">
              <button className=" buttons1 mb-6">Get in touch</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
