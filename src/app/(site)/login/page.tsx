"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession, getCsrfToken } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const csrfToken = await getCsrfToken(); // Retrieve the CSRF token

      const response = await axios.post(
        "http://booksra.helioho.st/v1/user/login",
        formData,
        {
          headers: {
            "X-CSRF-Token": csrfToken || "", // Ensure it's a string
          },
        }
      );

      if (response.status === 200) {
        router.push("/account");
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input text-[var(--color-text)]"
            placeholder="Enter your Password"
          />
        </div>

        <div className="flex-row">
          <div>
            <span className="span">Forgot password?</span>
          </div>
        </div>
        <button className="button-submit bg-black" type="submit">
          Sign In
        </button>
        <div className=""></div>
        <p className="p">
          Don't have an account?{" "}
          <span className="span">
            <Link href="/register">Sign Up</Link>
          </span>
        </p>
        <p className="p line">Or With</p>

        <div className="flex-row text-[var(--color-text)]">
          <button className="btn google" onClick={() => signIn("github")}>
            <FcGoogle />
            Google
          </button>
        </div>
      </form>

      <h1>New user?</h1>
      <p>Register</p>
    </div>
  );
};

export default LoginForm;
