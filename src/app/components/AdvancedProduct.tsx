"use client";
import React, { useState } from "react";
import data from "../BooksData.json";
import { Menu, Transition } from "@headlessui/react";
import { FaFilter } from "react-icons/fa";
import MenuItem from "../components/MenuItem";
import { Fragment } from "react";
import Product from "./Product";
import { Provider } from "react-redux";
import store from "../store/store";
import Filter from "./Filter";

interface product {
  // Define the structure of a cart item here
  id: number;
  title: string;
  // ...other properties
}

const AdvancedProduct = () => {
  const [activeCategory, setActiveCategory] = useState(" ");
  const [activeGenre, setActiveGenre] = useState(" ");
  const [filteredData, setFilteredData] = useState(data);

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
    <Provider store={store}>
      <section className="container mx-auto bg-white">
        <div className="flex justify-between items-center mt-4 px-4 pt-4">
          <h1 className="font-bold text-2xl  text-black lucky ">
            Best Sellers
          </h1>

          <hr className="w-[60%]e text-black " />
          {/* start */}

          {/* <Menu as="div" className="relative inline-block text-left  ">
            <div>
              <Menu.Button className="bg-[var(--color-primary)] text-white py-2   px-8 rounded-full flex items-center gap-2">
                <FaFilter />
                Fiter
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none absolute px-4 md:right-8 right-6 lato font-bold text-lg whitespace-nowrap">
                <div className="py-1">{fictionLinks}</div>
              </Menu.Items>
            </Transition>
          </Menu> */}

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
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2">
          {filteredData.map((product, index) => (
            <Product
              key={index}
              product={{
                id: product.id,
                img: product.img,
                title: product.title,
                category: product.category,
                code: product.code,
                price: product.price,
                oldprice: product.oldprice,
                description: product.description,
                agerange: product.agerange,
                quantity: 1, // Add the quantity property here
              }}
            />
          ))}
        </div>
      </section>
    </Provider>
  );
};

export default AdvancedProduct;

// "use client";
// import React from "react";
// import { RecoilRoot } from "recoil";
// import data from "../BooksData.json";
// import { Menu, Transition } from "@headlessui/react";

// import { FaFilter } from "react-icons/fa";
// import MenuItem from "../components/MenuItem";
// import { Fragment } from "react";

// import { Toaster } from "react-hot-toast";
// import Product from "./Product";

// const AdvancedProduct = () => {
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
//     <RecoilRoot>
//       <section className="container mx-auto bg-white">
//         <div className="flex justify-between items-center mt-4 px-4 pt-4">
//           <h1 className="font-bold text-2xl  text-black lucky ">
//             Best Sellers
//           </h1>

//           <hr className="w-[60%]e text-black " />
//           {/* start */}

//           <Menu as="div" className="relative inline-block text-left  ">
//             <div>
//               <Menu.Button className="bg-[var(--color-primary)] text-white py-2   px-8 rounded-full flex items-center gap-2">
//                 <FaFilter />
//                 Fiter
//               </Menu.Button>
//             </div>

//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className=" mt-2  origin-top-right rounded-md bg-white shadow-lg  focus:outline-none absolute px-4 md:right-8 right-6 lato font-bold text-lg whitespace-nowrap">
//                 <div className="py-1">{fictionLinks}</div>
//               </Menu.Items>
//             </Transition>
//           </Menu>

//           {/* end */}
//         </div>
//         <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-4 pt-2">
//           {data.map((product, index) => (
//             <Product key={index} product={product} />
//           ))}
//         </div>
//       </section>
//     </RecoilRoot>
//   );
// };

// export default AdvancedProduct;
