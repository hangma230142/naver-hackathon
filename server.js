import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ========== SAMPLE DATA ==========
let products = [
  { id: 1, name: "Pen", price: 10 },
  { id: 2, name: "Notebook", price: 20 },
];

let pomodoro = [
  { id: 1, task: "Study Math", duration: 25, date: "2025-09-12" },
];

// ========== ROUTES ==========
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/pomodoro", (req, res) => {
  res.json(pomodoro);
});

// ========== START SERVER ==========
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
