import React, { useEffect } from "react";

interface FilterProps {
  setActiveCategory: (category: string) => void;
  activeCategory: string;
  setActiveGenre: (genre: string) => void;
  activeGenre: string;
  setFiltered: (filteredData: any[]) => void; // Change 'any[]' to the actual type of your data
  data: any[]; // Change 'any[]' to the actual type of your data
}

function Filter({
  setActiveCategory,
  activeCategory,
  setActiveGenre,
  activeGenre,
  setFiltered,
  data,
}: FilterProps) {
  useEffect(() => {
    // Filter by category
    const categoryFiltered =
      activeCategory === " "
        ? data
        : data.filter(
            (book) =>
              Array.isArray(book.category) &&
              book.category.includes(activeCategory)
          );

    // Filter by genre
    const genreFiltered =
      activeGenre === " "
        ? categoryFiltered
        : categoryFiltered.filter(
            (book) =>
              Array.isArray(book.genre) && book.genre.includes(activeGenre)
          );

    setFiltered(genreFiltered);
  }, [activeCategory, activeGenre, data]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveGenre(e.target.value);
  };

  return (
    <div className="filter">
      <select
        value={activeCategory}
        onChange={handleCategoryChange}
        className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-full mr-2"
      >
        <option value=" ">All Categories</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Education">Education</option>
        <option value="Children Books">Children Books</option>
      </select>
      {/* Uncomment and use the genre dropdown if needed */}
      {/* <select
        value={activeGenre}
        onChange={handleGenreChange}
        className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-full"
      >
        <option value=" ">All Genres</option>
        <option value="Mystery">Mystery</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Adventure">Adventure</option>
      </select> */}
    </div>
  );
}

export default Filter;
