import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const classroomId = "1"; // Change dynamically based on user selection

function Chat() {
  const [allComments, setAllComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [comment, setComment] = useState("");
  const [ws, setWs] = useState(null);
  const chatMessagesRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      socket.send(JSON.stringify({ type: "join", classroomId }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("📩 Received message:", message);

      if (message.type === "pastComments") {
        console.log("📜 Past comments received:", message.data);
        setAllComments(message.data);
        setDisplayedComments(message.data.slice(0, 7)); // Show the latest 7 comments
        setHasMore(message.data.length > 7);
      } else if (message.type === "newComment") {
        console.log("📌 New comment received:", message.data);
        setAllComments((prev) => [message.data, ...prev]);
        setDisplayedComments((prev) => [message.data, ...prev].slice(0, 7));
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  function handleChange(event) {
    setComment(event.target.value);
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) +
      " - " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }

  function sendComment() {
    if (!comment.trim() || !ws) return;

    const newMessage = {
      type: "newComment",
      classroomId,
      sender: "John Doe",
      comment,
      time: new Date().toISOString(),
    };

    console.log("📤 Sending new comment:", newMessage);
    ws.send(JSON.stringify(newMessage));
    setComment("");
  }

  return (
    <div className="page-container">
      {/* ✅ Top Section - You Can Add Other Content Here */}
      <div className="top-content">
        <h2>Classroom Discussion</h2>
        <p>Welcome to the class discussion. Share your thoughts below!</p>
      </div>

      {/* ✅ Chat Section (At Bottom) */}
      <div className="chat-container">
        <div className="chat-messages" ref={chatMessagesRef}>
          {displayedComments.map((msg, index) => (
            <div key={index} className="chat-message">
              <div className="chat-header">
                <strong>{msg.sender}</strong>
                <span className="chat-time">{formatDateTime(msg.time)}</span>
              </div>
              <div className="chat-text">{msg.comment}</div>
            </div>
          ))}
        </div>

        {/* ✅ Chat Input */}
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
    </div>
  );
}

export default Chat;
