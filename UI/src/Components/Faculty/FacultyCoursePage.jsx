/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcements from "../Announcements";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import Chat from "../Chat";
import Quiz from "../Quiz";
import Notes from "../Notes";
import FacultyNavbar from "./FacultyNavbar";
import "./FacultyCoursePage.css";

function FacultyCoursePage() {
  const location = useLocation();
  const course = location.state?.course; // Retrieve course data passed from the dashboard
  const [activeSection, setActiveSection] = useState("announcements");
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: "2" }, // Hardcoded userId for now
  });

  return (
    <div>
      {userData && <FacultyNavbar firstName={userData.getUser.firstName} lastName={userData.getUser.lastName}/>}
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
        <button
          className={activeSection === "notes" ? "active" : ""}
          onClick={() => setActiveSection("notes")}
        >
          Notes
        </button>
      </div>

      <div className="content">
        {activeSection === "announcements" && <Announcements course={course}/>}
        {activeSection === "chat" && <Chat course={course}/>}
        {activeSection === "quiz" && <Quiz course={course}/>}
        {activeSection === "notes" && <Notes course={course}/>}
      </div>
    </div>
  );
}

export default FacultyCoursePage;
