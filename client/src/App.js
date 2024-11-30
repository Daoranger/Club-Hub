// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext"
import PrivateRoutes from "./utils/PrivateRoutes";
import "./styles.css";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ClubHomePage from "./pages/ClubHomePage";
import ThreadPage from "./pages/ThreadPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Navbar from "./components/NavBar";
import IndividualThreadPage from "./pages/IndividualThreadPage";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/club/:clubID" element={<ClubHomePage />}/>
              <Route path="/threads/:threadID" element={<ThreadPage />} />
              <Route path="/create-thread/:clubID" element={<CreateThreadPage />} />
              <Route path="/chatroom/:chatroomID" element={<ChatRoomPage />} />
              <Route path="/thread/:threadID" element={<IndividualThreadPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>  
  );
}

export default App;
