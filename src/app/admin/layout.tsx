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
    <div className="flex">
      <div className="hidden">
        <Button onClick={handleOpen} className="md:hidden">
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <div className="">
          <nav className="bg-[var(--color-primary)] pl-6 pr-2 py-6 hidden md:block">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/Dashboard"
                  className="text-white    hover:bg-gray-200 active:bg-white active:text-[var(--color-primary)] hover:text-[var(--color-primary)] px-4 py-2 rounded-full"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sale">Create Sale</Link>
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
            </ul>
          </nav>
        </div>
      </div>

      <main className="">{children}</main>
      {/* Rest of your component remains the same */}
    </div>
  );
};

export default Layout;
