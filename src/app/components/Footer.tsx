"use client";
import { FC } from "react";

import Link from "next/link";
import { MdLocationPin } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { HiMailOpen } from "react-icons/hi";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const Footer: FC = () => {
  useEffect(() => {
    AOS.init({ delay: 200, duration: 1500, once: false });
    AOS.refresh();
  }, []);
  return (
    <div className="bg-[var(--color-primary)] p-6 md:px-[4rem] text-white overflow-hidden">
      {/* first big div  */}
      <div className="flex gap-4 md:flex-row flex-col justify-between md:items-center mb-6  ">
        {/* menu  */}
        <div className="">
          <h1 className="font-bold text-lg mb-2">QUICK LINKS</h1>
          <ul className="flex gap-1 flex-col">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="terms#refund">Refund & Exchange</Link>
          </ul>
          <div className=" text-white">
            <h1 className="font-bold text-lg mb-2 mt-4">FOLLOW US</h1>
            <div className=" flex gap-4">
              <Link
                href="https://instagram.com/booksroundabout?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
              >
                <BsInstagram size={30} />
              </Link>
              <Link
                href="https://www.tiktok.com/@booksroundabout"
                target="_blank"
              >
                <FaTiktok size={30} />
              </Link>
              <Link href="https://wa.me/2349020704026" target="_blank">
                <BsWhatsapp size={30} />
              </Link>
              <Link
                href="https://instagram.com/booksroundaboutforall?igshid=MzRlODBiNWFlZA=="
                target="_blank"
              >
                <BsInstagram size={30} />
              </Link>
            </div>
          </div>
        </div>
        {/* work days  */}
        <div className="flex flex-col gap-3 mt-5">
          <h1 className="font-bold text-lg >HOURS">HOURS</h1>
          <div className="hours">
            <p className="font-bold">Mon,Tue,Wed,Thur,Fri</p>
            <p>8am - 6pm</p>
          </div>

          <div>
            <p className="font-bold">Sat</p>
            <p>9am - 4pm</p>
          </div>

          <div className="hours">
            <p className="font-bold">Sun</p>
            <p>Not Open</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5 ">
          <h1 className="font-bold text-lg ">Address</h1>
          <Link href="/ourStores">
            <p className="flex items-center gap-2">
              <MdLocationPin className=" " size={26} /> Ikeja, Balogun
            </p>
          </Link>
          <a
            href="tel:+234-(902)070-4026"
            className="flex items-center gap-2 cursor-pointer"
          >
            <IoIosCall className=" " size={26} /> +234-(902)070-4026
          </a>
          <a
            href="mailto:booksroundabout@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <p className="flex items-center gap-2 cursor-pointer">
              <HiMailOpen className="" size={26} /> booksroundabout@gmail.com
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
