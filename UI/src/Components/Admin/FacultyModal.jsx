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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (action === "display" && facultyData) {
      setName(facultyData.name);
      setEmail(facultyData.email);
      setDob(facultyData.dob);
      setGender(facultyData.gender);
      setCourse(facultyData.course);
    }
  }, [action, facultyData]);

  if (!showModal) return null; // Don't render the modal if `showModal` is false

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const faculty = { name, email, dob, gender, course };
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
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              <label>Course:</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
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
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Date of Birth:</strong> {dob}</p>
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>Course:</strong> {course}</p>
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
