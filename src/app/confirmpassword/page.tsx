// ConfirmPasswordResetPage.tsx
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../cssstyles/signin.css";
import {
  confirmPasswordResetAction,
  clearUserData, // Import this action to clear user data after the reset
} from "../redux/actions";
import { RootState } from "../redux/store";
import { Dispatch } from "redux";
const ConfirmPasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.passwordReset.loading
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error here
      return;
    }

    // Dispatch an action to confirm the password reset with the new password and token
    // dispatch(confirmPasswordResetAction(password, token)  as any);
  };

  const handleCancel = () => {
    // Clear user data and navigate to the login page or another appropriate action
    dispatch(clearUserData());
    // Redirect to the login page or another route
  };

  return (
    <div className="p-16 lato text-black">
      <h2 className="text-4xl  font-bold text-center ">
        Confirm Password Reset
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center pt-4 "
      >
        <div>
          <label className="mr-3">New Password:</label>
          <input
            className="mr-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mr-3">New Password:</label>
          <input
            className="mr-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mr-3">Confirm Password:</label>
          <input
            className="mr-3"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mr-3">Token:</label>
          <input
            className="mr-3 "
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="signt px-4 py-1"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Confirming..." : "Confirm Reset"}
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 lato text-sm mt-auto rounded-sm "
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPasswordResetPage;
