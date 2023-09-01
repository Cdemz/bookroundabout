import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import SearchBar from "./SearchBar";
const Herosection = () => {
  return (
    <>
      <div className=" flex flex-col md:flex-row   bg-white w-[96%] mx-auto px-4 py-4 md:px-8 md:justify-between ">
        <div className=" text-black montserrat md:w-[45%] order-2 md:order-1 md:mt-8">
          <div className="bg-[var(--color-primary-b)] rounded-lg px-2 py-1 font-semibold flex justify-center w-[70%] ">
            <p className="text-[10px] text-[var(--color-text)] md:text-[9px] lg:text-[10px]">
              Journey Through Pages, Discover New Worlds
            </p>
          </div>
          <h1 className="text-[var(--color-primary-v)] font-extrabold lg:text-6xl mt-2 text-5xl">
            Reading <span className="text-[var(--color-text)]   "> Is </span>{" "}
            <span className="block text-[var(--color-text)]   ">
              Fascinating
            </span>{" "}
          </h1>
          <h3 className="text-sm mt-4">
            Welcome to our Books Roundabout, where pages come to life and
            stories Explore our carefully curated collection of books, spanning
            genres from classics to contemporary bestsellers.{" "}
          </h3>

          <div className=" ">
            <SearchBar />
          </div>
        </div>
        {/* photo div */}
        {/* <div className="flex items-center justify-center order-1 md:order-2 md:w-full     ">
          <Image
            src="/hero-img.png"
            alt="hero-img"
            width={300}
            height={300}
            className="w-full h-[80%] object-cover lg:h-[100%]   "
          />
        </div> */}
      </div>
    </>
  );
};

export default Herosection;
