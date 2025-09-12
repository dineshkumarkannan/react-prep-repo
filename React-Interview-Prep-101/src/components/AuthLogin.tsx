import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = login({ email, password });
    if (result.success) {
      navigate(from, { replace: true });
    }
  };
  return (
    <form className="auth-login-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="section-container">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="section-container">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">Submit</button>
      <pre className="sample-cred">
        <h6>Sample Credentials</h6>
        <div>
          email : <i>sample@test.com</i>
        </div>
        <div>
          password : <i>123456</i>
        </div>
      </pre>
    </form>
  );
};

export default AuthLogin;
