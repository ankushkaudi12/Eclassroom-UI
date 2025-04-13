/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./StudentModal.css";

function StudentModal({
  showModal,
  handleClose,
  action,
  studentData,
  handleSubmit,
  handleDelete,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [role, setRole] = useState("STUDENT");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (action === "display" && studentData) {
      setFirstName(studentData.firstName);
      setLastName(studentData.lastName);
      setEmail(studentData.email);
      setDob(studentData.dob);
      setPhoneNumber(studentData.phoneNumber);
      setStatus(studentData.status);
      setGender(studentData.gender);
      setRole(studentData.role)
    }
  }, [action, studentData]);

  if (!showModal) return null; // Don't render the modal if `showModal` is false

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const student = { firstName, lastName, email, dob, phoneNumber, status, gender, role };
    handleSubmit(student);
  };

  const handleDeleteClick = () => {
    handleDelete(studentData.id); // Assuming studentData has an `id`
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>

        {action === "add" && (
          <>
            <h2>Add New faculty</h2>
            <form onSubmit={handleFormSubmit}>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />

              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              
              <button type="submit">Add faculty</button>
            </form>
          </>
        )}

        {action === "display" && studentData && (
          <>
            <h2>Student Details</h2>
            <div className="student-details">
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Date of Birth:</strong> {dob}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
              <p><strong>Gender:</strong> {gender}</p>
            </div>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Delete Student
            </button>
          </>
        )}

        {action === "delete" && (
          <>
            <h2>Are you sure you want to delete this student?</h2>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Yes, Delete
            </button>
            <button className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentModal;
