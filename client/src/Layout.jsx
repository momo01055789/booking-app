import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
