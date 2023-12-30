import React, { useState } from "react";
import axios, { AxiosError } from "axios";
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
      return response.data.imageUrl;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        console.error("Server Response Error:", axiosError.response.data);
      } else if (axiosError && axiosError.request) {
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
        console.error("Failed to upload image");
        return;
      }
    }

    const bookData = {
      ...formData,
      imageUrl,
      price: parseFloat(formData.price),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/book`, bookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            {/* Book Title Input and other form elements... */}
            {/* ... */}
            {/* Submit Button */}
            <div className="ml-auto">
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
