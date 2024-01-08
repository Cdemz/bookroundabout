"use client";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";

const TopMessage = () => {
  const [apiMessage, setApiMessage] = useState("Loading...");

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set up the request headers
    const headers = new Headers();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(`${API_BASE_URL}/message?type=banner_message`, { headers })
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiMessage("Error loading message");
      });
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div className="bg-[var(--color-primary-v)] w-full pl-auto pr-auto py-4 flex justify-center">
      <h1>{apiMessage}</h1>
    </div>
  );
};

export default TopMessage;
