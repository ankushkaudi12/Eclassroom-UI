import React, { useState } from "react";
import StudentModal from "./StudentModal";
import AdminNavbar from "./AdminNavbar";
import "./AdminStudent.css"; // Import the updated CSS file

function AdminStudent() {
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [action, setAction] = useState("add"); // Action type: 'add', 'display', or 'delete'
  const [studentData, setStudentData] = useState(null); // Store student data (for display/delete)

  // Open modal in "add" mode
  const openAddModal = () => {
    setAction("add");
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setStudentData(null); // Clear student data when modal closes
  };

  // Handle adding a new student (can later be linked to API or state)
  const handleAddStudent = (newStudent) => {
    console.log("Adding new student:", newStudent);
    handleCloseModal();
  };

  // Render the AdminStudent page with Add Student button
  return (
    <>
    <AdminNavbar adminName={"John Doe"} />
    <div className="admin-student-container">
      {/* Button for adding a student, placed at the top right */}
      <button className="add-student-btn" onClick={openAddModal}>
        Add Student
      </button>

      {/* Modal for adding new student */}
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
