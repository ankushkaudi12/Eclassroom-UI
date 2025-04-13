/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CourseModal from "./CourseModal";
import "./CoursePage.css";
import { GET_ALL_COURSES } from "../Graphql/Queries";

const CoursePage = () => {
  const { data, loading, error } = useQuery(GET_ALL_COURSES);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mode, setMode] = useState("view");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setMode("view");
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedCourse(null);
    setMode("add");
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="course-page">
      <h2>Course Management</h2>
      <button className="add-course-btn" onClick={handleAddClick}>Add Course</button>

      <div className="course-card-container">
        {data.getAllCourses.map((course) => (
          <div key={course.id} className="course-card" onClick={() => handleCardClick(course)}>
            <h3>{course.title}</h3>
            <p>{course.duration} weeks</p>
          </div>
        ))}
      </div>

      <CourseModal show={showModal} onClose={handleClose} mode={mode} course={selectedCourse} />
    </div>
  );
};

export default CoursePage;
