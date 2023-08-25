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
    cols: 2,
    category: "Children Books",
    rating: <AiFillStar />,
    code: "WHL201",
    agerange: "5-12",
    price: "$25.33",
  },
  {
    img: "/shecow.jpg",
    title: "Burger",
    category: "Non-Fiction",
  },
  {
    img: "/shecow.jpg",
    title: "Camera",
    category: "Fiction",
  },
  {
    img: "/shecow.jpg",
    title: "Coffee",
    category: "Romance",
    cols: 2,
  },
  {
    img: "/shecow.jpg",
    title: "Hats",
    category: "Classic",
    cols: 2,
  },
];

const BestSeller = () => {
  return (
    <main className="bg-white px-4 py-6 mx-2">
      <div className="">
        <div className="bg-[var(--color-primary-b)] flex  rounded-full justify-between items-center mt-2">
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
        <div className="mx-auto  px-2 h-[60%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 md:h-[60vh] gap-6">
          {itemData.map((item) => (
            <div
              key={item.img}
              //   cols={item.cols || 1}
              //   rows={item.rows || 1}
            >
              <div className=" flex gap-2 justify-between">
                <Image
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  width={300}
                  height={300}
                  alt={item.title}
                  loading="lazy"
                  className=" w-[72px] rounded-xl "
                />
                <div className="text-black">
                  <h1 className="text-amber-300">{item.rating}</h1>
                  <h1 className="font-extrabold">{item.title}</h1>
                  <p>{item.code}</p>
                  <p>{item.agerange}</p>
                  <p className="font-extrabold">{item.price}</p>
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
