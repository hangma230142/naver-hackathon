import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Stasticspage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Statistics</h1>
      <p className="mb-2">Total tasks: {tasks.length}</p>
      <p className="mb-2 text-green-600">Completed: {completed}</p>
      <p className="mb-2 text-red-600">Pending: {pending}</p>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded h-4 mt-4">
        <div
          className="bg-blue-500 h-4 rounded"
          style={{ width: `${(completed / (tasks.length || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Stasticspage;
