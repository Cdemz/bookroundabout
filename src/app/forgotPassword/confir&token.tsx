// ConfirmPasswordResetPage.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <div>
      <h2>Confirm Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Confirming..." : "Confirm Reset"}
          </button>
          <button type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPasswordResetPage;
