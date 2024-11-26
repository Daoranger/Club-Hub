// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ClubHomePage from "./pages/ClubHomePage";
import ThreadPage from "./pages/ThreadPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Navbar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext"
import "./styles.css";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/club=:CID" element={<ClubHomePage />}>
              <Route path="threads=:TRID" element={<ThreadPage />} />
              <Route path="create-thread" element={<CreateThreadPage />} />
              <Route path="chatroom=:CRID" element={<ChatRoomPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>  
  );
}

export default App;
