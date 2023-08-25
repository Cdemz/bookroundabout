"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdLocationPin } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { HiMailOpen } from "react-icons/hi";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer: FC = () => {
  useEffect(() => {
    AOS.init({ delay: 200, duration: 1500, once: false });
    AOS.refresh();
  }, []);
  return (
    <div className="bg-[var(--color-second)] p-6 md:px-[4rem] text-[var(--color-bg)] overflow-hidden">
      {/* first big div  */}
      <div className="flex gap-4 md:flex-row flex-col justify-between md:items-center mb-6  ">
        {/* image  */}
        <div className="">
          <Image
            src="/bookslogo.png"
            width={300}
            height={300}
            alt="logo"
            data-aos="fade-left"
          />
        </div>
        {/* menu  */}
        <div className="">
          <h1 className="font-bold text-lg mb-2">QUICK LINKS</h1>
          <ul className="flex gap-1 flex-col">
            <Link href="/">
              {" "}
              <li>
                <a href="/">Home</a>
              </li>
            </Link>
            <Link href="/shop">
              <li>
                <a href="">Shop</a>
              </li>
            </Link>
            <Link href="/about">
              <li>
                <a href="">About Us</a>
              </li>
            </Link>
            <Link href="/wholesale">
              <li>
                <a href="">Wholesale Purchase</a>
              </li>
            </Link>

            <Link href="/contact">
              <li>
                <a>Contact</a>
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-3 mt-5 ">
          <h1 className="font-bold text-lg ">Address</h1>
          <p className="flex items-center gap-2">
            <MdLocationPin className="text-[var(--color-primary)]" size={26} />{" "}
            Ikeja, Balogun
          </p>
          <a
            href="tel:+234-(902)070-4026"
            className="flex items-center gap-2 cursor-pointer"
          >
            <IoIosCall className="text-[var(--color-primary)]" size={26} />{" "}
            +234-(902)070-4026
          </a>
          <a
            href="mailto:booksroundabout@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <p className="flex items-center gap-2 cursor-pointer">
              <HiMailOpen className="text-[var(--color-primary)]" size={26} />{" "}
              booksroundabout@gmail.com
            </p>
          </a>
        </div>
      </div>
      {/* second big div  */}
      <div className="  pt-8 items-center flex flex-col text-center">
        <p>
          {" "}
          Books RoundAbout. Navigate the Literary Realm, Crafted with Finesse,
          Curated with Zeal. ©2023
        </p>
      </div>
    </div>
  );
};

export default Footer;
