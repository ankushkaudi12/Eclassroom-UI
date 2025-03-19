import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Chat from "../Chat"; // Ensure correct path
import AdminAnnouncements from "./AdminAnnouncements"; // Ensure correct path
import "./AdminDashboard.css"; // Import CSS file for styling

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("chat"); // Default section

  return (
    <div>
      <AdminNavbar adminName="John Doe" />

      {/* Tabs */}
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
      </div>

      {/* Content Rendering */}
      <div className="content">
        {activeSection === "announcements" ? <AdminAnnouncements /> : <Chat />}
      </div>
    </div>
  );
};

export default Dashboard;
