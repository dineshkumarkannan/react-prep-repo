import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="pages-container">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
