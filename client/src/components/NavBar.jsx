// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: darkMode ? "#1a1a1a" : "#2c3e50",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}>Club Hub</h2>
      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Login
        </Link>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "5px 10px",
            backgroundColor: darkMode ? "#555" : "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
