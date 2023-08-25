import React from "react";
import ShopCatalogue from "./ShopCatalogue";

const ShopCat = () => {
  return (
    <main className="p-4">
      <div className="text-[var(--color-text)] mx-auto flex flex-col items-center justify-center text-center">
        <div className="h-[6px] w-[40px] bg-[var(--color-primary-v)] rounded-full my-3"></div>
        <h3 className="montserrat font-extrabold text-xl mb-2">
          Shop By Category
        </h3>
        <p>
          Explore a plethora of shopping categories,a simplified book-buying
          experience.
        </p>
      </div>
      <div className="mt-4">
        <ShopCatalogue />
      </div>
    </main>
  );
};

export default ShopCat;
