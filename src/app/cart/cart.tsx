import React from "react";
import { StateProps, StoreProduct } from "../type";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import ResetCart from "../components/ResetCart";
import Link from "next/link";
import CartPayment from "../components/CartPayment";
import Image from "next/image";
import { RootState } from "../store/store"; // Import RootState from your store
// import ScartProduct from "../components/ScartProduct";

const CartPage = () => {
  const { productData } = useSelector((state: RootState) => state.next); // Update the selector

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:flex gap-10 py-4">
      {productData.length > 0 ? (
        <>
          <div className="  col-span-4 p-4 rounded-lg md:w-[70%]">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1 text-center">
              <p className="text-2xl font-semibold text-[var(--color-primary)] lato">
                My Cart
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2 ">
              {productData.map((item: StoreProduct) => (
                <div key={item.id}>
                  {/* <ScartProduct item={item} /> */}
                  <CartProduct item={item} />
                </div>
              ))}
              <ResetCart />
            </div>
          </div>

          <div className="bg-white shadow-lg h-64 md:h-[32rem] col-span-1 p-4 rounded-lg flex items-center justify-center">
            <CartPayment />
          </div>
        </>
      ) : (
        <div className="bg-white h-[70vh] col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg lato">
          <Image
            src="/empty cart.png"
            alt=""
            width={300}
            height={300}
            priority={true}
            className="h-[26vh] w-[70vw] lg:h-[55vh]"
          />
          <h1 className="text-lg text-[var(--color-text)] font-bold">
            Your cart is empty!
          </h1>
          <p className="text-[var(--color-primary-b)] text-center px-4">
            Looks like you have not added anything to your cart. Go ahead &
            explore top categories.
          </p>
          <Link href="/">
            <button className="w-52 h-10 bg-[var(--color-primary)] rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black text-white mt-4">
              Shop our products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

// import React from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../store"; // Updated import statement
// import { addToCart } from "../actions/actionTypes";
// import CartList from "../components/CartList";

// interface CartProps {
//   // Define the type for cartItem
//   cartItem: CartItem[];
// }

// interface CartItem {
//   id: number;
//   title: string;
//   img: string;
//   quantity: number;
//   price: number;
// }

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   img: string;
//   quantity: number;
// }

// const Cart: React.FC = () => {
//   const cartItems: CartItem[] = useSelector(
//     (state: RootState) => state.cart.items
//   );

//   const dispatch = useDispatch();

//   const totalPrice = () => {
//     let total = 0;
//     cartItems.forEach((item) => {
//       if (item.price && item.quantity) {
//         total += item.price * item.quantity;
//       } else {
//         console.error("Invalid item:", item);
//       }
//     });
//     return total;
//   };

//   const createCheckoutSession = async () => {
//     try {
//       const response = await axios.post("api/checkout_sessions", { cartItems });
//       console.log("Response:", response);

//       if (response.data && response.data.sessionURL) {
//         window.location.href = response.data.sessionURL;
//       } else {
//         console.error("Invalid response data:", response);
//         // Display an error message to the user
//       }
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       // Handle the error and display an error message to the user
//     }
//   };

//   // Function to dispatch the addToCart action
//   const addToCartHandler = (product: Product) => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <div>
//       <div className="container mx-auto p-8">
//         {cartItems.length <= 0 ? (
//           <h1 className="text-center text-4xl mt-32">Your Cart Is Empty</h1>
//         ) : (
//           cartItems.map((item: CartItem) => (
//             <CartList key={item.id} data={item} />
//           ))
//         )}

//         {cartItems.length > 0 && (
//           <div className="max-w-[800px] mx-auto mt-4 text-black">
//             <h2 className="text-right text-lg font-bold ">
//               Total: ₦
//               {Number(totalPrice()).toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </h2>

//             <button
//               className="text-right bg-[var(--color-primary)] text-white py-4 px-12 mt-4 block mx-auto hover:bg-[var(--color-primary-v)]"
//               onClick={createCheckoutSession}
//             >
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
