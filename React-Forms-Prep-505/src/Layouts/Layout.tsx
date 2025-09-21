import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-[100vw]">
      <header className="w-[100%]  bg-cyan-800 text-white">
        <ul className="w-[60%] mx-auto list-style-none flex justify-between py-6 px-2 text-xl">
          <NavLink to="/login">
            <li className="hover:text-cyan-200 active:text-cyan-200">Login</li>
          </NavLink>
          <NavLink to="/register">
            <li className="hover:text-cyan-200">Register</li>
          </NavLink>
          <NavLink to="/create-post">
            <li className="hover:text-cyan-200">Create Post</li>
          </NavLink>
          <NavLink to="/edit-post">
            <li className="hover:text-cyan-200">Edit Post</li>
          </NavLink>
        </ul>
      </header>
      <div className="pt-6 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
