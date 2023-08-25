import Image from "next/image";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "/shecow.jpg",
    title: "Game Lill",
    rows: 2,
    // cols: 2,
    category: "Children Books",
    rating: <AiFillStar />,
    code: "WHL201",
    agerange: "5-12",
    price: "$25.33",
  },
  {
    img: "/book1.jpg",
    title: "Burger",
    category: "Non-Fiction",
    rating: <AiFillStar />,
    code: "WHL21",
    agerange: "18 Above",
    price: "$30.00",
  },
  {
    img: "/shecow.jpg",
    title: "Camera",
    category: "Fiction",
    rating: <AiFillStar />,
    code: "WHL213",
    agerange: "18 Above",
    price: "$5000.00",
  },
  {
    img: "/book2.jpeg",
    title: "Coffee",
    category: "Romance",
    // cols: 2,
    rating: <AiFillStar />,
    code: "WHL21",
    agerange: "18 Above",
    price: "$30.00",
  },
  {
    img: "/book1.jpg",
    title: "Hats",
    category: "Classic",
    rating: <AiFillStar />,
    code: "WHL21",
    agerange: "18 Above",
    price: "$30.00",
  },
];

const BestSeller = () => {
  return (
    <main className="bg-white px-4 py-6 mx-2">
      <div className="">
        <div className="bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2 md:max-w-xs md:mx-auto">
          <div className=" flex gap-2 items-center ml-2">
            <BiSearchAlt2 />
            <input
              placeholder="Type here.."
              id="input"
              className="input bg-transparent focus:outline-none "
              name="text"
              type="text"
            />
          </div>
          <div className="">
            <button className="bg-[var(--color-primary-v)] text-white py-2 px-8 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* search bar */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl mb-5 text-[var(--color-primary)] lucky">
          Best Sellers
        </h1>

        <hr className="   w-[60%]e text-black " />

        <button className="bg-[var(--color-primary)] text-white py-2 px-4 md:px-8 rounded-full">
          Veiw by section
        </button>
      </div>

      <section>
        <div className="mx-auto  px-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
          {itemData.map((item) => (
            <div
              key={item.img}
              //   cols={item.cols || 1}
              //   rows={item.rows || 1}
            >
              <div className=" flex flex-col gap-2  ">
                <Image
                  // culprit
                  {...srcset(item.img, 12)}
                  width={300}
                  height={300}
                  alt={item.title}
                  loading="lazy"
                  className=" w-[120px] h-[170px] rounded-xl "
                />
                <div className="text-black">
                  <h1 className="text-amber-300">{item.rating}</h1>
                  <h1 className="font-extrabold">{item.title}</h1>
                  <p>{item.code}</p>
                  <p>{item.agerange}</p>
                  <p className="font-extrabold">{item.price}</p>
                  <button className="bg-[var(--color-primary-v)] text-white px-2 py-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BestSeller;
