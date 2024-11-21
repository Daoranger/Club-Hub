import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatRoomPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/messages");
        setMessages(res.data);
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
      await axios.post("http://localhost:8800/messages", {message: message})
      .then(data => {
        console.log(data);
        setMessage("");
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


  return (
    <div>
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
        <input
          className={`text-area`}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "80%",
            borderRadius: "5px",
            border: "1px solid #ccc",
        }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoomPage;
