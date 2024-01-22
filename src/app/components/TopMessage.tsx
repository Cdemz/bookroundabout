"use client";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";

const TopMessage = () => {
  const [apiMessage, setApiMessage] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "GET", // or 'POST' if required by your API
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    fetch(`${API_BASE_URL}/message?type=banner_message`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApiMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiMessage("Error loading message");
      });
  }, []);
  // Empty array ensures this runs only once on mount

  return (
    <div className="bg-[var(--color-primary-v)] w-full px-auto py-4 flex justify-center text-center">
      <h1>{apiMessage}</h1>
    </div>
  );
};

export default TopMessage;
