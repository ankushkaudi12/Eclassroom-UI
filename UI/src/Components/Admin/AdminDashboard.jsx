import React from "react";
import AdminNavbar from "./AdminNavbar"; 
import Chat from '../Chat'

function AdminDashboard() {
  const adminName = "John Doe"; 

  return (
    <div>
      <AdminNavbar adminName={adminName} /> 
      <Chat />
    </div>
  );
}

export default AdminDashboard;
