// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import { useParams } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import Announcements from "../Announcements";
import Chat from "../Chat";
import Quiz from "../Quiz";
import Notes from "../Notes";

function StudentCoursePage() {
  // eslint-disable-next-line no-unused-vars
  const {studentId,courseId} = useParams()
  const location = useLocation();
  const course = location.state?.course;
  const { data: userData } = useQuery(GET_USER, {
      variables: { id: studentId }, // Hardcoded userId for now
    });
  console.log(userData);
  console.log("studentId",studentId);

  
  const [activeSection, setActiveSection] = useState("announcements");
  return (
    <div>
      {userData && <StudentNavbar firstName={userData.getUser.firstName} lastName={userData.getUser.lastName} id={studentId}/>}
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
        {activeSection === "announcements" && <Announcements course={course} userId={studentId}/>}
        {activeSection === "chat" && <Chat course={course} userId={studentId}/>}
        {activeSection === "quiz" && <Quiz course={course} userId={studentId}/>}
        {activeSection === "notes" && <Notes course={course} userId={studentId}/>}
      </div>
    </div>
  );
}

export default StudentCoursePage;