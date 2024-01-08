import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import { BookData } from "../Category/[category]/Category";

// Define the function in a separate file or at a higher level where it can be imported
export async function fetchBooksByCategory(
  category: string
): Promise<BookData[]> {
  try {
    let endpoint = `${API_BASE_URL}/book?category=${encodeURIComponent(
      category
    )}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching books", error);
    return []; // Return an empty array or handle the error as appropriate
  }
}

// Then, import and use this function in your Home component and getStaticProps
