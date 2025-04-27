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
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [role, setRole] = useState("TEACHER");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState(""); // Added password field

  useEffect(() => {
    if (action === "display" && facultyData) {
      setFirstName(facultyData.firstName);
      setLastName(facultyData.lastName);
      setEmail(facultyData.email);
      setDob(facultyData.dob);
      setPhoneNumber(facultyData.phoneNumber);
      setStatus(facultyData.status);
      setGender(facultyData.gender);
      setRole(facultyData.role);
    } else if (action === "add") {
      // Reset form fields when switching to "add" mode
      setFirstName("");
      setLastName("");
      setEmail("");
      setDob("");
      setPhoneNumber("");
      setStatus("ACTIVE");
      setGender("");
      setRole("TEACHER");
      setPassword(""); // Make sure to reset the password as well
    }
  }, [action, facultyData]);

  if (!showModal) return null; // Don't render the modal if `showModal` is false

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const faculty = { firstName, lastName, email, dob, phoneNumber, status, gender, role, password };
    handleSubmit(faculty);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>

        {action === "add" && (
          <>
            <h2>Add New Faculty</h2>
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
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>

              <label>Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <label>Password:</label> {/* Added password field */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Add Faculty</button>
            </form>
          </>
        )}

        {action === "display" && facultyData && (
          <>
            <h2>Faculty Details</h2>
            <div className="faculty-details">
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Date of Birth:</strong> {dob ?? "NA"}</p>
              <p><strong>Phone Number:</strong> {phoneNumber ?? "NA"}</p>
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>Role:</strong> {facultyData.role}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FacultyModal;
