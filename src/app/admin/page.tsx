import React from "react";
import Link from "next/link";

const Admin = () => {
  return (
    <div className="your-page bg-green-500">
      {/* Include your existing navbar here */}
      <div className="navbar">Navbar Content</div>

      {/* Include the AdminSidebar */}
      {/* <SideBar /> */}
      {/* Your main content */}
      <div className="main-content">{/* Page content */}</div>

      {/* Include your existing footer here */}
      <div className="footer">Footer Content</div>
      <Link href="Dasboard" className="text-white">
        Dashboard
      </Link>
    </div>
  );
};

export default Admin;
