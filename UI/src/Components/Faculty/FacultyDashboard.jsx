/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_COURSES, GET_USER } from "../Graphql/Queries"; // Import the query
import { useNavigate } from "react-router-dom"; // Import useNavigate
import FacultyNavbar from "./FacultyNavbar";
import { useParams } from "react-router-dom";
import Announcements from "../Announcements";
import Chat from "../Chat";
import Quiz from "../Quiz";

function FacultyDashboard() {
  const { userId } = useParams();
  
  const [activeSection, setActiveSection] = useState("announcements");
  const navigate = useNavigate(); // Initialize the navigate hook
  const {data: userData} = useQuery(GET_USER, {
    variables: { id: userId }, 
  })
  console.log(userData);
  

   // Fetching user's courses using the GET_USER_COURSES query
  const { data, loading, error } = useQuery(GET_USER_COURSES, {
    variables: { userId: userId }, 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle course click and navigate to the course page
  const handleCourseClick = (course) => {
    navigate(`/faculty/course/${course.id}`, { state: { course } });
  };

  return (
    <div>
      {userData.getUser.role == "TEACHER" && <FacultyNavbar firstName={userData.getUser.firstName} lastName={userData.getUser.lastName} />}

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
