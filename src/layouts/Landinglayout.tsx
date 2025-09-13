// src/layouts/LandingLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingLayout: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ background: "#fff", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Student Life Manager</h1>
          <Navbar />
        </div>
      </header>

      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>

      <footer style={{ padding: 12, textAlign: "center", background: "#f6f6f6" }}>
        © 2025 Student Life Manager
      </footer>
    </div>
  );
};

export default LandingLayout;
