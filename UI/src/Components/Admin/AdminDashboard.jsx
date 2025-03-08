import React from "react";
import AdminNavbar from "./AdminNavbar"; 

function AdminDashboard() {
  const adminName = "John Doe"; 

  return (
    <div>
      <AdminNavbar adminName={adminName} /> 
    </div>
  );
}

export default AdminDashboard;
