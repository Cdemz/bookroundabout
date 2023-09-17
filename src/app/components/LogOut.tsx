import React from "react";
import { connect } from "react-redux";
import { clearUserData } from "../redux/actions";

// Define a type for props
interface LogoutButtonProps {
  clearUserData: () => void; // Specify the type of clearUserData
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ clearUserData }) => {
  const handleLogout = () => {
    clearUserData();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // Other logout-related actions here
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default connect(null, { clearUserData })(LogoutButton);
