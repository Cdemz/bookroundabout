import Image from "next/image";
import React from "react";
import FormattedPrice from "../components/FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, deleteFavorite } from "../store/nextSlice"; // Adjust these action imports based on your Redux setup
import { StoreProduct } from "../type";
import { RiHeartAddLine } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";

interface WishlistProps {
  item: StoreProduct;
}

const WishlistProduct = ({ item }: WishlistProps) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addToCart(item)); // Adjust this action dispatch based on your Redux setup
  };

  const handleRemoveFromWishlist = () => {
    dispatch(deleteFavorite(item.id)); // Adjust this action dispatch based on your Redux setup
  };

  return (
    <section>
      <div className="bg-white rounded-lg flex items-center gap-2 md:gap-4 py-4">
        <Image
          className="object-cover"
          width={150}
          height={150}
          src={item.img}
          alt="productImage"
          priority={true}
        />
        <div className="flex flex-col gap-1 lato">
          <p className="text-lg font-bold text-[var(--color-text)]">
            {item.title}
          </p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-amazon_blue">
              <FormattedPrice amount={item.price} />
            </span>
          </p>
          <div className="flex items-center gap-2 md:gap-6">
            <button
              onClick={handleAddToWishlist}
              className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer text-black"
            >
              <RiHeartAddLine />
            </button>
            <button
              onClick={handleRemoveFromWishlist}
              className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer text-black"
            >
              <AiOutlineMinusCircle />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistProduct;

// import Image from "next/image";
// import React from "react";
// import FormattedPrice from "../components/FormattedPrice";
// import { useDispatch } from "react-redux";
// import { addToCart, deleteFavorite } from "../store/nextSlice";
// import { toast } from "react-hot-toast";
// import { StoreProduct } from "../type";

// interface Item {
//   id: number;
//   category: string;
//   description: string;
//   img: string;
//   isNew: boolean;
//   oldprice: number;
//   price: number;
//   title: string;
// }

// interface WishlistProps {
//   item: StoreProduct;
// }

// const Wishlist = ({ item }: WishlistProps) => {
//   const dispatch = useDispatch();

//   const addItemsToCart = () => {
//     // Dispatch the addToCart action with the product
//     dispatch(addToCart({ ...item, quantity: 1 }));

//     // Show a toast or perform other actions as needed
//     toast(`${item.title} added to cart`);
//   };

//   const handleAddToCart = () => {
//     const productToAdd = {
//       id: item.id,
//       category: item.category,
//       description: item.description,
//       image: item.img,
//       isNew: item.isNew,
//       oldPrice: item.oldprice,
//       price: item.price,
//       title: item.title,
//       quantity: 1, // You might want to set a default quantity here.
//     };

//     dispatch(addToCart(productToAdd));
//     dispatch(deleteFavorite(item.id));
//   };

//   return (
//     <section>
//       <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
//         <div className="">
//           <Image
//             className="object-cover"
//             width={150}
//             height={150}
//             src={item.img}
//             alt="productImage"
//             priority={true}
//           />
//         </div>

//         <div className="flex items-center px-2 gap-4">
//           <div className="flex flex-col gap-1">
//             <p className="text-lg font-semibold text-[var(--color-primary)]">
//               {item.title}
//             </p>
//             <p className="text-sm text-gray-500">{item.description}</p>
//             <p className="text-sm text-gray-600">
//               Unit price:{" "}
//               <span className="font-semibold text-[var(--color-primary)]">
//                 <FormattedPrice amount={item.price} />
//               </span>
//             </p>
//             <button
//               onClick={addItemsToCart}
//               className="w-44 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
//             >
//               Add to Cart
//             </button>
//           </div>
//           <div className="text-lg font-semibold text-[var(--color-primary)]">
//             <FormattedPrice amount={item.price} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Wishlist;
