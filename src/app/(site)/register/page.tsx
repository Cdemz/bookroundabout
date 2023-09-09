"use client";
import React from "react";
import "../login/login.css";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Submit the registration form data to your backend or use NextAuth.js
    // custom API route to handle registration with credentials
    try {
      // Send the registration data to your server-side API endpoint
      const response = await axios.post(
        "http://booksra.helioho.st/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Registration successful, sign in the user
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: "/account", // Redirect after successful sign-in
        });
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="md:px-16">
      <h1 className="text-[var(--color-text)] font-bold my-4 ml-4">
        Create an account
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="name">Name</label>
        </div>
        <div className="inputForm">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter your Name"
          />
        </div>

        <div className="flex-column">
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputForm">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="Enter your Email"
          />
        </div>

        <div className="flex-column">
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputForm">
          {/* ... */}

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="Enter your Password"
          />
        </div>

        <button type="submit" className="button-submit">
          Register
        </button>

        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google">
            <FcGoogle />
            Google
          </button>
        </div>
        <p className="p">
          Have an account?{" "}
          <span className="span">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
