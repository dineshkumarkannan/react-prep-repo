// src/components/Navbar.js
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = logout();
    if (result.success) navigate("/", { replace: true, relative: "path" });
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
    };
  };

  return (
    <nav className="navbar">
      <Link to="/" className="site-title">
        Post App
      </Link>
      <div className="navlist-container">
        <ul>
          <li>
            <NavLink style={navLinkStyles} className={`nav-link`} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} className={`nav-link`} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} className={`nav-link `} to="/posts">
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              className={`nav-link `}
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              className={`nav-link `}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {isAuthenticated ? (
          <button onClick={() => handleLogout()} className="logout">
            Logout
          </button>
        ) : (
          <button
            onClick={() =>
              navigate("/auth", { replace: true, relative: "path" })
            }
            className="login"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
