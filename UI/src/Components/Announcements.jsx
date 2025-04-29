import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./Graphql/Queries";
import "./Announcements.css";

function Announcements({ course }) {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: "1" }, // Hardcoded userId for now
  });
  console.log(userData);
  
  const classroomId = course.id;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/announcements/${classroomId}`
      );
      if (!response.ok) throw new Error("Failed to fetch announcements");
      const data = await response.json();
      setAnnouncements(data);
      console.log("Course: ");
      console.log(course);
      
      console.log("Announcements: " + data);
      
    } catch (error) {
      setError("Error fetching announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (attachment) => {
    const downloadUrl = `http://localhost:3000/api/download/${attachment}`;
    fetch(downloadUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to download file.");
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = attachment;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("❌ Download error:", err));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("classroom_id", classroomId);
    if (file) formData.append("file", file);

    const endpoint = editingId
      ? `http://localhost:3000/api/announcements/update/${editingId}`
      : "http://localhost:3000/api/announcements/add";

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Use POST for both add and update
        body: formData,
      });

      if (response.ok) {
        alert(
          editingId ? "✅ Announcement updated!" : "✅ Announcement added!"
        );
        resetForm();
        fetchAnnouncements();
      } else {
        alert("❌ Failed to submit announcement");
      }
    } catch (error) {
      alert("❌ Something went wrong");
    }
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
        alert("✅ Announcement deleted");
        fetchAnnouncements();
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      alert("❌ Server error");
    }
  };

  const handleEdit = (announcement) => {
    setSubject(announcement.subject);
    setDescription(announcement.description);
    setEditingId(announcement.id);
    setFile(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setSubject("");
    setDescription("");
    setFile(null);
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div className="announcements-container">
      <div className="announcement-header">
        <h2>Announcements Section</h2>
      </div>
      <div className="add-announcement-button">
        {userData && userData.getUser.role == "TEACHER" && <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Announcement
        </button>}
      </div>

      {loading && <p>Loading announcements...</p>}
      {error && <p className="error">{error}</p>}
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
                <button
                  className="download-btn"
                  onClick={() => handleDownload(announcement.attachment)}
                >
                  <span className="icon">📥</span>Download
                </button>
              )}
              {userData && userData.getUser.role == "TEACHER" &&<button
                className="edit-btn"
                onClick={() => handleEdit(announcement)}
              >
                ✏️ Edit
              </button>}
              {userData && userData.getUser.role == "TEACHER" && <button
                className="delete-btn"
                onClick={() => handleDelete(announcement.id)}
              >
                🗑️ Delete
              </button>}
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? "Edit Announcement" : "Add Announcement"}</h3>
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
                  {editingId ? "Update" : "Submit"}
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={resetForm}
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
