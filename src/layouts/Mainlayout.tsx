import React from "react";
import { Link, Outlet } from "react-router-dom";
const Mainlayout: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav
        style={{
          width: "220px",
          background: "#ddb4ffff",
          color: "white",
          padding: "1rem",
        }}
      >
        <h2>Student Life Manager</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white" }}>Home</Link></li>
          <li><Link to="/product" style={{ color: "white" }}>Product</Link></li>
          <li><Link to="/calendar" style={{ color: "white" }}>Calendar</Link></li>
          <li><Link to="/pomodoro" style={{ color: "white" }}>Pomodoro</Link></li>
          <li><Link to="/time-management" style={{ color: "white" }}>Time Management</Link></li>
          <li><Link to="/categories" style={{ color: "white" }}>Categories</Link></li>
          <li><Link to="/collaboration" style={{ color: "white" }}>Collaboration</Link></li>
          <li><Link to="/habit-tracking" style={{ color: "white" }}>Habit Tracking</Link></li>
          <li><Link to="/statistics" style={{ color: "white" }}>Statistics</Link></li>
          <li><Link to="/settings" style={{ color: "white" }}>Settings</Link></li>
          <li><Link to="/help" style={{ color: "white" }}>Help Center</Link></li>
          <li><Link to="/about" style={{ color: "white" }}>About Us</Link></li>
        </ul>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};
export default Mainlayout;
