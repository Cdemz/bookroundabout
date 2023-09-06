"use client";
import React from "react";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { BsLockFill } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
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

    // Sign in using email and password with NextAuth.js
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/dashboard", // Redirect after successful sign-in
    });
  };

  return (
    <div>
      <h1 className="text-[var(--color-text)] font-bold my-4">MY ACCOUNT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <FiAtSign />

          <input
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <BsLockFill />
          {/* ... */}

          <input
            type="password"
            name="password"
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
        <button className="button-submit" type="submit">
          Sign In
        </button>
        <p className="p">
          Don't have an account? <span className="span">Sign Up</span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google" onClick={() => signIn("google")}>
            <FcGoogle />
            Google
          </button>
          <button className="btn apple">
            <AiFillApple />
            Apple
          </button>
        </div>
      </form>

      <h1>New user?</h1>
      <p>Register</p>
    </div>
  );
}
