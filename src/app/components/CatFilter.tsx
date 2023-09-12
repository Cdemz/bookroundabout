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
        : data.filter((book) => book.category.includes(activeCategory));

    // Filter by genre
    const genreFiltered =
      activeGenre === " "
        ? categoryFiltered
        : categoryFiltered.filter((book) => book.genre.includes(activeGenre));

    setFiltered(genreFiltered);
  }, [activeCategory, activeGenre]);

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
    </div>
  );
}

export default Filter;
