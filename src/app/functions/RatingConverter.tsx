import { BookData } from "../components/BestSeller";
import Data from "../BooksData.json";

export function starRatings(ratingData: BookData[]) {
  for (const [key, item] of Object.entries(ratingData)) {
    let ratings: string[] | void = [];
    let { rating } = item; // Assuming 'rating' is the property in BookData containing the rating value

    if (!rating || isNaN(Number(rating))) {
      ratings = undefined;
    }
    rating = rating as number;
    if (rating < 0) {
      ratings = ["empty", "empty", "empty", "empty", "empty"];
    } else if (rating > 5) {
      ratings = ["full", "full", "full", "full", "full"];
    } else {
      const stars = [];

      for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          stars.push("full");
        } else {
          const remainder = rating + 1 - i;
          if (remainder < 0.21) {
            stars.push("empty");
          } else if (remainder < 0.8) {
            stars.push("half");
          } else {
            stars.push("full");
          }
        }
      }
      ratings = stars;
    }

    ratingData[Number(key)].rating = ratings;
  }
}
starRatings(Data);
