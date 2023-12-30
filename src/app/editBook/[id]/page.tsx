"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaAsterisk } from "react-icons/fa";
import { API_BASE_URL } from "../../utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormattedPrice from "@/app/components/FormattedPrice";
import Link from "next/link";
import Image from "next/image";

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
  discountPrice: number;
  imageUrl: string;
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
    bookCode: "",
    genre: "",
    tag: "",
    agerange: "",
    isNew: "",
    sales: "",
    amountInStock: 0,
    discountPrice: 0,
    imageUrl: "",
  });
  const router = useRouter();
  const { id } = params; // Get book ID from URL

  useEffect(() => {
    if (id) {
      const fetchBookData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/book/${id}`);
          const bookData = response.data;

          setFormData({
            bookTitle: bookData.title || "",
            category: bookData.category || "",
            description: bookData.description || "",
            price: bookData.price ? parseFloat(bookData.price) : 0, // Parse as number
            bookCode: bookData.code || "",
            genre: bookData.genres.join(", ") || "",
            tag: "",
            agerange: bookData.ageRange || "",
            isNew: "",
            sales: "",
            imageUrl: "",
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
  }, [id]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token not found");
      return;
    }

    // Convert `price` and `amountInStock` to numbers and ensure they are within limits
    // const price =
    //   parseFloat(formData.price) > 9999999
    //     ? 9999999
    //     : parseFloat(formData.price);
    // const amountInStock = parseInt(formData.amountInStock) > 99999 ? 99999 : parseInt(formData.amountInStock);

    // Convert `genre` from string to array
    const genres = formData.genre.split(",").map((genre) => genre.trim());

    const updatedFormData = {
      ...formData,
      price: formData.price,
      amountInStock: formData.amountInStock,
      discountPrice: formData.discountPrice,
      // Ensure genre is formatted as required by the API
      genre: formData.genre.split(",").map((item) => item.trim()),
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/book/${id}`,
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
      <div className="">
        <p className=" font-bold -mb-3 text-[var(--color-bg)]">
          {" "}
          <span>{"> "}</span>
          {formData.bookTitle}
        </p>
      </div>
      <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
          <Image
            src={formData.imageUrl}
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
                  <FaAsterisk />
                </span>{" "}
              </label>
              <textarea
                className="border-2 border-gray-400  h-20 border-r-2 "
                name="description"
                onChange={handleChange}
                placeholder="e.g. a very great book"
                required
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
                name="bookCode"
                onChange={handleChange}
                placeholder="17000"
                value={formData.bookCode}
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
                value={formData.genre}
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
                value={formData.tag}
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
              <label className="flex gap-1">AmountInStock</label>

              <input
                type="text"
                className="border-2 border-gray-400  h-10 border-r-2 text-[var(--color-text)]"
                name="amountInStock"
                onChange={handleChange}
                placeholder="eg,13-18 "
                value={formData.amountInStock}
              />
            </div>

            {/* Drag and Drop for Image */}

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
