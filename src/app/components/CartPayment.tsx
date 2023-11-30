"use client";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../type";
import { useEffect, useState } from "react";
// import { API_BASE_URL } from "../utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CartPayment = () => {
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

  // Calculate Price Function
  async function calculatePrice() {
    const response = await fetch(`${API_BASE_URL}/purchase/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: productData }),
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
      <div className="flex gap-2">
        <p className="text-sm text-[var(--color-text)]">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold text-[var(--color-text)]">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      <div className="flex flex-col items-center">
        <button
          onClick={handleCheckout}
          className="w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartPayment;

// "use client";
// import { SiMediamarkt } from "react-icons/si";
// import FormattedPrice from "./FormattedPrice";
// import { useDispatch, useSelector } from "react-redux";
// import { StateProps, StoreProduct } from "../type";
// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const CartPayment = () => {
//   const { productData, userInfo } = useSelector(
//     (state: StateProps) => state.next
//   );
//   const [totalAmount, setTotalAmount] = useState(0);
//   useEffect(() => {
//     let amt = 0;
//     productData.map((item: StoreProduct) => {
//       amt += item.price * item.quantity;
//       return;
//     });
//     setTotalAmount(amt);
//   }, [productData]);
//   // Striep payment
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );

//   const handleCheckout = async () => {
//     const stripe = await stripePromise;

//     // const response = await fetch("../api/checkout_session.tsx", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ items: productData, email: session?.user?.email }),
//     // });
//     // when payment is ready
//     // const checkoutSession = await response.json();

//     // Redirecting user/customer to Stripe Checkout
//     //   const result: any = await stripe?.redirectToCheckout({
//     //     sessionId: checkoutSession.id,
//     //   });
//     //   if (result.error) {
//     //     alert(result?.error.message);
//     //   }
//   };
//   return (
//     <div className="flex flex-col gap-4 ">
//       <div className="flex gap-2">
//         <p className="text-sm text-[var(--color-text)]">
//           Your order qualifies for FREE Shipping by Choosing this option at
//           checkout. See details....
//         </p>
//       </div>
//       <p className="flex items-center justify-between px-2 font-semibold text-[var(--color-text)]">
//         Total:{" "}
//         <span className="font-bold text-xl">
//           <FormattedPrice amount={totalAmount} />
//         </span>
//       </p>

//       <div className="flex flex-col items-center">
//         <button
//           onClick={handleCheckout}
//           className="w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
//         >
//           Proceed to Buy
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPayment;
