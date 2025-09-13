import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/" style={{ marginRight: 12 }}>Home</Link>
      <Link to="/task-details" style={{ marginRight: 12 }}>Task Details</Link>
      <Link to="/product" style={{ marginRight: 12 }}>Product</Link>
      <Link to="/calendar" style={{ marginRight: 12 }}>Calendar</Link>
      <Link to="/collaboration" style={{ marginRight: 12 }}>Collaboration</Link>
      <Link to="/habit-tracking" style={{ marginRight: 12 }}>Habit Tracking</Link>
      <Link to="/statistics" style={{ marginRight: 12 }}>Statistics</Link>
    </nav>
  );
};

export default Navbar;
