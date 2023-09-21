"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../../redux/store";
import { loginUserAction } from "../../redux/actions";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Toaster } from "react-hot-toast";
import { Dispatch } from "redux";
import "./login.css";

const CustomSignIn = () => {
  const dispatch: Dispatch<any> = useDispatch(); // Correct placement of type annotation
  const login = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction(formData));
  };

  const session = false;

  return (
    <div className="">
      <Toaster />
      {!session ? (
        <div>
          <h1 className="text-[var(--color-text)] font-bold my-4">
            MY ACCOUNT
          </h1>
          <form className="form" method="POST" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input text-[var(--color-text)]"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                value={password}
                onChange={handleChange}
                className="input text-[var(--color-text)]"
                placeholder="Enter your Password"
                name="password"
                required
              />
            </div>

            <div className="flex-row mt-2">
              <div>
                <Link href="/forgotPassword">
                  <button>
                    <span className="span">Forgot password?</span>
                  </button>
                </Link>
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
            <p className="p">
              New user?{" "}
              <span className="span">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      ) : (
        // User is already authenticated, display a message or redirect as needed
        <p>You are already logged in.</p>
      )}
    </div>
  );
};

export default CustomSignIn;
