import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../ChatRoom.css";
import { UserContext } from "../context/UserContext"

function ChatRoomPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyToContent, setReplyToContent] = useState("");
  const [replyToUser, setReplyToUser] = useState("");
  const inputRef = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/messages");
        setMessages(res.data);
        console.log(messages.replied_message);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await axios.post("http://localhost:8800/messages", {username: user, message: message, reply_to: replyTo})
      .then(data => {
        console.log(data);
        setMessage("");
        setReplyTo(null);
        setReplyToContent("");
      })
      .catch(err => {
        console.log(`Error: ${err.response.data.errors[0].msg}`);
      });

      await axios.get("http://localhost:8800/messages")
      .then(res => {
        setMessages(res.data);
        console.log(messages);
      })
      .catch(err => {
        console.error(`Error: ${err.response.data.errors[0].msg}`);
      });
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleReply = (id, content, username) => {
    setReplyTo(id);
    setReplyToContent(content);
    setReplyToUser(username);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="chatroom-container">
      <div className="chatroom-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <span className="message-username">{msg.username}</span>
            {/* Display the replied-to message */}
            {msg.reply_to && (
              <div className="replied-message">
                Replying to {msg.replied_user || "Unknown"}: {msg.replied_message || "Deleted Message"}
              </div>
            )}
            {/* Display the main message */}
            <div className="message-content">{msg.message}</div>
            <button 
              className="reply-button"
              onClick={() => handleReply(msg.id, msg.message, msg.username)}
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
      <form
        onSubmit={sendMessage}
        className="chatroom-input"
      >
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
};

export default ChatRoomPage;
