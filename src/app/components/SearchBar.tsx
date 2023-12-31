"use client";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  code: string;
  category: string;
  img: string;
  price: number;
  imageUrl: string;
  // ... other properties ...
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]); // Updated state with type

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredData = books.filter((book) => {
    if (searchTerm === "") {
      return false;
    }
    const searchTermLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchTermLower) ||
      book.code.toLowerCase().includes(searchTermLower) ||
      book.category.toLowerCase().includes(searchTermLower)
    );
  });
  return (
    <>
      <div className="">
        <div className="searchInput_Container bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 max-w-[70vw] mx-auto h-8">
          <input
            id="searchInput"
            type="text"
            className="bg-transparent focus:outline-none ml-4 outline-none border-none text-white"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        {searchTerm !== "" && (
          <div className="template_Container mt-4 flex flex-col gap-3 px-4 text-black">
            {filteredData.length > 0 ? (
              filteredData.map((val) => (
                <Link href={`/aboutbook/${val.id}`}>
                  <div className="template flex" key={val.id}>
                    <div className=" h-[120px] w-[100px]">
                      <img
                        src={val.imageUrl}
                        alt=""
                        className="   object-fit h-[80px]"
                      />
                    </div>
                    <div className="lato">
                      <h2>{val.code}</h2>
                      <h3>{val.title}</h3>
                      <p className="text-black font-extrabold whitespace-nowrap">
                        ₦
                        {val.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="notAvailable lato font-semibold">
                No product found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

// "use client";
// import React, { useState } from "react";
// import data from "../BooksData.json";

// function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const filteredData = data.filter((val) => {
//     if (searchTerm === "") {
//       return false; // Return false to indicate no filtering when search term is empty
//     }
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       val.title.toLowerCase().includes(searchTermLower) ||
//       val.code.toLowerCase().includes(searchTermLower) ||
//       val.category.toLowerCase().includes(searchTermLower)
//     );
//   });
//   return (
//     <>
//       <div className="">
//         <div className="searchInput_Container bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 max-w-[70vw] mx-auto h-8">
//           <input
//             id="searchInput"
//             type="text"
//             className="bg-transparent focus:outline-none ml-4 outline-none border-none text-white"
//             placeholder="Search here..."
//             onChange={(event) => {
//               setSearchTerm(event.target.value);
//             }}
//           />
//         </div>
//         {searchTerm !== "" && (
//           <div className="template_Container mt-4 flex flex-col gap-3 px-4">
//             {filteredData.length > 0 ? (
//               filteredData.map((val) => (
//                 <div className="template flex" key={val.id}>
//                   <div className=" h-[120px] w-[100px]">
//                     <img src={val.img} alt="" className="   object-cover" />
//                   </div>
//                   <div className="lato">
//                     <h2>{val.code}</h2>
//                     <h3>{val.title}</h3>
//                     <p className="text-black font-extrabold whitespace-nowrap">
//                       ₦
//                       {val.price.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="notAvailable lato font-semibold">
//                 No product found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default SearchBar;
