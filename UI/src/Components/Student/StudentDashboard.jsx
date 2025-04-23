import React, { useState } from "react";
import StudentNavbar from "./StudentNavbar";
import Announcements from "../Announcements";
import Chat from "../Chat";
import Quiz from "../Quiz"; // Import the Quiz component

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("announcements");

  return (
    <div>
      <StudentNavbar facultyName="Prof. Smith" />
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
          className={activeSection === "quiz" ? "active" : ""}
          onClick={() => setActiveSection("quiz")}
        >
          Quiz
        </button>
      </div>

      <div className="content">
        {activeSection === "announcements" && <Announcements />}
        {activeSection === "chat" && <Chat />}
        {activeSection === "quiz" && <Quiz />}
      </div>
    </div>
  );
}

export default StudentDashboard;
