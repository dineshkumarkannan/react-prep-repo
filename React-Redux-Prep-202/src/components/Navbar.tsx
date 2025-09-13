import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="navbar">
        <h2>React Redux</h2>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/count"}>Count</NavLink>
            </li>
            <li>
              <NavLink to={"/tasks"}>Tasks</NavLink>
            </li>
            <li>
              <NavLink to={"/users"}>Users</NavLink>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
