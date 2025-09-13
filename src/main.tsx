// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingLayout from "./layouts/Landinglayout";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Calendar from "./pages/Calendar";
import Collaborationpage from "./pages/Collaborationpage";
import Habbittrackingpage from "./pages/Habittrackingpage";
import Statisticspage from "./pages/Stasticspage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "product", element: <Product /> },
      { path: "calendar", element: <Calendar /> },
      { path: "collaboration", element: <Collaborationpage /> },
      { path: "habit-tracking", element: <Habbittrackingpage /> },
      { path: "statistics", element: <Statisticspage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

