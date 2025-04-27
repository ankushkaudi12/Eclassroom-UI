/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS_SPECIFIC } from "../Graphql/Queries"; // Import the query
import { REGISTER_USER } from "../Graphql/Mutations"; // Import the mutation
import FacultyModal from "./FacultyModal";
import AdminNavbar from "./AdminNavbar";
import "./AdminFaculty.css"; // Import the updated CSS file

function AdminFaculty() {
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [action, setAction] = useState("add"); // Action type: 'add', 'display', or 'delete'
  const [facultyData, setFacultyData] = useState(null); // Store Faculty data (for display/delete)
  const [registerUser] = useMutation(REGISTER_USER); // GraphQL mutation hook

  // Fetch faculty using the query
  const { loading, error, data } = useQuery(GET_USERS_SPECIFIC, {
    variables: { role: "TEACHER" }, 
  });

  // Open modal in "add" mode
  const openAddModal = () => {
    setAction("add");
    setShowModal(true);
  };

  // Open modal in "display" mode with faculty data
  const openDisplayModal = (faculty) => {
    setAction("display");
    setFacultyData(faculty);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setAction("add");
    setFacultyData(null); // Clear faculty data when modal closes
  };

  // Handle adding a new faculty
  const handleAddFaculty = async (newFaculty) => {
    console.log("Adding new Faculty:", newFaculty);
    try {
      const { data } = await registerUser({
        variables: {
          userInput: {
            firstName: newFaculty.firstName,
            lastName: newFaculty.lastName,
            email: newFaculty.email,
            dob: newFaculty.dob,
            phoneNumber: newFaculty.phoneNumber,
            gender: newFaculty.gender,
            role: newFaculty.role,
            status: newFaculty.status,
            password: newFaculty.password, // Added password
            creatorId: 0 // Modify to get creatorId from local storage if needed
          },
        },
        refetchQueries: [
          {
            query: GET_USERS_SPECIFIC,
            variables: { role: "TEACHER" }, 
          },
        ],
      });

      alert("Faculty registered successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Registration error:", err.message);
      alert("Failed to register faculty");
    }
  };

  // Render loading or error states
  if (loading) return <p>Loading faculty...</p>;
  if (error) return <p>Error loading faculty: {error.message}</p>;

  return (
    <>
      <AdminNavbar adminName={"John Doe"} />
      <div className="admin-faculty-container">
        {/* Button for adding a faculty */}
        <button className="add-faculty-btn" onClick={openAddModal}>
          Add Faculty
        </button>

        {/* Table to display faculty */}
        <table className="faculty-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.getUsersSpecific.map((faculty) => (
              <tr key={faculty.id} onClick={() => openDisplayModal(faculty)}>
                <td>{faculty.firstName}</td>
                <td>{faculty.lastName}</td>
                <td>{faculty.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding or displaying faculty */}
        <FacultyModal
          showModal={showModal}
          handleClose={handleCloseModal}
          action={action}
          facultyData={facultyData}
          handleSubmit={handleAddFaculty}
        />
      </div>
    </>
  );
}

export default AdminFaculty;
