import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <h4>404 | Page not found</h4>
      <button onClick={() => navigate("/")}>Back To Home</button>
    </div>
  );
};

export default NotFound;
