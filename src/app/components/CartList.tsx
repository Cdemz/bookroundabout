// components/CartList.tsx
import React from "react";

interface CartItemProps {
  data: {
    id: number; // Use id as the key
    title: string;
    img: string;
    imageUrl: string;
    quantity: number;
    price: number;
    amountInStock: number;

    // Add other properties if necessary
  };
}

const CartList: React.FC<CartItemProps> = ({ data }) => {
  const { id, title, img, quantity, price, imageUrl, amountInStock } = data;

  return (
    <div key={id}>
      {" "}
      {/* Use the id as the key */}
      <div className="bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between text-black">
        <img className="h-[100px]" src={imageUrl} alt="" />

        <div>
          <div className="font-bold lato">{title}</div>
          <div>Qty: {quantity}</div>
        </div>

        <div className="lato">
          ₦
          {Number(price * quantity).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
};

export default CartList;
