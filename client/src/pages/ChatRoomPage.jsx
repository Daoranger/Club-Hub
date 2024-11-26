import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages_css/ChatRoom.css";
import { useUserContext } from "../context/UserContext";

function ChatRoomPage() {
  const { chatroomID: CRID } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyToContent, setReplyToContent] = useState("");
  const [replyToUser, setReplyToUser] = useState("");
  const inputRef = useRef(null);
  const { userID } = useUserContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8800/chatroom", {
          params: { CRID },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [CRID]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        await axios.post("http://localhost:8800/chatroom", {
          CRID: CRID,
          userID: userID,
          message: message,
          reply_to: replyTo,
        });
        setMessage("");
        setReplyTo(null);
        setReplyToContent("");
        const response = await axios.get("http://localhost:8800/chatroom", {
          params: { CRID },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleReply = (id, content, username) => {
    setReplyTo(id); // Use the correct message ID (MID)
    setReplyToContent(content);
    setReplyToUser(username);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-messages">
        {messages.map((msg) => (
          <div key={msg.message_id} className="message">
            <span className="message-username">{msg.username}</span>
            {/* Display the replied-to message */}
            {msg.reply_to && (
              <div className="replied-message">
                Replying to {msg.replied_user || "Unknown"}:{" "}
                {msg.replied_message || "Deleted Message"}
              </div>
            )}
            {/* Display the main message */}
            <div className="message-content">{msg.message}</div>
            <button
              className="reply-button"
              onClick={() =>
                handleReply(msg.message_id, msg.message, msg.username)
              }
            >
              Reply
            </button>
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chatroom-input">
        {replyTo && (
          <div className="reply-indicator">
            Replying to {replyToUser}: {replyToContent}{" "}
            <button onClick={() => setReplyTo(null)}>Cancel</button>
          </div>
        )}
        <div className="chat-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoomPage;