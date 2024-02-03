"use client";
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import toast from "react-hot-toast";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const TopText = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      toast.error("Authorization required");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/data`,
        {
          data: message,
          type: "banner_message",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      console.log(response.data);
      toast.success("Message sent successfully!");
      // Handle the response, e.g., show a success message
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div className="p-8 mx-auto">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Write a message for users"
        className="w-full p-3 rounded-md bg-transparent border-3 border-[var(--color-primary)] resize-none text-black"
      />
      <button
        onClick={sendMessage}
        type="submit"
        className="bg-[var(--color-primary)] py-2 px-6 rounded-full text-white mx-4 mt-4"
      >
        Send Message
      </button>
    </div>
  );
};

export default TopText;
