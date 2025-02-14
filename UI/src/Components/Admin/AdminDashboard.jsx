import React from "react";
import AdminNavbar from "./AdminNavbar"; // Import the navbar

function AdminDashboard() {
  const adminName = "John Doe"; // Fetch from backend if needed

  return (
    <div>
      <AdminNavbar adminName={adminName} /> {/* Pass Admin Name */}
      <h1>Welcome to Admin Dashboard</h1>
      {/* Other Admin Dashboard Content */}
    </div>
  );
}

export default AdminDashboard;
