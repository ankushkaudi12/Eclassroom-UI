import React from "react";
import { useState } from "react";
import FacultyNavbar from "./FacultyNavbar";
import Announcements from "../Announcements";
import Chat from "../Chat";

function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState("announcements");
  return (
    <div>
      <FacultyNavbar facultyName="Prof. Smith" />
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

      <div className="content">
        {activeSection === "announcements" ? <Announcements /> : <Chat />}
      </div>
    </div>
  );
}

export default FacultyDashboard;
