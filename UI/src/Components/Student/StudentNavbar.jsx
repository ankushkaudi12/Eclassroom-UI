import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css"; // Using the same CSS file for consistency

function StudentNavbar({ studentName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/student/login"); // Redirect to Student Login
  };

  return (
    <nav className="admin-navbar"> {/* Reusing the same class for consistent styling */}
      {/* Left Section - Greeting */}
      <div className="nav-left">
        <h2 className="admin-greeting">🎓 Hello, {studentName}</h2>
      </div>

      {/* Center-Right Section - Student Links */}
      <div className="nav-center">
        <ul>
          <li><Link to="/student/courses">My Courses</Link></li>
          <li><Link to="/student/grades">Grades</Link></li>
          <li><Link to="/student/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Right Section - Logout Button */}
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default StudentNavbar;
