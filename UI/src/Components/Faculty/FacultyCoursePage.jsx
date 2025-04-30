/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcements from "../Announcements";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import { useParams } from "react-router-dom";
import CourseStudents from "../Course/CourseStudents";
import Chat from "../Chat";
import Quiz from "../Quiz";
import FacultyNavbar from "./FacultyNavbar";
import "./FacultyCoursePage.css";

function FacultyCoursePage() {
  const {facultyId,courseId} = useParams()
  const location = useLocation();
  const course = location.state?.course; // Retrieve course data passed from the dashboard
  const [activeSection, setActiveSection] = useState("announcements");
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: facultyId }, // Hardcoded userId for now
  });

  return (
    <div>
      {userData && <FacultyNavbar firstName={userData.getUser.firstName} lastName={userData.getUser.lastName} userId={facultyId}/>}
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
          className={activeSection === "students" ? "active" : ""} 
            onClick={() => setActiveSection("students")}
        >
              Students
        </button>
      </div>

      <div className="content">
        {activeSection === "announcements" && <Announcements course={course} />}
        {activeSection === "chat" && <Chat course={course} />}
        {activeSection === "quiz" && <Quiz course={course} />}
        {activeSection === "students" && <CourseStudents courseId={courseId} />} {/* ✅ Add this */}
      </div>
    </div>
  );
}

export default FacultyCoursePage;
