"use client";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RecoilRoot, useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import "../cssstyles/signin.css";
import { CiUser } from "react-icons/ci";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsArrowDownRightCircle } from "react-icons/bs";

import { RiCloseCircleFill } from "react-icons/ri";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { FC, useState, useContext } from "react";
import MenuItem from "./MenuItem";

const NavBar: FC = () => {
  const [cartItem] = useRecoilState(cartState);
  const fictionLinks = [
    "All Fiction Books",
    "Classics",
    "Romance",
    "Crime & Thriller",
    "Fantasy & Horror",
    "Poetry & Drama",
  ].map((linkText) => {
    return <MenuItem linkText={linkText} />;
  });

  const nfictionLinks = [
    "All Non-Fiction Books",
    "Art & Fashion",
    "Biography & Auto-Biography",
    "History",
    "Politics & Socials",
    "Computing & I.T",
    "Fantasy & Horror",
    "Music Books",
  ].map((linkText) => {
    return <MenuItem linkText={linkText} />;
  });

  const childLinks = [
    "All Children Books",
    "Baby & Toddler",
    "Age 5-8",
    "Age 9-12",
  ].map((linkText) => {
    return <MenuItem linkText={linkText} />;
  });

  const childrenLinks = [
    "Comics",
    "Fiction",
    "Poetry & Short Stories",
    "Family & Home",
    "Chapter Books",
    "Paper Covers",
    "Hard Covers",
  ].map((linkText) => {
    return <MenuItem linkText={linkText} />;
  });

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <main>
      <div className="flex justify-between py-4 text-[var(--color-primary-b)] px-2 md:px-8 fixed z-20 bg-white w-full top-8">
        <div
          className="my-auto text-[var(--color-primary-v)] text-2xl"
          onClick={handleNav}
        >
          {" "}
          {!nav ? (
            <HiMenuAlt1 size={26} />
          ) : (
            <RiCloseCircleFill size={26} />
          )}{" "}
        </div>

        <nav className="md:flex my-auto dosis hidden">
          <ul className="flex gap-4  ">
            <li className=" hover:bg[var( --color-bg: #00010a;)] active:bg[var( --color-bg: #00010a;)]">
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="">Shop</Link>
            </li>
            <li>
              <Link href="">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* <div className="flex gap-2 assistant">
        <button className="flex items-center justify-center gap-1 signt md:px-4 md:py-2 rounded-full  px-[6px] py-[2px]">
          Sign Up <CiUser className="text-[var(--color-primary-v)] signtt" />
        </button>

        <button className="font-bold"> Login </button>
      </div>*/}

        <div className="relative cursor-pointer right-4">
          <Link href="/cart">
            <div>
              <span className="text-black">
                <FiShoppingCart size={20} />
              </span>

              <span className="absolute -top-2 -right-2 text-[13px] bg-red-600 h-[18px] w-[18px] rounded-full grid place-items-center text-white lato font-bold">
                {cartItem.length}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-[6.2rem] w-[60%] rounded-2xl border-r border-r-gray-900  bg-[var(--color-primary)] ease-in-out duration-500 shadow-lg shadow-black z-20 h-full md:w-[30%]"
            : "fixed right-[-100%] "
        }
      >
        <ul className=" p-4 text-center text-white lucky flex flex-col gap-2">
          <a href="/">
            <li className="p-2">Home</li>
          </a>
          {/* begining */}
          <Menu
            as="div"
            className="relative inline-block text-left border-b border-gray-600"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-3.5 rounded-md   px-3 py-2 text-sm font-semibold shadow-sm     hover:bg-{var(--color-primary-a)} ">
                Fiction Books
                <BsArrowDownRightCircle size={21} />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none">
                <div className="py-1">{fictionLinks}</div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* second drop down */}
          <Menu
            as="div"
            className="relative inline-block text-left border-b border-gray-600"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-3.5 rounded-md   px-3 py-2 text-sm font-semibold shadow-sm     hover:bg-{var(--color-primary-a)} ">
                Non-Fiction Books
                <BsArrowDownRightCircle size={21} />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none ">
                <div className="py-1">{nfictionLinks}</div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* third link drop */}
          <Menu
            as="div"
            className="relative inline-block text-left border-b border-gray-600"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-3.5 rounded-md   px-3 py-2 text-sm font-semibold shadow-sm     hover:bg-{var(--color-primary-a)} ">
                Children's Books
                <BsArrowDownRightCircle size={21} />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none">
                <div className="py-1">{childLinks}</div>
                <div className="py-1">
                  <h1 className="text-[var(--color-text)] ml-2">
                    Popular Categories
                  </h1>
                  <hr />
                  {childrenLinks}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* endind */}
          <li className="p-2 border-b border-gray-600">
            <a href="">About us</a>
          </li>
          <li className="p-2 border-b border-gray-600">
            <a href="songs">Wholesale Purchase</a>
          </li>
          <li className="p-2 border-b border-gray-600">
            <a href="">BookStores</a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default NavBar;
