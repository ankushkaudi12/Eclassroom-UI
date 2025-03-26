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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("classroom_id", "1"); // Example classroom_id (modify if needed)

    // Only append the file if one is selected
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/announcements/add",
        {
          method: "POST",
          body: formData, // Sending as FormData (important for file uploads)
        }
      );

      if (response.ok) {
        alert("✅ Announcement added successfully!");
        setShowModal(false);
      } else {
        console.error("❌ Failed to add announcement");
        alert("❌ Error adding announcement. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Something went wrong.");
    }

    // Clear form fields
    setSubject("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="announcements-container">
      <div className="announcement-header">
        <h2>Announcements Section</h2>
      </div>
      <div className="add-announcement-button">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Announcement
        </button>
      </div>

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
