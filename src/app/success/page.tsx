"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { API_BASE_URL } from "../utils/api";

const Success = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmail(response.data.email); // Assuming email is directly on data object
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="h-screen grid place-items-center text-black mx-auto my-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Thank You</h1>
        <AiFillCheckCircle className="text-green-500 mx-auto my-4" size={120} />
        <p className="text-center text-2xl">Order Placed Successfully</p>
        <p>Click return home to go back homepage</p>
        <p>An Email will be sent to {email}</p>
        <Link href="/">
          <p className="bg-yellow-500 py-4 px-5 mt-4 hover:bg-red-800 cursor-pointer font-bold text-xl rounded-2xl w-[15rem] mx-auto">
            RETURN HOME {">"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Success;
