import { useEffect, useState } from "react";
import axios from "axios";

export default function HabitTracker() {
  const [habits, setHabits] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/habits").then((res) => {
      setHabits(res.data);
    });
  }, []);

  const addHabit = () => {
    axios
      .post("http://localhost:4000/api/habits", { name })
      .then((res) => setHabits([...habits, res.data]));
  };

  const markDone = (id: number) => {
    const today = new Date().toISOString().slice(0, 10);
    axios
      .patch(`http://localhost:4000/api/habits/${id}`, { date: today })
      .then(() =>
        setHabits(
          habits.map((h) =>
            h.id === id ? { ...h, progress: [...h.progress, today] } : h
          )
        )
      );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">✅ Habit Tracker</h1>
      <ul>
        {habits.map((h) => (
          <li key={h.id}>
            {h.name} - Done: {h.progress.length} days
            <button onClick={() => markDone(h.id)}>Mark Today</button>
          </li>
        ))}
      </ul>

      <input
        placeholder="New Habit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addHabit}>Add</button>
    </div>
  );
}

