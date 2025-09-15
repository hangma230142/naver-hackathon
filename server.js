// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", description: "Macbook Pro" },
  { id: 2, name: "Phone", description: "iPhone 15" },
];

let tasks = [
  { id: 1, title: "Do homework", deadline: "2025-09-15" },
  { id: 2, title: "Meeting with team", deadline: "2025-09-18" },
];

let habits = [
  { id: 1, name: "Morning Run", progress: ["2025-09-10", "2025-09-11"] },
];

let pomodoro = [
  { id: 1, task: "Study Math", duration: 25, date: "2025-09-12" },
];

// --- Products ---
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.map((p) =>
    p.id == id ? { ...p, ...req.body } : p
  );
  res.json(products.find((p) => p.id == id));
});
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id != id);
  res.json({ message: "Deleted" });
});

app.get("/api/tasks", (req, res) => res.json(tasks));
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ message: "Task not found" });
});
app.post("/api/tasks", (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  res.json(newTask);
});
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.map((t) => (t.id == id ? { ...t, ...req.body } : t));
  res.json(tasks.find((t) => t.id == id));
});
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.json({ message: "Deleted" });
});

// --- Habits ---
app.get("/api/habits", (req, res) => res.json(habits));
app.post("/api/habits", (req, res) => {
  const newHabit = { id: Date.now(), ...req.body, progress: [] };
  habits.push(newHabit);
  res.json(newHabit);
});
app.patch("/api/habits/:id", (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  habits = habits.map((h) =>
    h.id == id ? { ...h, progress: [...h.progress, date] } : h
  );
  res.json(habits.find((h) => h.id == id));
});
app.delete("/api/habits/:id", (req, res) => {
  const { id } = req.params;
  habits = habits.filter((h) => h.id != id);
  res.json({ message: "Deleted" });
});

app.get("/api/pomodoro", (req, res) => res.json(pomodoro));
app.post("/api/pomodoro", (req, res) => {
  const newSession = { id: Date.now(), ...req.body };
  pomodoro.push(newSession);
  res.json(newSession);
});
app.delete("/api/pomodoro/:id", (req, res) => {
  const { id } = req.params;
  pomodoro = pomodoro.filter((p) => p.id != id);
  res.json({ message: "Deleted" });
});

// ===== Start =====
app.listen(4000, () =>
  console.log("✅ Backend running on http://localhost:4000")
);
app.get("/", (req, res) => {
  res.send("✅ Backend is running. Use /api/products, /api/tasks, /api/habits, /api/pomodoro");
});
