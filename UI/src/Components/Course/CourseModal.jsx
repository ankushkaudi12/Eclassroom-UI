/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import "./CourseModal.css";
import { SAVE_COURSE } from "../Graphql/Mutations";

const CourseModal = ({ show, onClose, mode, course }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [credits, setCredits] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const [saveCourse] = useMutation(SAVE_COURSE, {
    onCompleted: () => {
      alert("Course saved successfully!");
      onClose();
    },
    onError: (err) => {
      alert("Error saving course: " + err.message);
    },
  });

  useEffect(() => {
    if (mode === "view" && course) {
      setTitle(course.title);
      setDuration(course.duration);
      setCredits(course.credits);
      setFacultyId(course.facultyId || "");
    } else {
      setTitle("");
      setDuration("");
      setCredits("");
      setFacultyId("");
    }
  }, [mode, course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCourse({
      variables: {
        course: {
          title,
          duration,
          credits,
          facultyId: facultyId || null,
        },
      },
    });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>

        {mode === "view" ? (
          <>
            <h2>Course Details</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Duration:</strong> {duration} weeks</p>
            <p><strong>Credits:</strong> {credits}</p>
            <p><strong>Faculty ID:</strong> {facultyId}</p>
          </>
        ) : (
          <>
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" required />
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" required />
              <input type="text" value={credits} onChange={(e) => setCredits(e.target.value)} placeholder="Credits" required />
              <input type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} placeholder="Faculty ID (optional)" />
              <button type="submit">Save Course</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
