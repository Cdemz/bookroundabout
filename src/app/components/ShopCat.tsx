import React from "react";
import ShopCatalogue from "./ShopCatalogue";
import { useParams } from "react-router-dom";
interface RouteParams {
  id: string;
}

const ShopCat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="p-4">
      <div className="text-[var(--color-text)] mx-auto flex flex-col items-center justify-center text-center">
        <div className="h-[6px] w-[40px] bg-[var(--color-primary-v)] rounded-full my-3"></div>
        <h3 className="montserrat font-extrabold text-xl mb-2">
          Shop By Category
        </h3>
        <p>
          Explore a plethora of shopping categories, a simplified book-buying
          experience.
        </p>
      </div>
      <div className="mt-4">
        <ShopCatalogue
          params={{ id: id || "", category: "yourCategoryValue" }}
        />
      </div>
    </main>
  );
};

export default ShopCat;
