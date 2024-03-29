"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaAsterisk } from "react-icons/fa";
import { API_BASE_URL } from "../utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormData {
  bookTitle: string;
  category: string;
  description: string;
  price: number;
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
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    bookTitle: "",
    category: "",
    description: "",
    price: 100,
    bookCode: "",
    genre: "",
    tag: "",
    agerange: "",
    isNew: "",
    sales: "",
    amountInStock: 2,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amountInStock" || name === "price") {
      let numericValue = 0;
      if (name === "price") {
        numericValue = parseFloat(value);
      } else {
        numericValue = parseInt(value, 10);
      }

      console.log({ name, numericValue, value });
      if (!isNaN(numericValue) && numericValue <= 9_999_999) {
        setFormData({ ...formData, [name]: numericValue });
      } else {
        console.error(
          `${name} must be a valid number and not greater than 9,999,999`
        );
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    setFormData({ ...formData, image: acceptedFiles[0] });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(acceptedFiles[0]);
    fileReader.onload = (loadEvent) => {
      // Check if loadEvent.target is not null
      if (loadEvent.target) {
        setImagePreview(loadEvent.target.result as string);
      }
    };
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      "image/*": [
        ".png",
        ".gif",
        ".jpeg",
        ".jpg",
        ".bmp",
        ".tif",
        ".tiff",
        ".webp",
        ".heif",
        ".heic",
        ".svg",
      ],
    },
    onDrop: handleImageDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file); // Ensure 'file' matches the field expected by your backend

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Upload response:", response.data); // Debugging log

      if (response.status === 401) {
        toast.error("Authorization failed");
        return "";
      }
  

      if (response.data && response.data.url) {
        toast.success("Image upload success, Uploading book");
        // router.push("/Dashboard");
        return response.data.url; // Access the URL based on your actual response structure
      } else {
        toast.error("Invalid upload response structure");
        console.error("Invalid upload response structure", response.data);
        return "";
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Server Response Error:", axiosError.response.data);
      } else if (axiosError.request) {
        console.error("No Response:", axiosError.request);
      } else {
        console.error("Error Message:", axiosError.message);
      }
      return "";
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";

    if (formData.image) {
      imageUrl = await uploadImage(formData.image);
      if (!imageUrl) {
        toast.error("Failed to upload image");
        toast.error("User not authorized");
        // console.error("Failed to upload image");
        return;
      }
     
    }

    // Truncate bookCode if it's longer than 30 characters
    const bookCode = formData.bookCode.slice(0, 30);

    // Convert genre string to an array
    const genres = formData.genre.split(",").map((genre) => genre.trim());

    const bookData = {
      ...formData,
      imageUrl,
      price: formData.price,
      title: formData.bookTitle, // Change key to title
      code: formData.bookCode, // Rename bookCode to code
      genre: genres, // Use the array for genre
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/book`, bookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Check if the response is successful (status codes 200-299 are considered successful)
      if (response.status >= 200 && response.status < 300) {
        toast.success("Book successfully uploaded");
        router.push("/Dashboard"); // Navigate to the dashboard after successful upload
      } else {
        // Handle unexpected status codes as errors
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // Handle known error status range 400-490
      if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 490) {
        const errorMessage = (axiosError.response.data as { message?: string }).message || "An error occurred";
        toast.error(errorMessage);
        toast.error("The book was not uploaded");;
      } else {
        // Handle other errors not in the 400-490 range
        toast.error("An error occurred while submitting the form");
      }
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
                onChange={handleChange}
                // value={formData.price}
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
                placeholder="whl50"
                required
              />
            </div>

            {/* Genre */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Genre
                <span className="text-sm text-red-500">
                  {/* <FaAsterisk /> */}
                </span>{" "}
              </label>

              <input
                type="text"
                className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                name="genre"
                onChange={handleChange}
                placeholder="eg.action"
                // required
              />
            </div>

            {/* tag */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Tag
                <span className="text-sm text-red-500">
                  {/* <FaAsterisk /> */}
                </span>{" "}
              </label>

              <input
                type="text"
                className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                name="tag"
                onChange={handleChange}
                placeholder="eg, hard back, paper back, very new etc. "
                // required
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
            {/* 
            // Amount In Stock Input */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Amount In Stock
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <input
                type="number"
                className="border-2 border-gray-400 h-10 border-r-2 text-[var(--color-text)]"
                name="amountInStock"
                onChange={handleChange}
                placeholder="Enter amount in stock"
                required
              />
            </div>

            {/* Drag and Drop for Image */}
            <div
              {...getRootProps()}
              className="dropzone border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop book image here, or click to select file</p>

              {/* Image Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              )}
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
