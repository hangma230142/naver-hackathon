import React, { useState } from "react";

const Habittrackingpage: React.FC = () => {
  const [habits, setHabits] = useState<string[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([...habits, newHabit]);
    setNewHabit("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Tracking</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {habits.map((habit, idx) => (
          <li
            key={idx}
            className="p-2 border rounded bg-gray-50"
          >
            {habit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habittrackingpage;
