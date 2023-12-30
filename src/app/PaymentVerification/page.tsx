// PaymentVerification.jsx
"use client";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/api"; // Adjust the path as per your project structure
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const PaymentVerification = () => {
  const router = useRouter();
  // Function to extract code from URL and verify payment

  const verifyPayment = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/purchase/verify/${code}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();

        // Check the 'status' field instead of 'success'
        if (result.status === "success") {
          toast.success("Payment Verified Successfully!");
          router.push("/success"); // Redirect to success page
        } else {
          toast.error("Payment verification failed.");
          // Uncomment this if you want to redirect on failure
          // router.push("/failed"); // Redirect to failure page
        }
      } catch (error) {
        // Uncomment this if you want to log the error
        // console.error("Error verifying purchase:", error);
        toast.error("Error verifying payment.");
        // Uncomment this if you want to redirect on error
        // router.push("/failed"); // Redirect to failure page
      }
    } else {
      // Uncomment this if you want to log missing code error
      // console.error("Code parameter is missing in the URL");
      toast.error("Code parameter is missing.");
      // Uncomment this if you want to redirect on missing code
      // router.push("/failed"); // Redirect to failure page if code is missing
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      {/* You can put some loading indicator or message here */}

      <div className="w-full flex flex-col gap-6 items-center justify-center py-20 text-[var(--color-text)] font-bold">
        <p>Verifying Payment...</p>
        <BeatLoader color="#4d5bf8" size={40} />
      </div>
    </div>
  );
};

export default PaymentVerification;
