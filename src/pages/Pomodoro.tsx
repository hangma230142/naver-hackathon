import { useEffect, useState } from "react";
import axios from "axios";

export default function Pomodoro() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [task, setTask] = useState("");
  const [duration, setDuration] = useState(25);

  useEffect(() => {
    axios.get("http://localhost:4000/api/pomodoro").then((res) => {
      setSessions(res.data);
    });
  }, []);

  const addSession = () => {
    const newSession = {
      task,
      duration,
      date: new Date().toISOString().slice(0, 10),
    };
    axios
      .post("http://localhost:4000/api/pomodoro", newSession)
      .then((res) => setSessions([...sessions, res.data]));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">⏳ Pomodoro</h1>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.task} - {s.duration} mins on {s.date}
          </li>
        ))}
      </ul>

      <input
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <button onClick={addSession}>Start</button>
    </div>
  );
}
