"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordResetAction } from "../redux/actions"; // Import the action to request a password reset
import { PasswordResetState } from "../redux/reducers";
import { Dispatch } from "redux";
import Image from "next/image";
import { FiMail } from "react-icons/fi";

// Define the RootState type including 'passwordReset'
export interface RootState {
  passwordReset: PasswordResetState;
}

interface PageProps {}

const RequestPasswordResetPage: React.FC<PageProps> = (props) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch an action to request a password reset with the entered email
    dispatch(requestPasswordResetAction(email));
  };
  const isLoading = useSelector(
    (state: RootState) => state.passwordReset.loading
  );

  return (
    <div className="text-[var(--color-texxt)]">
      <h2>Request Password Reset</h2>
      <div className="">
        <Image
          src="/forgot_password__1_-removebg-preview.png"
          alt="img"
          width={300}
          height={300}
          className=""
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email..."
            className="border-2 border-gray-400 w-[85%] h-10 border-r-2 text-[var(--color-text)]"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[var(--color-primary)] text-white px-1 py-1 lato "
          >
            {isLoading ? "Requesting..." : "Request Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPasswordResetPage;
