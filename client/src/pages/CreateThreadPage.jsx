import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateThreadPage = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Question",
    "Discussion",
    "Announcements",
    "Events",
    "Suggestions",
    "Resources",
    "Social",
  ];

  const navigate = useNavigate(); // Get the navigate function
  const handleCreateThreadClick = () => {
    navigate("/thread"); // Navigate to the create thread page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle thread creation logic (e.g., sending data to backend)
    console.log("New thread created:", { threadTitle, threadContent, category });
  };

  const styles = {
    container: {
      width: "80%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    inputLabel: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#555",
      marginBottom: "8px",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#333",
    },
    inputFieldFocus: {
      borderColor: "#0079d3", // Blue border for focus
      outline: "none",
    },
    textareaField: {
      width: "100%",
      minHeight: "150px",
      padding: "12px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#333",
      resize: "vertical",
    },
    submitButton: {
      backgroundColor: "#0079d3",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "15px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    submitButtonHover: {
      backgroundColor: "#005fa3",
    },
    submitButtonActive: {
      backgroundColor: "#00487a",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create a New Thread</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="title" style={styles.inputLabel}>
            Thread Title
          </label>
          <input
            type="text"
            id="title"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            placeholder="Enter the title of your thread"
            style={styles.inputField}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFieldFocus.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="content" style={styles.inputLabel}>
            Thread Content
          </label>
          <textarea
            id="content"
            value={threadContent}
            onChange={(e) => setThreadContent(e.target.value)}
            placeholder="Write your thread content here"
            style={styles.textareaField}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="category" style={styles.inputLabel}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.inputField}
            required
          >
            <option value="">Select a category</option>
            {categories.map((categoryOption, index) => (
              <option key={index} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0079d3")}
          onMouseDown={(e) => (e.target.style.backgroundColor = styles.submitButtonActive.backgroundColor)}
          onMouseUp={(e) => (e.target.style.backgroundColor = "#0079d3")}
          onClick={handleCreateThreadClick}
        >
          Create Thread
        </button>
      </form>
    </div>
  );
};

export default CreateThreadPage;
