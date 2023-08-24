import Image from "next/image";

const Herosection = () => {
  return (
    <div className="flex bg-white w-[96%] mx-auto h-[70vh] ">
      <div className=" text-black assistant w-[45%]">
        <div className="bg-[var(--color-primary-b)] rounded-lg px-2 font-semibold  ">
          <p>Journey Through Pages, Discover New Worlds</p>
        </div>
        <h1 className="text-[var(--color-primary-v)] font-extrabold text-4xl">
          Reading Is{" "}
          <span className="block text-[var(--color-primary-a)] text-white ">
            Fascinating
          </span>{" "}
        </h1>
        <h3>
          Welcome to our literary haven, where pages come to life and stories
          ignite your imagination. Dive into a world of endless possibilities as
          you explore our carefully curated collection of books, spanning genres
          from classics to contemporary bestsellers.{" "}
        </h3>

        <div className="bg-[var(--color-primary-b)] w-[30vw] border border-red-500 flex h-[30vh] ">
          <div className="">
            <input
              placeholder="Search.."
              id="input"
              className="input bg-transparent focus:outline-none"
              name="text"
              type="text"
            />
          </div>
          <div className="">
            <button className="bg-[var(--color-primary-v)] text-white py-2 px-6 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* photo div */}
      <div className="flex items-center justify-center">
        <Image
          src="/hero-img.png"
          alt="hero-img"
          width={300}
          height={300}
          className="w-full h-[80%] object-cover"
        />
      </div>
    </div>
  );
};

export default Herosection;
