import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "./SideNavBar";

const LayoutWithSidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Show SideNavBar only on routes ending with :clubID
    //const showSideNavBar = /\/club\/[^/]+/.test(location.pathname);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <SideNavBar
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content */}
            <div
                className={`main-content ${isCollapsed ? "collapsed" : ""}`}
                style={{
                    flex: 1,
                    padding: "20px",
                    transition: "margin-left 0.3s ease",
                }}
            >
                <Outlet /> {/* Child routes render here */}
            </div>
        </div>
    );
};

export default LayoutWithSidebar;
