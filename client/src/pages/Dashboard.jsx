import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const { darkMode } = useTheme();

  // State to store clubs
  const [clubs, setClubs] = useState([
    { name: "Photography Club", description: "Capture the world through your lens!" },
    { name: "Chess Club", description: "Strategize and compete with fellow players." },
  ]);

  // State for the new club form
  const [newClub, setNewClub] = useState({ name: "", description: "" });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClub((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newClub.name && newClub.description) {
      setClubs((prev) => [...prev, newClub]); // Add new club to the list
      setNewClub({ name: "", description: "" }); // Reset the form
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> My Clubs</h1>
      {/* List of clubs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {clubs.map((club, index) => (
          <div
            className={`club-card ${darkMode ? "dark-mode" : "light-mode"}`}
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "200px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{club.name}</h3>
            <p>{club.description}</p>
          </div>
        ))}
      </div>
      {/* Form to add new club */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h2>Add a New Club</h2>
        <input
          type="text"
          name="name"
          value={newClub.name}
          onChange={handleChange}
          placeholder="Club Name"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="description"
          value={newClub.description}
          onChange={handleChange}
          placeholder="Club Description"
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "300px",
            height: "100px",
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
          Add Club
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
