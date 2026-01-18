import express from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db.js";

const app = express();
app.use(express.json());

app.post("/expenses", (req, res) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing Idempotency-Key" });
  }

  const { amount, category, description, date } = req.body;

  if (!amount || amount <= 0 || !category || !date) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const existing = db
    .prepare("SELECT * FROM expenses WHERE idempotency_key = ?")
    .get(idempotencyKey);

  if (existing) {
    return res.json(existing);
  }

  const expense = {
    id: uuidv4(),
    idempotency_key: idempotencyKey,
    amount,
    category,
    description,
    date
  };

  db.prepare(`
    INSERT INTO expenses (id, idempotency_key, amount, category, description, date)
    VALUES (@id, @idempotency_key, @amount, @category, @description, @date)
  `).run(expense);

  res.status(201).json(expense);
});

app.get("/expenses", (req, res) => {
  const { category, sort } = req.query;

  let query = "SELECT * FROM expenses";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  const expenses = db.prepare(query).all(...params);
  res.json(expenses);
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
