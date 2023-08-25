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
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        {searchTerm !== "" && (
          <div className="template_Container">
            {filteredData.length > 0 ? (
              filteredData.map((val) => (
                <div className="template" key={val.id}>
                  <img src={val.img} alt="" />
                  <h3>{val.title}</h3>
                  <p className="price">${val.price}</p>
                </div>
              ))
            ) : (
              <div className="notAvailable">Not Available</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
