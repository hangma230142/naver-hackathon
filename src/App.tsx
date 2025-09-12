import { Link } from "react-router-dom";

function App() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/task-details">Task Details</Link></li>
        <li><Link to="/setting">Setting</Link></li>
        <li><Link to="/help-center">Help Center</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/pomodoro">Pomodoro</Link></li>
        <li><Link to="/time-management">Time Management</Link></li>
        <li><Link to="/categories">Categories</Link></li>
      </ul>
    </nav>
  );
}

export default App;
