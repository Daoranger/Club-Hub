// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ThreadPage from "./pages/ThreadPage";
import Navbar from "./components/NavBar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./styles.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thread" element={<ThreadPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
