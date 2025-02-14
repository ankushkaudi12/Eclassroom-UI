import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the new themed CSS

function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "Admin") {
      navigate("/admin/dashboard");
    } else if (role === "Faculty") {
      navigate("/faculty/dashboard");
    } else if (role === "Student") {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔑 {role} Login</h1>
        <p className="login-subtext">Welcome back! Please enter your credentials.</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="✉️ Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <p className="forgot-password">Forgot Password? <a href="#">Reset here</a></p>
      </div>
    </div>
  );
}

export default Login;
