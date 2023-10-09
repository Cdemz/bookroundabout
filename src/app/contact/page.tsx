"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineContacts } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { HiMailOpen } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data
  const formData = new FormData(event.target as HTMLFormElement);

  // Create an object from form data
  const data: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  try {
    // Send a POST request to your API endpoint
    const response = await axios.post(
      "https://booksroundabout.glitch.me/v1/contact-us",
      data
    );

    // Handle the API response as needed
    if (response.status === 200) {
      // Successful response, you can show a success message or redirect the user
      console.log("Message sent successfully");
    } else {
      // Handle any other response status codes or errors
      console.error("Failed to send message");
    }
  } catch (error) {
    // Handle any network errors or exceptions
    console.error("An error occurred while sending the message:", error);
  }
};

const page = () => {
  return (
    <div className="text-black p-6 flex flex-col gap-4 md:flex-row md:gap[8rem]">
      <div className="flex text-[var(--color-text)] flex-col gap-3 lato font-bold mb-2 bg-white shadow-md shadow-[var(--color-text)] p-4  md:h-[30rem] md:my-auto">
        <AiOutlineContacts className="text-[var(--color-primary)]" size={40} />
        <h1 className="font-bold text-black text-2xl">Get in Touch with Us </h1>
        <h3 className="mb-5 font-bold">We respond as swiftly as we can</h3>
        <p className="mb-5 w-[8rem]">
          63a Capitol road, opposite car wash bus stop agege.{" "}
        </p>
        <h2>
          For a detailed direction{" "}
          <span className="text-[var(--color-primary)]">
            <Link href="/ourStores">Check our Location site</Link>
          </span>
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-2xl ml-3 font-bold my-6   ">Contact Us</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 lato">
            <div className="flex flex-col gap-1">
              <p className=" font-bold text-xl">Full Name </p>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
                className="w-full p-3 rounded-md bg-transparent border-3 border-[var(--color-primary)] resize-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className=" font-bold text-xl">Email Address </p>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-md bg-transparent border-3 border-[var(--color-primary)] resize-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className=" font-bold text-xl">Company</p>
              <input
                type="text"
                name="companyName"
                placeholder="Your company name"
                className="w-full p-3 rounded-md bg-transparent border-3 border-[var(--color-primary)] resize-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className=" font-bold text-xl">Your message</p>
              <textarea
                name="message"
                rows={7}
                placeholder="Your Message"
                required
                className="w-full p-3 rounded-md bg-transparent border-3 border-[var(--color-primary)] resize-nonew-[20rem]"
              ></textarea>
            </div>
            <div className="flex gap-2 items-center justify-center text-center">
              <input type="checkbox" name="" id="" required />
              <p className="text-sm">
                I agree to have read Books Roundabout's{" "}
                <Link href="/terms">
                  <span className="text-[var(--color-primary)]">
                    terms of service
                  </span>
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="bg-[var(--color-primary)] py-2 px-6 rounded-full font-bold text-white mx-4"
            >
              Send Message
            </button>
          </form>
          <div className="flex gap-5 mx-auto mt-8 mb-3 justify-center">
            <Link href="https://wa.me/2349020704026" target="_blank">
              <BsWhatsapp size={30} />
            </Link>
            <a
              href="mailto:booksroundabout@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <p className="flex items-center gap-2 cursor-pointer">
                <HiMailOpen className="" size={30} />
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
