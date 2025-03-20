import React from "react";
import Chat from "../Chat";
import StudentNavbar from "./StudentNavbar";

function StudentDashboard() {
  return (
    <div>
      <StudentNavbar studentName="William" />
      <h1>Student Dashboard</h1>
    </div>
  );
}

export default StudentDashboard;
