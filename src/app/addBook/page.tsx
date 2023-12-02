"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaAsterisk } from "react-icons/fa";
import { API_BASE_URL } from "../utils/api";

interface FormData {
  bookTitle: string;
  category: string;
  description: string;
  price: string;
  bookCode: string;
  genre: string;
  tag: string;
  agerange: string;
  isNew: string;
  sales: string;
  amountInStock: number;
  image: File | null;
  [key: string]: any;
}

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    bookTitle: "",
    category: "",
    description: "",
    price: "",
    bookCode: "",
    genre: "",
    tag: "",
    agerange: "",
    isNew: "",
    sales: "",
    amountInStock: 2,
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
    onDrop: handleImageDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.imageUrl; // Replace with the actual key that your API returns
    } catch (error) {
      console.error("Error uploading image", error);
      return "";
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";

    if (formData.image) {
      imageUrl = await uploadImage(formData.image);
      if (!imageUrl) {
        console.error("Failed to upload image");
        return;
      }
    }

    const bookData = {
      ...formData,
      imageUrl,
      price: parseFloat(formData.price), // Convert string to number if necessary
      // Include additional transformations if required
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/book`, bookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored and retrieved correctly
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  return (
    <div className="text-black ">
      <section className="bg-white">
        <div className="w-[100vw]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 border-gray-300 border-4 p-6 w-full"
          >
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                type="number"
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="eg,13-18 "
              />
            </div>

            {/* Drag and Drop for Image */}
            <div
              {...getRootProps()}
              className="dropzone border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop book image here, or click to select file</p>
            </div>

            {/* Submit Button */}
            <div className=" ml-auto">
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white px-3 py-2 lato text-sm mt-4"
              >
                Publish Book
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default page;

// import React from "react";
// import { FaAsterisk } from "react-icons/fa";

// const page = () => {
//   return (
//     <div className="text-black ">
//       <section className="bg-white">
//         <div className="w-[100vw]">
//           <form className="flex flex-col gap-2 border-gray-300 border-4 p-6 w-full">
//             {/* book title  */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Book Title
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]w-full"
//                 name="bookTitle"
//                 placeholder="eg. Billy goes to school"
//                 required
//               />
//             </div>
//             {/* category  */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Category
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="category"
//                 placeholder="What category is it?"
//                 required
//               />
//             </div>
//             {/* Description  */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Description
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>
//               <textarea
//                 className="border-2 border-gray-400  h-20 border-r-2 "
//                 name="description"
//                 placeholder="e.g. a very great book"
//                 required
//                 // value={}
//                 // onChange={}
//               />
//             </div>
//             {/* price  */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Price
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="number"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="price"
//                 placeholder="how much?"
//                 required
//               />
//             </div>
//             {/* Book Code  */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Book Code
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="bookCode"
//                 placeholder="17000"
//                 required
//               />
//             </div>

//             {/* Genre */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Genre
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="genre"
//                 placeholder="eg.action"
//                 required
//               />
//             </div>

//             {/* tag */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">
//                 Tag
//                 <span className="text-sm text-red-500">
//                   <FaAsterisk />
//                 </span>{" "}
//               </label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="tag"
//                 placeholder="eg, hard back, paper back, very new etc. "
//                 required
//               />
//             </div>

//             {/*agerange */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">Age Range</label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="agerange"
//                 placeholder="eg,13-18 "
//               />
//             </div>

//             {/* isNew */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">Display as new?</label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="isNew"
//                 placeholder="true or false, or leave empty "
//               />
//             </div>

//             {/* sales */}
//             <div className="flex-col flex gap-2">
//               <label className="flex gap-1">On sales?</label>

//               <input
//                 type="text"
//                 className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
//                 name="sales"
//                 placeholder="true or false, or leave empty "
//               />
//             </div>
//             <div className=" ml-auto">
//               <button className="bg-[var(--color-primary)] text-white px-3 py-2 lato text-sm mt-4">
//                 Publish Book
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default page;
