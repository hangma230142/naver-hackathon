import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Calendar from "./pages/Calendar";
import Pomodoro from "./pages/Pomodoro";
import TimeManagement from "./pages/TimeManagement";
import Categories from "./pages/Categories";
import Setting from "./pages/Setting";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";
import Collaborationpage from "./pages/Collaborationpage";
import Habittrackingpage from "./pages/Habittrackingpage";
import Stasticspage from "./pages/Stasticspage";

import Mainlayout from "./layouts/Mainlayout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout cha */}
        <Route path="/" element={<Mainlayout />}>
          {/* Các page con */}
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="time-management" element={<TimeManagement />} />
          <Route path="categories" element={<Categories />} />
          <Route path="collaboration" element={<Collaborationpage />} />
          <Route path="habit-tracking" element={<Habittrackingpage />} />
          <Route path="statistics" element={<Stasticspage />} />
          <Route path="settings" element={<Setting />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

