"use client";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { BsLockFill } from "react-icons/bs";
import { signIn } from "next-auth/react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", formData);

      if (response.status === 200) {
        // Redirect the user to a dashboard or home page upon successful login
        window.location.href = "/account";
      }
    } catch (error) {
      console.error("Login failed", error);
    }
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
            className="input text-[var(--color-text)]"
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
            className="input text-[var(--color-text)]"
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
        <button className="button-submit bg-black" type="submit">
          Sign In
        </button>
        <p className="p">
          Don't have an account? <span className="span">Sign Up</span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google" onClick={() => signIn("github")}>
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
};

export default LoginForm;
