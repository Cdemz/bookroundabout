"use client";
// import Swiper core and required modules
import "../cssstyles/shop.css";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default () => {
  useEffect(() => {
    AOS.init({ delay: 200, duration: 1500, once: false });
    AOS.refresh();
  }, []);
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="relative ">
            <div className="h-[20%]">
              <Image
                priority
                src="/mainstore.jpg"
                alt="sliderImg"
                width={300}
                height={300}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="absolute top-0 bg-black  w-full bg-opacity-50 px-[4rem]  flex flex-col gap-4 items-center justify-center">
              <h1 className="text-2xl font-bold md:text-4xl lato">
                We Believe in the
                <span className="text-[var(--color-primary-v)]">
                  {" "}
                  Magic{" "}
                </span>{" "}
                of Books
              </h1>
              <p className="md:text-2xl">
                Let the enchantment of literature capture your heart.
              </p>
              <Link href="" className="fancy">
                <span className="top-key"></span>
                <span className="text">Shop Now</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative ">
            <div className="h-[20%] ">
              <Image
                src="/bookstore.jpg"
                alt="sliderImg"
                width={300}
                height={300}
                className="object-cover h-full w-full"
              />
            </div>

            <div className=" absolute top-0 bg-black h-full w-full bg-opacity-50 px-[4rem] py-[5rem] flex flex-col gap-4 items-center justify-center">
              <h1 className="text-4xl font-bold lucky">
                Empower Your Mind with Books
              </h1>
              <p className="text-2xl">Home of cheap books</p>
              <Link href="" className="fancy">
                <span className="top-key"></span>
                <span className="text">Shop Now</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        ...
      </Swiper>
    </>
  );
};
