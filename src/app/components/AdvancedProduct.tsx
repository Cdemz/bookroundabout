"use client";
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import MenuItem from "../components/MenuItem";
import { Fragment } from "react";
import Product from "./Product";
import Filter from "./Filter";
import axios from "axios"; // Import Axios
import { API_BASE_URL } from "../utils/api";
import SearchBar from "./SearchBar";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface Product {
  // Define the structure of a cart item here
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

  // ...other properties
}

[
  {
    id: 1,
    title: "The fuckery of death",
    code: "whl57",
    description: null,
    cover: null,
    amountInStock: "2",
    discountPrice: null,
    price: "8000.00",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664280284718-56e4309bf83f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    createdAt: "2023-09-24T21:19:01.694Z",
    category: "fiction",
    ageRange: "0-5",
    genres: ["thriller", "action", "crime"],
    discount: null,
    updatedAt: "2023-09-24T21:19:01.694Z",
  },
];
const AdvancedProduct = () => {
  const [activeCategory, setActiveCategory] = useState(" ");
  const [activeGenre, setActiveGenre] = useState(" ");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ...

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/book?page&limit`)
      .then((response) => {
        // Assuming the API response contains an array of book data
        setFilteredData(response.data);
        setData(response.data);

        // Initialize currentDate with the current date and time
        const currentDate = new Date();

        // Update the "isNew" property in the product data
        const updatedData = response.data.map((product: Product) => {
          // Calculate the difference between the createdAt date and the current date in milliseconds
          const timeDifferenceInMilliseconds: number =
            currentDate.getTime() - new Date(product.createdAt).getTime();

          // Calculate the number of days as a number
          const daysDifference: number = Math.ceil(
            timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
          );

          // Check if the book is "isNew" (less than 7 days old)
          const isNew: boolean = daysDifference < 7;

          // Return the updated product data with the "isNew" property
          return {
            ...product,
            isNew,
          };
        });

        // Set the updated product data with "isNew" property
        setFilteredData(updatedData);

        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // ...

  const fictionLinks = [
    "Ficition",
    "Children Books",
    "Non-Ficition",
    "Classics",
    "Romance",
    "Crime & Thriller",
    "Fantasy & Horror",
    "Poetry & Drama",
  ].map((linkText, index) => {
    return <MenuItem key={index} linkText={linkText} />;
  });
  return (
    <div className=" overflow-hidden ">
      <main className="container mx-auto bg-white ">
        <div className="mt-4 pt-4">
          {" "}
          <SearchBar />
        </div>
        <div className="flex justify-between items-center mt-4 px-4 pt-4 overflow-hidden">
          <h1 className="font-bold text-2xl  text-black lucky ">
            Best Sellers
          </h1>

          <hr className="w-[60%]e text-black " />
          {/* start */}

          <Filter
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            setActiveGenre={setActiveGenre}
            activeGenre={activeGenre}
            setFiltered={setFilteredData}
            data={data}
          />

          {/* end */}
        </div>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2 overflow-hidden">
          {filteredData.map((product, index) => (
            <Product
              key={index}
              product={{
                id: product.id,
                img: product.imageUrl,
                title: product.title,
                category: product.category,
                code: product.code,
                price: product.price,
                oldprice: product.discountPrice,
                description: product.description,
                agerange: product.agerange,
                stag: "In Stock",
                isNew: product.isNew,
                // sales: product.sales,
                quantity: 1, // Add the quantity property here
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdvancedProduct;

// "use client";
// import React, { useState } from "react";
// import data from "../BooksData.json";
// import { FaFilter } from "react-icons/fa";
// import MenuItem from "../components/MenuItem";
// import { Fragment } from "react";
// import Product from "./Product";
// import Filter from "./Filter";

// interface product {
//   // Define the structure of a cart item here
//   id: number;
//   title: string;
//   // ...other properties
// }

// const AdvancedProduct = () => {
//   const [activeCategory, setActiveCategory] = useState(" ");
//   const [activeGenre, setActiveGenre] = useState(" ");
//   const [filteredData, setFilteredData] = useState(data);

//   const fictionLinks = [
//     "Ficition",
//     "Children Books",
//     "Non-Ficition",
//     "Classics",
//     "Romance",
//     "Crime & Thriller",
//     "Fantasy & Horror",
//     "Poetry & Drama",
//   ].map((linkText, index) => {
//     return <MenuItem key={index} linkText={linkText} />;
//   });
//   return (
//     <div className=" overflow-hidden ">
//       <main className="container mx-auto bg-white ">
//         <div className="flex justify-between items-center mt-4 px-4 pt-4 overflow-hidden">
//           <h1 className="font-bold text-2xl  text-black lucky ">
//             Best Sellers
//           </h1>

//           <hr className="w-[60%]e text-black " />
//           {/* start */}

//           <Filter
//             setActiveCategory={setActiveCategory}
//             activeCategory={activeCategory}
//             setActiveGenre={setActiveGenre}
//             activeGenre={activeGenre}
//             setFiltered={setFilteredData}
//             data={data}
//           />

//           {/* end */}
//         </div>
//         <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2 overflow-hidden">
//           {filteredData.map((product, index) => (
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
//                 stag: "In Stock",
//                 isNew: product.isNew,
//                 sales: product.sales,
//                 quantity: 1, // Add the quantity property here
//               }}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdvancedProduct;
