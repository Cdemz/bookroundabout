"use client";
import React from "react";
import "../login/login.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { BsLockFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

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
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Registration successful, sign in the user
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/dashboard", // Redirect after successful sign-in
      });
    } else {
      // Handle registration error
      console.error("Registration failed");
    }
  };
  return (
    <div>
      <h1 className="text-[var(--color-text)] font-bold my-4">MY ACCOUNT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="name">Name</label>
        </div>
        <div className="inputForm">
          <FiAtSign />

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
          <FiAtSign />

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
          <BsLockFill />
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
          <BsLockFill />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button type="submit" className="button-submit">
          Register
        </button>
        <p className="p">
          Don't have an account? <span className="span">Regiddster</span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google">
            <FcGoogle />
            Google
          </button>
          <button className="btn apple">
            <AiFillApple />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}
