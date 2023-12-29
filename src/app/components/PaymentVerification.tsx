// PaymentVerification.jsx

import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/api"; // Adjust the path as per your project structure
import toast from "react-hot-toast";

const PaymentVerification = () => {
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

        // Handle the verification result
        // For example, display a success message
        toast.success("Payment Verified Successfully!");
      } catch (error) {
        console.error("Error verifying purchase:", error);
        toast.error("Error verifying payment.");
      }
    } else {
      console.error("Code parameter is missing in the URL");
      toast.error("Code parameter is missing.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      {/* You can put some loading indicator or message here */}
      Verifying Payment...
    </div>
  );
};

export default PaymentVerification;
