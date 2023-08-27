// components/CartList.tsx
import React from "react";

interface CartItemProps {
  data: {
    id: number; // Use id as the key
    title: string;
    img: string;
    quantity: number;
    price: number;
    category: string;

    // Add other properties if necessary
  };
}

const CartList: React.FC<CartItemProps> = ({ data }) => {
  const { id, title, img, quantity, price } = data;

  return (
    <div key={id}>
      {" "}
      {/* Use the id as the key */}
      <div className="bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between text-black">
        <img className="h-[100px]" src={img} alt="" />

        <div>
          <div className="font-bold text-2xl">{title}</div>
          <div>Qty: {quantity}</div>
        </div>

        <div className="text-3xl font-bold">${price * quantity}</div>
      </div>
    </div>
  );
};

export default CartList;
