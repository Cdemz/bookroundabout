"use client";
import { useRouter } from "next/navigation";
import Data from "../../BooksData.json";
type Props = {
  params: {
    id: string;
    title: string;
  };
};

function getBookById(id: number) {
  // Find the book with the matching id
  const book = Data.find((item) => item.id === id);

  // Return the book if found, or null if not found
  return book || null;
}

export default function Home({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  // Ensure id is a number
  const bookId = typeof id === "string" ? parseInt(id, 10) : null;

  // Call the function to get book information by ID
  const book = bookId !== null ? getBookById(bookId) : null;
  return (
    <div className="text-black">
      {book ? (
        <>
          <h1 className="text-black">Book Details</h1>
          <p>Title: {book.title}</p>
          <p>Author: {book.price}</p>
          <p>Description: {book.description}</p>
          {/* Add more properties as needed */}
        </>
      ) : (
        <p className="text-black">Book not found</p>
      )}
    </div>
  );
}
