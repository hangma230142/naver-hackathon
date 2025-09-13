import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";

type Task = {
  id: number;
  title: string;
  deadline: string; // ISO string
  completed: boolean;
};

const TaskDetails: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [view, setView] = useState<"list" | "calendar" | "analytics">("list");

  // Load tasks từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Lưu tasks xuống localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDeadline("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDeadline(task.deadline);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    setTasks(tasks.map(t => 
      t.id === editingId ? { ...t, title, deadline } : t
    ));
    setEditingId(null);
    setTitle("");
    setDeadline("");
  };

  // ===== VIEWS =====
  const renderListView = () => (
    <div>
      {/* Form thêm/sửa task */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="border p-2 rounded"
        />
        {editingId ? (
          <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>
        ) : (
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        )}
      </div>

      {/* Danh sách task */}
      <ul className="space-y-2">
        {tasks.map(task => {
          const hoursLeft = task.deadline
            ? (new Date(task.deadline).getTime() - Date.now()) / 36e5
            : null;
          return (
            <li key={task.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className={task.completed ? "line-through" : ""}>
                  {task.title}
                </p>
                {task.deadline && (
                  <p className={`text-sm ${hoursLeft && hoursLeft < 24 ? "text-red-500" : "text-gray-500"}`}>
                    Deadline: {new Date(task.deadline).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => startEdit(task)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderCalendarView = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
      <Calendar />
      <ul className="mt-4 space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border p-2 rounded">
            <p>{task.title}</p>
            {task.deadline && <p className="text-sm">📅 {new Date(task.deadline).toLocaleString()}</p>}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderAnalyticsView = () => {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const pending = total - done;
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Analytics View</h2>
        <p>Total tasks: {total}</p>
        <p>✅ Completed: {done}</p>
        <p>⏳ Pending: {pending}</p>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Nút đổi view */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          List
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`px-4 py-2 rounded ${view === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Calendar
        </button>
        <button
          onClick={() => setView("analytics")}
          className={`px-4 py-2 rounded ${view === "analytics" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Analytics
        </button>
      </div>

      {/* Render view */}
      {view === "list" && renderListView()}
      {view === "calendar" && renderCalendarView()}
      {view === "analytics" && renderAnalyticsView()}
    </div>
  );
};

export default TaskDetails;
