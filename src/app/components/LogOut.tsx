"use client";
import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUserData } from "../redux/actions";

interface LogoutButtonProps {
  clearUserData: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ clearUserData }) => {
  const router = useRouter();

  const handleLogout = () => {
    clearUserData();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // Redirect to the login page
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default connect(null, { clearUserData })(LogoutButton);
