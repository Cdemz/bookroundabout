"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { requestPasswordResetAction } from "../redux/actions"; // Import the action to request a password reset
import { PasswordResetState } from "../redux/reducers";
import { Dispatch } from "redux";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import toast from "react-hot-toast";

// Define the RootState type including 'passwordReset'
export interface RootState {
  passwordReset: PasswordResetState;
}

interface PageProps {}

const RequestPasswordResetPage: React.FC<PageProps> = (props) => {
  const [email, setEmail] = useState(""); // Define useState for email
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch(); // Use dispatch if needed for Redux actions
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(""); // State for the token
  const [requestSuccess, setRequestSuccess] = useState(false);
  // Define the handleSubmit function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonClicked(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/begin-change-password`,

        { email }
      );
      // Handle successful response
      toast.success("Password reset request sent successfully.");
      setRequestSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsButtonClicked(false); // Reset the button state after handling the request
    }
  };

  const handleSetNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Call the endpoint to finalize the password reset process
      const response = await axios.put(
        `${API_BASE_URL}/user/finish-change-password`,
        {
          email,
          token,
          password: newPassword,
          confirmPassword,
        }
      );
      // Handle successful password reset
      toast.success("Password successfully changed.");
      toast.success("Login with new password.");
    } catch (error) {
      // Error handling
      toast.error("Failed to change password.");
    }
  };

  return (
    <div className="text-[var(--color-text)]">
      {!requestSuccess ? (
        <>
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
                className={`bg-[var(--color-primary)] text-white px-4 py-2 lato mx-auto my-3 md:my-10 cursor-pointer ${
                  isButtonClicked ? "bg-red-500" : ""
                }`}
                // You can also use disabled={isButtonClicked} if you want to prevent multiple clicks
              >
                Request Reset
              </button>
            </div>
          </form>
        </>
      ) : (
        <form
          onSubmit={handleSetNewPassword}
          className="px-9 flex flex-col gap-4 py-4"
        >
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter Token"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-4 py-2 lato mx-auto my-3 md:my-10 cursor-pointer"
          >
            Set New Password
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestPasswordResetPage;
