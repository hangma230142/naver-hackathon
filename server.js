// server.js
import express from "express";

const app = express();
const PORT = 3000;

// Fake data (có thể thay bằng DB sau này)
const todos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build a project", completed: true },
  { id: 3, title: "Deploy app", completed: false },
];

// Middleware cho phép JSON
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// API get one todo
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// API add new todo
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title || "Untitled",
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
