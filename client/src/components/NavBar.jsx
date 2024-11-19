// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`navbar ${darkMode ? "dark-mode" : "light-mode"}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <h2 className={darkMode ? "dark-mode" : "light-mode"} style={{ margin: 0 }}>Club Hub</h2>
      <div>
        <Link
          to="/"
          className={darkMode ? "dark-mode" : "light-mode"}
          style={{
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className={darkMode ? "dark-mode" : "light-mode"}
          style={{
            textDecoration: "none",
            marginRight: "15px",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          className={darkMode ? "dark-mode" : "light-mode"}
          style={{
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
            backgroundColor: darkMode ? "#ffffff": "#3c3c3c",
            color: darkMode ? "#000000" : "#ffffff",
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
