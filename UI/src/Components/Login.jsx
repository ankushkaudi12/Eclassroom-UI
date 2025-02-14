import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated authentication check (Replace this with API call)
    if (email === "admin@example.com" && password === "admin123" && role === "Admin") {
      navigate("/admin/dashboard");
    } else if (email === "faculty@example.com" && password === "faculty123" && role === "Faculty") {
      navigate("/faculty/dashboard");
    } else if (email === "student@example.com" && password === "student123" && role === "Student") {
      navigate("/student/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{role} Login Page</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
