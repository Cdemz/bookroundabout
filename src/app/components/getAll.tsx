import { API_BASE_URL } from "../utils/api";

interface Book {
  id: number;
  img: string;
  title: string;
  category?: string;
  code?: string;
  price: number;
  oldprice?: number;
  description: string;
  agerange?: string;
  quantity: number;
  sales?: boolean;
  isNew?: boolean;
  stag: string;
  // Include the quantity property
}

export async function getAllBookCategories() {
  const response = await fetch(`${API_BASE_URL}/book`);

  if (!response.ok) throw new Error("Failed to fetch books");

  const books: Book[] = await response.json();

  const categories = new Set<string>();
  books.forEach((book: Book) => {
    if (book.category) {
      categories.add(book.category);
    }
  });

  return Array.from(categories);
}
