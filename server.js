const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const { getConnection } = require('./db');

const app = express();
const PORT = 3001;
app.use(cors({
      origin: ['http://127.0.0.1:5501', 'http://localhost:5501'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));        
app.use(express.json());

// ── TEST ──────────────────────────────────────
app.get('/api/test', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    res.status(200).json({ success: true, message: "Oracle Database connected!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── READ — Saare prompts ──────────────────────
app.get('/api/prompts', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT id, category, difficulty, prompt_text FROM prompts ORDER BY category`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    // Manually clean rows
    const rows = result.rows.map(row => ({
      id: row.ID,
      category: row.CATEGORY,
      difficulty: row.DIFFICULTY,
      prompt_text: row.PROMPT_TEXT
    }));
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── READ — Category ke prompts ────────────────
app.get('/api/prompts/:category', async (req, res) => {
  let connection;
  try {
    const { category } = req.params;
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT id, category, difficulty, prompt_text FROM prompts WHERE category = :cat`,
      { cat: category },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: `Category '${category}' not found` });
    }
    const rows = result.rows.map(row => ({
      id: row.ID,
      category: row.CATEGORY,
      difficulty: row.DIFFICULTY,
      prompt_text: row.PROMPT_TEXT
    }));
    res.status(200).json({ success: true, category, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── CREATE — Naya prompt ──────────────────────
app.post('/api/prompts', async (req, res) => {
  let connection;
  try {
    const { category, difficulty, prompt_text } = req.body;
    if (!category || !difficulty || !prompt_text) {
      return res.status(400).json({ success: false, error: "All fields required: category, difficulty, prompt_text" });
    }
    connection = await getConnection();
    await connection.execute(
      `INSERT INTO prompts (category, difficulty, prompt_text) VALUES (:cat, :diff, :txt)`,
      { cat: category, diff: difficulty, txt: prompt_text },
      { autoCommit: true }
    );
    res.status(201).json({ success: true, message: "Prompt added!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── UPDATE — Prompt update ────────────────────
app.put('/api/prompts/:id', async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const { prompt_text } = req.body;
    if (!prompt_text) {
      return res.status(400).json({ success: false, error: "prompt_text is required" });
    }
    connection = await getConnection();
    const result = await connection.execute(
      `UPDATE prompts SET prompt_text = :txt WHERE id = :id`,
      { txt: prompt_text, id: Number(id) },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: `Prompt id ${id} not found` });
    }
    res.status(200).json({ success: true, message: "Prompt updated!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── DELETE — Prompt delete ────────────────────
app.delete('/api/prompts/:id', async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();
    const result = await connection.execute(
      `DELETE FROM prompts WHERE id = :id`,
      { id: Number(id) },
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: `Prompt id ${id} not found` });
    }
    res.status(200).json({ success: true, message: "Prompt deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── CREATE — Contact ──────────────────────────
app.post('/api/contact', async (req, res) => {
  let connection;
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }
    connection = await getConnection();
    await connection.execute(
      `INSERT INTO contacts (name, email, message) VALUES (:name, :email, :msg)`,
      { name, email, msg: message },
      { autoCommit: true }
    );
    res.status(201).json({ success: true, message: "Contact saved to database!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── READ — Saare contacts ─────────────────────
app.get('/api/contacts', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    const rows = result.rows.map(row => ({
      id: row.ID,
      name: row.NAME,
      email: row.EMAIL,
      message: row.MESSAGE,
      created_at: row.CREATED_AT
    }));
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// ── 404 ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});