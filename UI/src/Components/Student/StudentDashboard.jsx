// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_COURSES, GET_USER_COURSES } from "../Graphql/Queries";
import { ENROLL_STUDENTS_TO_COURSE } from "../Graphql/Mutations";
import StudentNavbar from "./StudentNavbar";
import CourseCard from "../Course/CourseCard";
import StudentCourseModal from "../Course/StudentCourseModal";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isMyCourse, setIsMyCourse] = useState(false);

  // Fetch all courses and user-specific courses
  const { data: allCoursesData, refetch: refetchAllCourses } = useQuery(GET_ALL_COURSES);
  const { data: userCoursesData, refetch: refetchUserCourses } = useQuery(GET_USER_COURSES, {
    variables: { userId: "3" }, // Hardcoded userId for now
  });

  const [enrollStudent] = useMutation(ENROLL_STUDENTS_TO_COURSE, {
    onCompleted: () => {
      // After enrolling, refetch both the all courses and user's courses
      refetchAllCourses();
      refetchUserCourses();
      setSelectedCourse(null); // Reset the selected course
    },
  });

  // Handle course card click
  const handleCourseClick = (course, fromMyCourses = false) => {
    setSelectedCourse(course);
    setIsMyCourse(fromMyCourses);
  };

  // Enroll student in the course
  const handleEnroll = async (courseId) => {
    await enrollStudent({
      variables: {
        courseId,
        studentIds: "3", // Hardcoded studentId for now
      },
    });
  };

  // Filter out courses already in 'My Courses' from 'All Courses' list
  const availableCourses = allCoursesData?.getAllCourses.filter(
    (course) =>
      !userCoursesData?.getUserCourses.some((userCourse) => userCourse.id === course.id)
  );

  return (
    <div className="student-dashboard">
      <StudentNavbar />
      <div className="course-sections">
        {/* All Courses Section */}
        <div className="course-section">
          <h2>All Courses</h2>
          <div className="course-cards">
            {availableCourses?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseClick(course, false)}
              />
            ))}
          </div>
        </div>

        {/* My Courses Section */}
        <div className="course-section">
          <h2>My Courses</h2>
          <div className="course-cards">
            {userCoursesData?.getUserCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseClick(course, true)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <StudentCourseModal
          course={selectedCourse}
          isMyCourse={isMyCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnroll}
        />
      )}
    </div>
  );
}

export default StudentDashboard;
