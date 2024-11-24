// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import ThreadPage from "./pages/ThreadPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Navbar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thread" element={<ThreadPage />} />
          <Route path="/create-thread" element={<CreateThreadPage />} />
          <Route path="/chatroom" element={<ChatRoomPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
