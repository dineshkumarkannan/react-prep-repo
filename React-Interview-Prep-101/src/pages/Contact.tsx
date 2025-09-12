import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <h2>Contact</h2>

      <div className="contact-btn-container">
        <button
          className={`${location.pathname === "/contact" ? "active" : ""}`}
          onClick={() => navigate("/contact")}
        >
          Contact Details
        </button>
        <button
          className={`${location.pathname === "/contact/form" ? "active" : ""}`}
          onClick={() => navigate("form")}
        >
          Contact Form
        </button>
      </div>
    </div>
  );
};

export default Contact;
