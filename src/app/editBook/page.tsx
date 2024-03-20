"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { FaAsterisk } from "react-icons/fa";
import { API_BASE_URL } from "../utils/api";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormattedPrice from "@/app/components/FormattedPrice";
import Link from "next/link";
import Image from "next/image";
import useQueryParams from "@/app/Category/useRoute";

interface FormData {
  bookTitle: string;
  category: string;
  description: string;
  price: number;
  code: string;
  genre: string;
  tag: string;
  agerange: string;
  isNew: string;
  sales: string;
  amountInStock: number;
  discountPrice: number;
  imagelink: string;
  image: File | null;
}

type Props = {
  params: {
    id: string;
  };
};

const EditBookPage = ({ params }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    bookTitle: "",
    category: "",
    description: "",
    price: 12,
    code: "",
    genre: "",
    tag: "",
    agerange: "",
    isNew: "",
    sales: "",
    amountInStock: 0,
    discountPrice: 0,
    imagelink: "",
    image: null,
  });
  const queryParams = useQueryParams();
  const bookId = queryParams.name;
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
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

      console.log("Upload response:", response.data); // Debugging log

      if (response.data && response.data.url) {
        toast.success("Image upload success, Uploading book");
        return response.data.url; // Access the URL based on your actual response structure
      } else {
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
  };

  useEffect(() => {
    if (bookId) {
      const fetchBookData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);
          const bookData = response.data;

          setFormData({
            bookTitle: bookData.title || "",
            category: bookData.category || "",
            description: bookData.description || "",
            price: bookData.price ? parseFloat(bookData.price) : 0, // Parse as number
            code: bookData.code || "",
            genre: bookData.genres.join(", ") || "",
            tag: bookData.tag || "",
            agerange: bookData.ageRange || "",
            isNew: "",
            sales: "",
            imagelink: bookData.imageUrl || "",
            image: null,
            amountInStock: bookData.amountInStock
              ? parseInt(bookData.amountInStock)
              : 0, // Parse as number
            discountPrice: bookData.discountPrice
              ? parseFloat(bookData.discountPrice)
              : 0,
          });
        } catch (error) {
          toast.error("Failed to fetch book data");
          console.error("Error fetching book data:", error);
        }
      };

      fetchBookData();
    }
  }, [bookId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field should be a number and parse it
    if (
      name === "price" ||
      name === "amountInStock" ||
      name === "discountPrice"
    ) {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
      setIsImageChanged(true); // Indicate that a new image has been selected
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token not found");
      return;
    }

    let imageUrl = formData.imagelink; // Use existing image link by default

    if (isImageChanged && formData.image) {
      const uploadedImageUrl = await uploadImage(formData.image);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl; // Update imageUrl if new image is uploaded
      } else {
        toast.error("Failed to upload image");
        return;
      }
    }

    // Log the formData to check the price value
    console.log("Submitting data:", formData);

    // Convert `genre` from string to array
    const genres = formData.genre.split(",").map((genre) => genre.trim());

    const updatedFormData = {
      ...formData,
      title: formData.bookTitle,
      price: formData.price, // Ensure no conversion or rounding here
      amountInStock: formData.amountInStock,
      discountPrice: formData.discountPrice,
      genre: genres,
      imageUrl,
    };

    // if (imageUrl) {
    //   bookData.imageUrl = imageUrl;
    // }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/book/${bookId}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Book updated successfully");
      } else {
        toast.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error updating book");
    }
  };

  return (
    <div className="text-black p-6">
      <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
          <Image
            src={formData.imagelink}
            alt="book image"
            width={500}
            height={500}
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4 lato">
          <div className="flex text-[var(--color-text)] item-center text-xs md:text-sm gap-1 ">
            <Link href="/">Home</Link>
            <p className="text-xs md:text-sm  font-semibold -mb-3 text-[var(--color-bg)]">
              {" "}
              /{formData.category}
            </p>
          </div>

          <h1 className="text-2xl md:text-3xl tracking-wide font-semibold text-[var(--color-text)]">
            {formData.bookTitle}
          </h1>
          <div className="">
            <p className="  text-gray-600   font-semibold text-lg ">
              <FormattedPrice amount={formData.price} />

              {formData.discountPrice && (
                <span className="ml-1 line-through">
                  <FormattedPrice amount={formData.discountPrice} />
                </span>
              )}
            </p>
            <p className="  text-black   font-semibold text-lg ">
              Amount In Stock: {formData.amountInStock}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600">{formData.description}</p>
      </div>
      <h1 className="text-center font-bold text-lg mb-3">Edit Book</h1>
      <section className="bg-white">
        <div className="">
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
                value={formData.bookTitle}
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
                value={formData.category}
                placeholder="What category is it?"
                required
              />
            </div>
            {/* Description  */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Description
                <span className="text-sm text-red-500">
                  {/* <FaAsterisk /> */}
                </span>{" "}
              </label>
              <textarea
                className="border-2 border-gray-400  h-20 border-r-2 "
                name="description"
                onChange={handleChange}
                placeholder="e.g. a very great book"
                // required
                value={formData.description}
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
                value={formData.price}
                required
                onChange={handleChange}
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
                name="code"
                onChange={handleChange}
                placeholder="17000"
                value={formData.code}
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
                value={formData.genre}
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
                value={formData.tag}
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
                value={formData.agerange}
              />
            </div>

            {/*discount */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">Old price</label>

              <input
                type="text"
                className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                name="discountPrice"
                onChange={handleChange}
                placeholder="eg,13-18 "
                value={formData.discountPrice}
              />
            </div>

            {/*amountInStock */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                AmountInStock
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>

              <input
                type="text"
                className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                name="amountInStock"
                onChange={handleChange}
                placeholder="eg,13-18 "
                value={formData.amountInStock}
                required
              />
            </div>

            {/* Drag and Drop for Image */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">Book Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/* Optionally display the current image or a preview of the new one */}
              {formData.imagelink && !isImageChanged && (
                <img
                  src={formData.imagelink}
                  alt="Current Book Image"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              )}
              {/* ... (rest of the form) */}
            </div>
            {/* Submit Button */}
            <div className=" ml-auto">
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white px-3 py-2 lato text-sm mt-4"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditBookPage;
