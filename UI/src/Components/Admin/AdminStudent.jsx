/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS_SPECIFIC } from "../Graphql/Queries";
import { REGISTER_USER } from "../Graphql/Mutations" // Import the query
import StudentModal from "./StudentModal";
import AdminNavbar from "./AdminNavbar";
import "./AdminStudent.css"; // Import the updated CSS file

function AdminStudent() {
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [action, setAction] = useState("add"); // Action type: 'add', 'display', or 'delete'
  const [studentData, setStudentData] = useState(null); // Store student data (for display/delete)
  const [registerUser] = useMutation(REGISTER_USER)

  // Fetch students using the query
  const { loading, error, data } = useQuery(GET_USERS_SPECIFIC, {
    variables: { role: "STUDENT" }, // Passing 'STUDENT' role
  });

  // Open modal in "add" mode
  const openAddModal = () => {
    setAction("add");
    setShowModal(true);
  };

  // Open modal in "display" mode with student data
  const openDisplayModal = (student) => {
    setAction("display");
    setStudentData(student);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setAction("add")
    setStudentData(null); // Clear student data when modal closes
  };

  // Handle adding a new user
  const handleAddStudent = async (newStudent) => {
    console.log("Adding new student:", newStudent);
    try {
      const { data } = await registerUser({
        variables: {
          userInput: {
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
            email: newStudent.email,
            dob: newStudent.dob,
            phoneNumber: newStudent.phoneNumber,
            gender: newStudent.gender,
            role: newStudent.role,
            status: newStudent.status,
            password: newStudent.password,
            creatorId: 0 // need to modify and take from local storage
          },
        },
        refetchQueries: [
          {
            query: GET_USERS_SPECIFIC,
            variables: { role: "STUDENT" }, // Pass 'STUDENT' role for the student page
          },
        ],
      });
  
      alert("Student registered successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Registration error:", err.message);
      alert("Failed to register student");
    }
  };

  // Render loading or error states
  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students: {error.message}</p>;

  return (
    <>
      <AdminNavbar adminName={"John Doe"} />
      <div className="admin-student-container">
        {/* Button for adding a student */}
        <button className="add-student-btn" onClick={openAddModal}>
          Add Student
        </button>

        {/* Table to display students */}
        <table className="student-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.getUsersSpecific.map((student) => (
              <tr key={student.id} onClick={() => openDisplayModal(student)}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding or displaying student */}
        <StudentModal
          showModal={showModal}
          handleClose={handleCloseModal}
          action={action}
          studentData={studentData}
          handleSubmit={handleAddStudent}
        />
      </div>
    </>
  );
}

export default AdminStudent;
