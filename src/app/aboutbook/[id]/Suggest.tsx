"use client";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { Provider } from "react-redux";
import store from "../../store/store";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

interface Product {
  // Define the structure of a product item here
  id: number;
  title: string;
  imageUrl: string;
  code: string;
  description: string;
  agerange: string;
  price: number;
  category: string;
  discountPrice: number;
  createdAt: string;
  amountInStock: string;
  cover: string;
  isDisabled: boolean;
  discount: string;
  isNew: boolean;
  img: string;
  stag: any;
  // ... other properties
}

const Suggest = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book`);
        const data = response.data;
        setProducts(shuffleArray(data)); // Shuffle and set the data after fetching
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs once after the component mounts

  const shuffleArray = (array: Product[]) => {
    let shuffledArray = [...array]; // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };

  return (
    <Provider store={store}>
      <section className="container mx-auto bg-white ">
        <div className="mx-auto my-4 text-center pt-2">
          <h1 className="text-[var(--color-text)] font-bold lucky text-4xl">
            Suggested For You
          </h1>
        </div>
        <div className="mx-auto px-2 flex gap-6 pb-4 overflow-x-auto whitespace-nowrap ">
          {products.map((product, index) => (
            <Product
              key={index}
              product={{
                id: product.id,
                img: product.imageUrl,
                title: product.title,
                category: product.category,
                code: product.code,
                price: product.price,
                // oldprice: product.oldprice,
                description: product.description,
                agerange: product.agerange,
                stag: product.stag,
                isNew: product.isNew,
                // sales: product.sales,
                quantity: 1, // Add the quantity property here
              }}
            />
          ))}
        </div>
      </section>
    </Provider>
  );
};

export default Suggest;

// "use client";
// import React, { useEffect, useState } from "react";
// import Product from "../../components/Product";
// import { Provider } from "react-redux";
// import store from "../../store/store";
// import axios from "axios"; // Import Axios
// import { API_BASE_URL } from "../../utils/api"

// interface Product {
//   // Define the structure of a cart item here
//   id: number;
//   title: string;
//   imageUrl: string;
//   code: string;
//   description: string;
//   agerange: string;
//   price: number;
//   category: string;
//   discountPrice: number;
//   createdAt: string;
//   amountInStock: string;
//   cover: string;
//   isDisabled: boolean;
//   discount: string;
//   isNew: boolean;

//   // ...other properties
// }
// const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await get(`${API_BASE_URL}/book?page&limit`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setProducts(shuffleArray(data)); // Shuffle and set the data
//       } catch (error) {
//         console.error('Failed to fetch books:', error);
//       }
//     };

//     fetchData();
//   }, []); // The empty dependency array ensures this runs once after the component mounts

// const shuffleArray = (array: any[]) => {
//   // Use the Fisher-Yates shuffle algorithm
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const Suggest = () => {
//   const shuffledData = shuffleArray([...data]);

//   return (
//     <Provider store={store}>
//       <section className="container mx-auto bg-white ">
//         <div className="mx-auto my-4 text-center pt-2">
//           <h1 className="text-[var(--color-text)] font-bold lucky text-4xl">
//             Suggested For You
//           </h1>
//         </div>
//         <div className="mx-auto  px-2  flex gap-6 pb-4  overflow-x-auto whitespace-nowrap ">
//           {shuffledData.map((product, index) => (
//             <Product
//               key={index}
//               product={{
//                 id: product.id,
//                 img: product.img,
//                 title: product.title,
//                 category: product.category,
//                 code: product.code,
//                 price: product.price,
//                 oldprice: product.oldprice,
//                 description: product.description,
//                 agerange: product.agerange,
//                 stag: product.stag,
//                 isNew: product.isNew,
//                 sales: product.sales,
//                 quantity: 1, // Add the quantity property here
//               }}
//             />
//           ))}
//         </div>
//       </section>
//     </Provider>
//   );
// };

// export default Suggest;
