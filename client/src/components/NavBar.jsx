// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { userID, username, logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className={`navbar`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <Link
        to= {userID ? "/dashboard" : "/"}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <h2 style={{margin: "0px"}}>Club Hub{username ? ` for ${username}` : ""}</h2>
      </Link>
      <div>
        {!userID && (
          <Link
            to="/"
            style={{
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            Home
          </Link>
        )}
        {userID && (
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            Dashboard
          </Link>
        )}
        {userID ? (
          <button
              onClick={handleLogout}
              style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff6961", // soft red color
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "15px",
              }}
          >
              Logout
          </button>
        ) : (
          <Link
              to="/login"
              style={{
                  textDecoration: "none",
                  marginRight: "15px",
              }}
          >
              Login
          </Link>
        )}
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "5px 10px",
            backgroundColor: darkMode ? "white": "#3c3c3c",
            color: darkMode ? "black" : "white",
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
