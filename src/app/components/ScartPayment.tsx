"use client";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../type";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import Link from "next/link";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ScartPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    productData.forEach((item: StoreProduct) => {
      amt += item.price * item.quantity;
    });
    setTotalAmount(amt);
  }, [productData]);

  const handleCheckout = async () => {
    try {
      const calculationResponse = await calculatePrice();
      if (calculationResponse.success) {
        const purchaseResponse = await makePurchase(calculationResponse.data);
        if (purchaseResponse.success) {
          const verificationResponse = await verifyPurchase(
            purchaseResponse.transactionId
          );
          if (verificationResponse.verified) {
            // Handle successful verification
            console.log("Purchase verified successfully");
          } else {
            // Handle verification failure
            console.error("Verification failed");
          }
        } else {
          // Handle purchase failure
          console.error("Purchase failed");
        }
      } else {
        // Handle price calculation failure
        console.error("Price calculation failed");
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
    }
  };

  async function calculatePrice() {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with the actual key

    // Transform productData into the expected format
    const books = productData.map((item: StoreProduct) => ({
      bookId: item.id.toString(), // Convert bookId to a string
      quantity: item.quantity.toString(), // Convert quantity to a string
    }));

    // Ensure we have at least one book
    if (books.length === 0) {
      console.error("No books in the cart to calculate price for");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${API_BASE_URL}/purchase/calculate`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ books }), // Send the transformed books array
    });
    return await response.json();
  }

  // Make Purchase Function
  async function makePurchase(priceData: any) {
    const response = await fetch(`${API_BASE_URL}/purchase/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceData, email: userInfo.email }),
    });
    return await response.json();
  }

  // Verify Purchase Function
  async function verifyPurchase(transactionId: any) {
    const response = await fetch(`${API_BASE_URL}/purchase/verify/:code`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    });
    return await response.json();
  }
  return (
    <div className="flex flex-col gap-4 ">
      <div className=""></div>
      {/* <div className="flex gap-2">
        <p className="text-sm text-[var(--color-text)]">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div> */}
      <p className="flex items-center justify-between px-2 font-semibold text-[var(--color-text)]">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      <div className="flex flex-col items-center">
        <Link href="/cart">
          <button
            // onClick={handleCheckout}
            className="w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300 px-5 py-4 mb-12 text-center"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScartPayment;
