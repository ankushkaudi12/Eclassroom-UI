/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./FacultyModal.css";

function FacultyModal({
  showModal,
  handleClose,
  action,
  facultyData,
  handleSubmit,
  handleDelete,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [role, setRole] = useState("TEACHER");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (action === "display" && facultyData) {
      setFirstName(facultyData.firstName);
      setLastName(facultyData.lastName);
      setEmail(facultyData.email);
      setDob(facultyData.dob);
      setPhoneNumber(facultyData.phoneNumber);
      setStatus(facultyData.status);
      setGender(facultyData.gender);
      setRole(facultyData.role)
    }
  }, [action, facultyData]);

  if (!showModal) return null; // Don't render the modal if `showModal` is false

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const faculty = { firstName, lastName, email, dob, phoneNumber, status, gender, role };
    handleSubmit(faculty);
  };

  const handleDeleteClick = () => {
    handleDelete(facultyData.id); // Assuming facultyData has an `id`
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

        {action === "display" && facultyData && (
          <>
            <h2>faculty Details</h2>
            <div className="faculty-details">
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Date of Birth:</strong> {dob}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
              <p><strong>Gender:</strong> {gender}</p>
            </div>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Delete faculty
            </button>
          </>
        )}

        {action === "delete" && (
          <>
            <h2>Are you sure you want to delete this faculty?</h2>
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

export default FacultyModal;
