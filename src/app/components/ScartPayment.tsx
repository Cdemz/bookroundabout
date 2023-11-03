"use client";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../type";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import React from "react";
import { Button, Modal } from "@mui/material";
// import { useHistory } from 'react-router-dom';

const ScartPayment = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    productData.map((item: StoreProduct) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [productData]);
  // Striep payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // const response = await fetch("../api/checkout_session.tsx", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ items: productData, email: session?.user?.email }),
    // });
    // const checkoutSession = await response.json();

    // Redirecting user/customer to Stripe Checkout
    // const result: any = await stripe?.redirectToCheckout({
    //   // sessionId: checkoutSession.id,
    // });
    // n
  };
  const [open, setOpen] = useState(false);
  // const history = useHistory();

  const handleGoToCart = () => {
    // Close the modal before navigating to the cart page
    handleClose();

    // Navigate to the cart page using React Router
    // history.push('/cart');
  };
  return (
    <div className="flex flex-col gap-4 ">
      <p className="flex items-center justify-between px-2 font-semibold text-[var(--color-text)]">
        Subtotal:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      <div className="flex flex-col items-center md:flex-row">
        <Link href="/cart">
          <Button
            onClick={handleGoToCart}
            className="px-8 w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
          >
            VIEW CART
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <Link href="/payment">
          <button
            onClick={handleClose}
            className="w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
          >
            Proceed to Buy
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScartPayment;
