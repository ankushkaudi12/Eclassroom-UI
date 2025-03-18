import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const classroomId = "1"; // Dynamically set this based on user selection

function Chat() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      // Send classroomId to server after connection
      socket.send(JSON.stringify({ type: "join", classroomId }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "pastComments") {
        setComments(message.data); // Load previous comments
      } else if (message.type === "newComment") {
        setComments((prev) => [...prev, message.data]); // Add new comment dynamically
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    setWs(socket);

    return () => socket.close(); // Cleanup WebSocket on component unmount
  }, []);

  function handleChange(event) {
    setComment(event.target.value);
  }

  function sendComment() {
    if (!comment.trim() || !ws) return;

    ws.send(
      JSON.stringify({
        type: "newComment",
        classroomId,
        sender: "John Doe",
        comment,
      })
    );

    setComment("");
  }

  return (
    <div className="chat-container">
      {/* Messages display */}
      <div className="chat-messages">
        {comments.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender}:</strong> {msg.comment}
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={comment}
            onChange={handleChange}
          />
          <button className="send-button" onClick={sendComment}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
