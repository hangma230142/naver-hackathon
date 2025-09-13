import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Landinglayout from "./layouts/Landinglayout";

// import tất cả pages
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
import Collaborationpage from "./pages/Collaborationpage";
import Habittrackingpage from "./pages/Habittrackingpage";
import Stasticspage from "./pages/Stasticspage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landinglayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "product", element: <Product /> },
      { path: "calendar", element: <Calendar /> },
      { path: "task-details", element: <TaskDetails /> },
      { path: "setting", element: <Setting /> },
      { path: "help-center", element: <HelpCenter /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "pomodoro", element: <Pomodoro /> },
      { path: "time-management", element: <TimeManagement /> },
      { path: "categories", element: <Categories /> },
      { path: "collaboration", element: <Collaborationpage /> },
      { path: "habit-tracking", element: <Habittrackingpage /> },
      { path: "statistics", element: <Stasticspage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
