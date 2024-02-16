"use client";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { API_BASE_URL } from "../utils/api";

interface Book {
  id: number;
  title: string;
  code: string;
  category: string;
  img: string;
  price: number;
  imageUrl: string;
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(""); // State to hold input value
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the submitted search term
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false); // State to track if search was attempted
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const fetchBooks = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/book?query=${searchTerm}&page=${page}&limit=5`
          );
          setBooks((prevBooks) => [
            ...new Set([...prevBooks, ...response.data]),
          ]);
          setHasMore(response.data.length === 10);
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, [page, searchTerm]);

  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Update searchTerm to trigger search
    setPage(1); // Reset to first page for new searches
    setBooks([]); // Clear previous results
    setSearchAttempted(true); // Indicate that a search was attempted
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="searchInput_Container bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 max-w-[70vw] mx-auto h-8 text-black"
      >
        <input
          type="text"
          className="text-white bg-transparent focus:outline-none ml-4 outline-none border-none "
          placeholder="Search for books..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="bg-[var(--color-primary)] flex items-center text-white rounded-full ml-auto mr-4  px-3 py-5 h-8">
          <button type="submit">
            <IoIosSearch />
          </button>
        </div>
      </form>
      {books.length > 0 ? (
        books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book.id} className="px-4 py-4">
                <Link href={`/AboutBooks?name=${book.id}`}>
                  <div className="template flex text-black" key={book.id}>
                    <div className=" h-[120px] w-[100px] ">
                      <img
                        src={book.imageUrl}
                        alt=""
                        className="   object-fit h-[80px]"
                      />
                    </div>
                    <div className="lato text-black">
                      <h2 className="text-black">{book.code}</h2>
                      <h3 className="">{book.title}</h3>
                      <p className="text-black font-extrabold whitespace-nowrap">
                        ₦
                        {book.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          } else {
            return (
              <div key={book.id}>
                <Link href={`/AboutBooks?name=${book.id}`}>
                  <div className="template flex px-4 py-4" key={book.id}>
                    <div className=" h-[120px] w-[100px]">
                      <img
                        src={book.imageUrl}
                        alt=""
                        className="   object-fit h-[80px]"
                      />
                    </div>
                    <div className="lato">
                      <h2 className="text-black">{book.code}</h2>
                      <h3 className="text-black">{book.title}</h3>
                      <p className="text-black font-extrabold whitespace-nowrap">
                        ₦
                        {book.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        })
      ) : searchAttempted && !loading ? (
        <p className="text-black">No books found</p>
      ) : null}
      {loading && (
        <div className="loading-animation px-10 py-[15rem] flex flex-col items-center justify-center h-[10rem]">
          <div id="wifi-loader">
            <svg className="circle-outer" viewBox="0 0 86 86">
              <circle className="back" cx="43" cy="43" r="40"></circle>
              <circle className="front" cx="43" cy="43" r="40"></circle>
              <circle className="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg className="circle-middle" viewBox="0 0 60 60">
              <circle className="back" cx="30" cy="30" r="27"></circle>
              <circle className="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg className="circle-inner" viewBox="0 0 34 34">
              <circle className="back" cx="17" cy="17" r="14"></circle>
              <circle className="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div className="text font-bold" data-text="Loading"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
