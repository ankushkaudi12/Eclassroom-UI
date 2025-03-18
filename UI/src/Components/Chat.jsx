import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

function Chat() {
  const [comment, setComment] = useState("");

  function handleChange(event) {
    setComment(event.target.value); // Update state with input value
    console.log(event.target.value);
  }

  async function sendComment() {
    if (!comment.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/api/comments/add", {
        // Update URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: "1",
          sender: "John Doe",
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send comment: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server: ", data);

      setComment("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  }

  return (
    <div className="chat-container">
      {/* Chat input */}
      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={comment} // Controlled input
            onChange={handleChange} // Handle change
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
