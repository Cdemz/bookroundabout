"use client";
import React, { useState } from "react";
import data from "../BooksData.json";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((val) => {
    if (searchTerm === "") {
      return false; // Return false to indicate no filtering when search term is empty
    }
    const searchTermLower = searchTerm.toLowerCase();
    return (
      val.title.toLowerCase().includes(searchTermLower) ||
      val.code.toLowerCase().includes(searchTermLower) ||
      val.category.toLowerCase().includes(searchTermLower)
    );
  });
  return (
    <>
      <div className="templateContainer">
        <div className="searchInput_Container bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 max-w-[70vw] mx-auto">
          <input
            id="searchInput"
            type="text"
            className="bg-transparent focus:outline-none ml-4"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        {searchTerm !== "" && (
          <div className="template_Container mt-4 flex flex-col gap-3">
            {filteredData.length > 0 ? (
              filteredData.map((val) => (
                <div className="template flex" key={val.id}>
                  <div className=" h-[120px] w-[100px]">
                    <img src={val.img} alt="" className="object-contain" />
                  </div>
                  <div className="lato">
                    <h2>{val.code}</h2>
                    <h3>{val.title}</h3>
                    <p className="price  font-bold">{val.price}</p>
                  </div>
                </div>
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
}

export default SearchBar;
