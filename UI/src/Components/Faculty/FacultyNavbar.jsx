import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css"; // Using the same CSS file for consistency

function FacultyNavbar({ facultyName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/faculty/login"); // Redirect to Faculty Login
  };

  return (
    <nav className="admin-navbar"> {/* Reusing the same class for consistent styling */}
      {/* Left Section - Greeting */}
      <div className="nav-left">
        <h2 className="admin-greeting">👨‍🏫 Hello, {facultyName}</h2>
      </div>

      {/* Center-Right Section - Faculty Links */}
      <div className="nav-center">
        <ul>
          <li><Link to="/faculty/courses">Courses</Link></li>
          <li><Link to="/faculty/students">Students</Link></li>
          <li><Link to="/faculty/reports">Reports</Link></li>
        </ul>
      </div>

      {/* Right Section - Logout Button */}
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default FacultyNavbar;
