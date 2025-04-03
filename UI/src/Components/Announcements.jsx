import React, { useState, useEffect } from "react";
import "./Announcements.css"; // Importing the CSS file

function Announcements() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [announcements, setAnnouncements] = useState([]); // Store fetched announcements
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store any errors
  const classroomId = "1"; // Example classroom_id (Modify based on dynamic data)

  // Fetch Announcements on Component Mount
  useEffect(() => {
    console.log("Fetch announcements called");
    fetchAnnouncements();
  }, []); // Empty dependency array ensures it only runs on mount

  // Fetch Announcements function
  const fetchAnnouncements = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `http://localhost:3000/api/announcements/${classroomId}`
      );
      console.log("Fetch statements reached");

      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      const data = await response.json();
      setAnnouncements(data); // Update announcements state
      console.log("Fetched announcements data:", data);
    } catch (error) {
      console.error("❌ Error fetching announcements:", error);
      setError("Error fetching announcements"); // Set error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleDownload = (attachment) => {
    const downloadUrl = `http://localhost:3000/api/download/${attachment}`;

    fetch(downloadUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download file.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = attachment; // Ensure the correct filename is used
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("❌ Download error:", error));
  };

  // Handle file changes in the form
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Subject:", subject);
    console.log("Description:", description);

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("classroom_id", classroomId);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/announcements/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("✅ Announcement added successfully!");
        setShowModal(false);
        fetchAnnouncements(); // Refresh announcements after adding a new one
      } else {
        alert("❌ Error adding announcement. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Something went wrong.");
    }

    // Clear form fields after submission
    setSubject("");
    setDescription("");
    setFile(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/announcements/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("✅ Announcement deleted successfully!");
        fetchAnnouncements();
      } else {
        alert("❌ Error deleting announcement. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Something went wrong.");
    }
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
      {/* Announcements List */}
      {loading && <p>Loading announcements...</p>} {/* Show loading state */}
      {error && <p className="error">{error}</p>} {/* Show error state */}
      {!loading && !error && announcements.length === 0 && (
        <p>No announcements available.</p>
      )}
      <ul className="announcement-list">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="announcement-item">
            <h3>{announcement.subject}</h3>
            <p>{announcement.description}</p>
            <div className="announcement-actions">
              {announcement.attachment && (
                <a
                  href={`http://localhost:3000/api/download/${announcement.attachment}`}
                  className="download-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(
                      "📥 Downloading file from:",
                      `http://localhost:3000/api/download/${announcement.attachment}`
                    );
                    handleDownload(announcement.attachment);
                  }}
                >
                  📥 Download File
                </a>
              )}
              <button className="delete-btn" onClick={() => handleDelete(announcement.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Modal for Adding Announcement */}
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
