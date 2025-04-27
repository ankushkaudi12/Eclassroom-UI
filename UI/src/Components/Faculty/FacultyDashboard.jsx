/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_COURSES } from "../Graphql/Queries"; // Import the query
import { useNavigate } from "react-router-dom"; // Import useNavigate
import FacultyNavbar from "./FacultyNavbar";
import Announcements from "../Announcements";
import Chat from "../Chat";
import Quiz from "../Quiz";

function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState("announcements");
  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetching user's courses using the GET_USER_COURSES query
  const { data, loading, error } = useQuery(GET_USER_COURSES, {
    variables: { userId: "3" }, // Hardcoded userId, replace with dynamic value as needed
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle course click and navigate to the course page
  const handleCourseClick = (course) => {
    navigate(`/faculty/course/${course.id}`, { state: { course } });
  };

  return (
    <div>
      <FacultyNavbar facultyName="Prof. Smith" />

      {/* My Courses Section */}
      <div className="my-courses">
        <h3>My Courses</h3>
        <div>
          {data?.getUserCourses?.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)} // Navigate to course page
            >
              {course.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
