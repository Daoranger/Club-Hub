import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import "../pages_css/SideNavBar.css";

function SideNavBar({ isCollapsed, toggleSidebar }) {
    const { darkMode } = useTheme();
    const { userID } = useUserContext();
    const { clubID } = useParams();
    const [chatrooms, setChatrooms] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Fetch chatrooms when the component mounts or clubID changes
    useEffect(() => {
        if (clubID) {
            axios
                .get("http://localhost:8800/chatrooms", { params: { CID: clubID } })
                .then((response) => {
                    setChatrooms(response.data); // Update chatrooms
                })
                .catch((error) => {
                    console.error("Error fetching chatrooms:", error);
                });
        }
    }, [clubID]);

    if (!userID) {
        return null;
    }

    return (
        <>
            {/* Sidebar */}
            <nav
                className={`side-navbar ${isCollapsed ? "collapsed" : ""}`}
                style={{
                    backgroundColor: darkMode ? "#333" : undefined,
                    color: darkMode ? "white" : undefined,
                }}
            >
                {!isCollapsed && (
                    <>
                        <h3>Club: {clubID}</h3>
                        <ul>
                            <li>
                                <Link to={`/threads/${clubID}`}>Threads</Link>
                            </li>
                            <li>
                                {/* Chatrooms Dropdown */}
                                <div
                                    className="dropdown"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <span className="dropdown-trigger">
                                        Chatrooms {isDropdownOpen ? "▲" : "▼"}
                                    </span>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu open">
                                            {chatrooms.length > 0 ? (
                                                chatrooms.map((chatroom) => (
                                                    <li key={chatroom.CRID}>
                                                        <Link to={`/chatroom/${chatroom.CRID}`}>
                                                            {chatroom.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No chatrooms available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </li>
                            <li>
                                <Link to={`/posts/${clubID}`}>Posts</Link>
                            </li>
                            <li>
                                <Link to={`/events/${clubID}`}>Events</Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav>

            {/* Toggle Button */}
            <button
                className={`sidebar-toggle-button ${
                    isCollapsed ? "collapsed" : "expanded"
                }`}
                onClick={toggleSidebar}
            >
                {isCollapsed ? "▶" : "◀"}
            </button>
        </>
    );
}

export default SideNavBar;
