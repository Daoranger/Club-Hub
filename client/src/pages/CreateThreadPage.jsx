// src/pages/CreateThreadPage.js
import React, { useState } from "react";

function CreateThreadPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [threads, setThreads] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newThread = { title, content, id: threads.length + 1 };
      setThreads([...threads, newThread]);
      setTitle("");
      setContent("");
      alert("Thread Created!");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div>
      <h1>Create a Thread</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Thread</button>
      </form>
      <h2>All Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <h3>{thread.title}</h3>
            <p>{thread.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateThreadPage;
