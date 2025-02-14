import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css"; // Import CSS

function AdminNavbar({ adminName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login"); // Redirect to Admin Login
  };

  return (
    <nav className="admin-navbar">
      {/* Left Section - Greeting Message */}
      <div className="nav-left">
        <h2 className="admin-greeting">👋 Hello, {adminName}</h2>
      </div>

      {/* Center-Right Section - Student & Faculty */}
      <div className="nav-center">
        <ul>
          <li><Link to="/admin/students">Students</Link></li>
          <li><Link to="/admin/faculty">Faculty</Link></li>
        </ul>
      </div>

      {/* Right Section - Logout Button */}
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
