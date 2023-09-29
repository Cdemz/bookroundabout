import React from "react";
import Link from "next/link";
import Dashboard from "../Dashboard/dDashboard";
// import protectRouteMiddleware from "../../middleware/auth";

const Admin = () => {
  return (
    <div className="  h-[30%]rr ">
      <Dashboard />
    </div>
  );
};

// const ProtectedAdmin = protectRouteMiddleware(Admin); // Wrap the Admin component

export default Admin;
