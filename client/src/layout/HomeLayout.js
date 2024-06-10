import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./HomeLayout.css"; // Import the CSS file for styling

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
