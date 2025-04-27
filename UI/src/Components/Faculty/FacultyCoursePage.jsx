/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcements from "../Announcements";
import Chat from "../Chat";
import Quiz from "../Quiz";
import FacultyNavbar from "./FacultyNavbar";
import "./FacultyCoursePage.css";

function FacultyCoursePage() {
  const location = useLocation();
  const course = location.state?.course; // Retrieve course data passed from the dashboard
  const [activeSection, setActiveSection] = useState("announcements");

  return (
    <div>
      <FacultyNavbar facultyName="Prof. Smith" />
      <div className="course-info">
        <h2>Course: {course.title}</h2>
        <p>Course ID: {course.id}</p>
      </div>

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

export default FacultyCoursePage;
