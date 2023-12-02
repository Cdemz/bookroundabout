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
      <div className="">
        <Image
          src="/forgot_password__1_-removebg-preview.png"
          alt="img"
          width={300}
          height={300}
          className="mx-auto md:h-[80%] md:w-[60%] lg:h-[50%]"
        />
      </div>
      <form onSubmit={handleSubmit} className="px-9">
        <div>
          <label className="text-black mr-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter  your email..."
            className="border-2 border-gray-400 w-[85%] h-10 border-r-2 text-[var(--color-text)] md:my-10"
          />
        </div>
        <div className="mx-auto flex justify-center md:my-10">
          <button
            type="submit"
            // disabled={isLoading}
            className="bg-[var(--color-primary)] text-white px-4 py-2 lato mx-auto my-3 md:my-10 cursor-pointer"
          >
            {/* {isLoading ? "Requesting..." : "Request Reset"} */}
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPasswordResetPage;
