"use client";
import "../login/login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../redux/actions";
import { Dispatch } from "redux";

export default function Register() {
  const dispatch: Dispatch<any> = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { email, password, firstName, lastName } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the registration action instead of the login action
    dispatch(registerUserAction(formData));
  };
  return (
    <div className="md:px-16">
      <h1 className="text-[var(--color-text)] font-bold my-4 ml-4">
        Create an account
      </h1>
      <form className="form" method="POST" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="name">firstName</label>
        </div>
        <div className="inputForm">
          <input
            id="name"
            name="firstName"
            type="text"
            required
            value={firstName}
            onChange={handleChange}
            className="input"
            placeholder="Enter your first name"
          />
        </div>

        <div className="flex-column">
          <label htmlFor="name">lastName</label>
        </div>
        <div className="inputForm">
          <input
            id="name"
            name="lastName"
            type="text"
            required
            value={lastName}
            onChange={handleChange}
            className="input"
            placeholder="Enter your last name"
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
            value={email}
            onChange={handleChange}
            className="input text-[var(--color-text)]"
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
            value={password}
            onChange={handleChange}
            className="input text-[var(--color-text)]"
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
