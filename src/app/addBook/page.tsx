import React from "react";
import Layout from "../admin/layout";
import { FaAsterisk } from "react-icons/fa";

const page = () => {
  return (
    <div className="text-black ">
      <Layout>
        <section className="bg-white">
          <div className="w-[100vw]">
            <form className="flex flex-col gap-2 border-gray-300 border-4 p-6 w-full">
              {/* book title  */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Book Title
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]w-full"
                  name="bookTitle"
                  placeholder="eg. Billy goes to school"
                  required
                />
              </div>
              {/* category  */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Category
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="category"
                  placeholder="What category is it?"
                  required
                />
              </div>
              {/* Description  */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Description
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>
                <textarea
                  className="border-2 border-gray-400  h-20 border-r-2 "
                  name="description"
                  placeholder="e.g. a very great book"
                  required
                  // value={}
                  // onChange={}
                />
              </div>
              {/* price  */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Price
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="price"
                  placeholder="how much?"
                  required
                />
              </div>
              {/* Book Code  */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Book Code
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="bookCode"
                  placeholder="17000"
                  required
                />
              </div>

              {/* Genre */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Genre
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="genre"
                  placeholder="eg.action"
                  required
                />
              </div>

              {/* tag */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Tag
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="tag"
                  placeholder="eg, hard back, paper back, very new etc. "
                  required
                />
              </div>

              {/*agerange */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">Age Range</label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="agerange"
                  placeholder="eg,13-18 "
                />
              </div>

              {/* isNew */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">Display as new?</label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="isNew"
                  placeholder="true or false, or leave empty "
                />
              </div>

              {/* sales */}
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">On sales?</label>

                <input
                  type="text"
                  className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                  name="sales"
                  placeholder="true or false, or leave empty "
                />
              </div>
              <div className=" ml-auto">
                <button className="bg-[var(--color-primary)] text-white px-3 py-2 lato text-sm mt-4">
                  Publish Book
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default page;
