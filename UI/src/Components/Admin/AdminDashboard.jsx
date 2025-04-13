import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Chat from "../Chat";
import Announcements from "../Announcements";
import "./AdminDashboard.css";
import CoursePage from "../Course/CoursePage";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("announcements");

  return (
    <div>
      <AdminNavbar adminName="John Doe" />
      
      <div className="tabs">
        <button
          className={activeSection === "announcements" ? "active" : ""}
          onClick={() => setActiveSection("announcements")}
        >
          Announcements
        </button>
        <button
          className={activeSection === "chat" ? "active" : ""}
          onClick={() => setActiveSection("chat")}
        >
          Comments
        </button>
        <button
          className={activeSection === "courses" ? "active" : ""}
          onClick={() => setActiveSection("courses")}
        >
          Manage Courses
        </button>
      </div>

      <div className="content">
        {activeSection === "announcements" && <Announcements />}
        {activeSection === "chat" && <Chat />}
        {activeSection === "courses" && <CoursePage />}
      </div>
    </div>
  );
};

export default Dashboard;
