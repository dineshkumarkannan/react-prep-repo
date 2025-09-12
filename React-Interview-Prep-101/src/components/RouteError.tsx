import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="route-error-container">
      <h4>An error occurred.</h4>
      <p>{error?.message}</p>
      <button onClick={() => navigate("/")}>Go to homepage</button>
    </div>
  );
};

export default RouteError;
