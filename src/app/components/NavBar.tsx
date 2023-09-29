"use client";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import "../cssstyles/signin.css";
import { CiUser } from "react-icons/ci";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsArrowDownRightCircle } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FC, useState, useContext } from "react";
import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../type";
import { RootState } from "../redux/store";
import { Box, Button, Modal, Typography } from "@mui/material";
import SideCart from "./sideCart";
import LogOut from "./LogOut";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NavBar: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allData, setAllData] = useState([]);
  const userData = useSelector((state: RootState) => state.user?.userData);
  const userRole = userData?.role;
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );

  // const theme = useTheme();
  // const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const style = {
    backgroundColor: "white",
    // width: isMdScreen ? "25%" : "50%",
    height: "100%",
    right: "0%",
    top: "0",
    position: "absolute",
    outline: "none",
  };

  const fictionLinks = [
    "Fiction",
    "Classics",
    "Romance",
    "Crime & Thriller",
    "Fantasy & Horror",
    "Poetry & Drama",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });

  const nfictionLinks = [
    "Non-Fiction",
    "Art & Fashion",
    "Biography & Auto-Biography",
    "History",
    "Politics & Socials",
    "Computing & I.T",
    "Fantasy & Horror",
    "Music Books",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });

  const childLinks = [
    "All Children Books",
    "Baby & Toddler",
    "Age 5-8",
    "Age 9-12",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });

  const childrenLinks = [
    "Comics",
    "Fiction",
    "Poetry & Short Stories",
    "Family & Home",
    "Chapter Books",
    "Paper Covers",
    "Hard Covers",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <main>
      <div className="flex justify-between py-4 text-[var(--color-primary-b)] px-2 md:px-8 fixedz-20 bg-white w-full top-8">
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
        {/* <section>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title" className=" text-red-500">
                Text in a modal
              </h2>
              <p id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
              <h1 className="text-red-500">my text ;n;nj;uon</h1>
            </Box>
          </Modal>
        </section> */}

        <nav className="md:flex my-auto dosis hidden">
          <ul className="flex gap-4  ">
            <li className=" hover:bg[var( --color-bg: #00010a;)] active:bg[var( --color-bg: #00010a;)]">
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="">Shop</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
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
          {/* <Link href="/cart">
            <div>
              <span className="text-black">
                <FiShoppingCart size={20} />
              </span>

              <span className="absolute -top-2 -right-2 text-[13px] bg-red-600 h-[18px] w-[18px] rounded-full grid place-items-center text-white lato font-bold">
                {" "}
                {productData ? productData.length : 0}
              </span>
            </div>
          </Link> */}
          <div className="">
            <div className="relative" onClick={handleOpen}>
              <div className="">
                <span className="text-black">
                  <FiShoppingCart size={20} />
                </span>

                <span className="absolute -top-2 -right-2 text-[13px] bg-red-600 h-[18px] w-[18px] rounded-full grid place-items-center text-white lato font-bold">
                  {" "}
                  {productData ? productData.length : 0}
                </span>
              </div>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="w-[75%] md:w-[40%]">
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
                <Button onClick={handleClose} className="ml-2">
                  <RiCloseCircleFill size={26} />
                </Button>
                <SideCart />
              </Box>
            </Modal>
          </div>
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
            <li className="p-2" onClick={handleNav}>
              Home
            </li>
          </a>
          {/* begining */}
          <Menu
            as="div"
            className="relative inline-block text-left border-b border-gray-600"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-3.5 rounded-md   px-3 py-2 text-sm font-semibold shadow-sm     hover:bg-{var(--color-primary-a)}  ">
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
                <div className="py-1" onClick={handleNav}>
                  {fictionLinks}
                </div>
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
                <div className="py-1" onClick={handleNav}>
                  {nfictionLinks}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* third link drop */}
          <Menu
            as="div"
            className="relative inline-block text-left border-b border-gray-600"
          >
            <div>
              <Link href="/Category/children books">
                <Menu.Button className="inline-flex w-full justify-center gap-x-3.5 rounded-md   px-3 py-2 text-sm font-semibold shadow-sm     hover:bg-{var(--color-primary-a)} ">
                  Children's Books
                  <BsArrowDownRightCircle size={21} />
                </Menu.Button>
              </Link>
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
              <Menu.Items
                className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none"
                onClick={handleNav}
              >
                <div className="py-1" onClick={handleNav}>
                  {childLinks}
                </div>
                <div className="py-1">
                  <h1 className="text-[var(--color-text)] ml-2">
                    Popular Categories
                  </h1>
                  <hr />
                  <div className="" onClick={handleNav}>
                    {childrenLinks}
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* endind */}
          <li className="p-2 border-b border-gray-600">
            <Link href="/aboutUs" onClick={handleNav}>
              About us
            </Link>
          </li>

          <li className="p-2 border-b border-gray-600">
            <Link href="/ourStores" onClick={handleNav}>
              BookStores
            </Link>
          </li>
          <li className="p-2 border-b border-gray-600">
            <Link href="/contact" onClick={handleNav}>
              Contact Us
            </Link>
          </li>
          <div>
            {userData ? (
              <div className="flex flex-col gap-2">
                {/* User is logged in */}
                <Link href="/account" onClick={handleNav}>
                  <button>My Account</button>{" "}
                  {/* This button only appears when logged in */}
                </Link>

                {userRole === "admin" && (
                  <li className="p-2 border-b border-gray-600">
                    <Link href="/admin" onClick={handleNav}>
                      <button>Admin Panel</button>
                    </Link>
                  </li>
                )}
                <LogOut />
              </div>
            ) : (
              <div>
                {/* User is not logged in */}
                <Link href="/login" onClick={handleNav}>
                  <button>Login</button>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </main>
  );
};

export default NavBar;
