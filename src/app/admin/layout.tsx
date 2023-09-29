"use client";
import Link from "next/link";
import { useState, ReactNode } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

interface LayoutProps {
  children: ReactNode;
}

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

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className=" ">
      {/* <div className="md:w-1/5 bg-[var(--color-text)] h-full   overflow-y-auto  hidden md:block">
        <nav className="bg-white pl-2 pr-2 py-6     mt-8  ">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/Dashboard"
                className="text-[var(--color-text)]    hover:bg-gray-200 active:bg-white active:text-[var(--color-primary)] hover:text-[var(--color-primary)] px-4 py-2 rounded-full font-bold"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/sale"
                className="text-[var(--color-text)]    hover:bg-gray-200 active:bg-white active:text-[var(--color-primary)] hover:text-[var(--color-primary)]  py-2 rounded-full font-bold"
              >
                Create Sale
              </Link>
            </li>
            <li>
              <Link href="/category">Category</Link>
            </li>
            <li>
              <Link href="/orders">Order</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <Link href="/products">Product</Link>
            </li>
            <li>
              <Link href="/profile">proflie</Link>
            </li>
            <li>
              <Link href="/discount">Discount</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>

          </ul>
        </nav>
      </div> */}
      <main className=" overflow-y-auto">{children}</main>
      {/* Rest of your component remains the same */}
    </div>
  );
};

export default Layout;
