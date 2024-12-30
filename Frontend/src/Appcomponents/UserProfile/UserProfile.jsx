import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Optional: for icons

const UserProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: isCollapsed ? "80px" : "250px",

        color: "black",
        transition: "width 0.3s",
        position: "relative",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid #444",
        }}
      >
        {!isCollapsed && (
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>Acme Inc</span>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, overflowY: "auto" }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <NavItem
            isCollapsed={isCollapsed}
            href="#home"
            icon={<FaHome />}
            label="Home"
          />
          <NavItem
            isCollapsed={isCollapsed}
            href="#profile"
            icon={<FaUser />}
            label="Profile"
          />
          <NavItem
            isCollapsed={isCollapsed}
            href="#settings"
            icon={<FaCog />}
            label="Settings"
          />
          <NavItem
            isCollapsed={isCollapsed}
            href="#logout"
            icon={<FaSignOutAlt />}
            label="Logout"
          />
        </ul>
      </nav>

      {/* Footer Section */}
      <div
        style={{
          borderTop: "1px solid #444",
          padding: "10px 20px",
          textAlign: isCollapsed ? "center" : "left",
        }}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            marginBottom: isCollapsed ? "0" : "10px",
          }}
        />
        {!isCollapsed && (
          <div>
            <p style={{ margin: 0, fontSize: "14px" }}>shadcn</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
              m@example.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ isCollapsed, href, icon, label }) => (
  <li>
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        textDecoration: "none",
        color: "black",
        fontSize: "16px",
        transition: "background-color 0.2s",
      }}
    >
      <span style={{ fontSize: "20px", marginRight: isCollapsed ? 0 : "10px" }}>
        {icon}
      </span>
      {!isCollapsed && label}
    </a>
  </li>
);

export default UserProfile;
