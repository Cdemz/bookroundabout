// import Swiper core and required modules
"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className="">
        <div className="h-[20%] md:h-[40vh]">
          <Image
            priority
            src="/store 1.avif"
            alt="sliderImg"
            width={300}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[20%] md:h-[40vh]">
          <Image
            priority
            src="/store 2.avif"
            alt="sliderImg"
            width={300}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[20%] md:h-[40vh]">
          <Image
            priority
            src="/store 3.avif"
            alt="sliderImg"
            width={300}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[20%] md:h-[40vh]">
          <Image
            priority
            src="/store 4.avif"
            alt="sliderImg"
            width={300}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[20%] md:h-[40vh]">
          <Image
            priority
            src="/store 5.avif"
            alt="sliderImg"
            width={300}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
};
