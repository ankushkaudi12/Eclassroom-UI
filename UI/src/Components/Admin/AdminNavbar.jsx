import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css"; // Import CSS

// eslint-disable-next-line react/prop-types
function AdminNavbar({ firstName, lastName, userId }) {
  const navigate = useNavigate();
  console.log("userId",userId);
  

  const handleLogout = () => {
    navigate("/admin/login"); // Redirect to Admin Login
  };

  return (
    <nav className="admin-navbar">
      {/* Left Section - Greeting Message */}
      <div className="nav-left">
        <li><Link to={`/admin/dashboard/${userId}`}>
        <h2 className="admin-greeting">👋 Hello, {firstName} {lastName}</h2>
        </Link></li>
      </div>

      {/* Center-Right Section - Student & Faculty */}
      <div className="nav-center">
        <ul>
        <li><Link to={`/admin/${userId}/students`}>Students</Link></li>
        <li><Link to={`/admin/${userId}/faculty`}>Faculty</Link></li>
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
