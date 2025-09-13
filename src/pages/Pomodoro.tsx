// src/pages/Pomodoro.tsx
import React, { useState, useEffect } from "react";

const Pomodoro: React.FC = () => {
  const [time, setTime] = useState(25 * 60); // 25 phút
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const reset = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
      <div className="space-x-2">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-yellow-500 px-4 py-2 rounded text-white"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
