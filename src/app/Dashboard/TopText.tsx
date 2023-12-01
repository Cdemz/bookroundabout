"use client";
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const TopText = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/message`, {
        message: message,
        type: "banner_message",
      });
      console.log(response.data);
      // Handle the response, e.g., show a success message
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default TopText;
