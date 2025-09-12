import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Calendar from "./pages/Calendar";
import TaskDetails from "./pages/TaskDetails";
import Setting from "./pages/Setting";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";
import Pomodoro from "./pages/Pomodoro";
import TimeManagement from "./pages/TimeManagement";
import Categories from "./pages/Categories";
import Stasticspage from "./pages/Stasticspage";
import Collaboration from "./pages/Collaborationpage";
import Habbittracking from "./pages/Habittrackingpage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/task-details" element={<TaskDetails />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/time-management" element={<TimeManagement />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/statistics" element={<Stasticspage />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/habbit-tracking" element={<Habbittracking />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

