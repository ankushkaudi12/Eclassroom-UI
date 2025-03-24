import React, { useState } from "react";
import "./Announcements.css"; // Importing the CSS file

function Announcements() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Announcement Submitted:", { subject, description, file });

    // Clear fields after submission
    setSubject("");
    setDescription("");
    setFile(null);
    setShowModal(false);
  };

  return (
    <div className="announcements-container">
      <button className="add-btn" onClick={() => setShowModal(true)}>
        + Add Announcement
      </button>

      <h2>Announcements Section</h2>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Announcement</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Subject:
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Attach File:
                <input type="file" onChange={handleFileChange} />
              </label>
              <div className="modal-buttons">
                <button className="submit-btn" type="submit">
                  Submit
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcements;
