const express = require('express');
const { db } = require('../database');
const router = express.Router();

// 全ライバー取得
router.get('/', (req, res) => {
  db.all("SELECT * FROM livers ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 特定ライバー取得
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM livers WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'ライバーが見つかりません' });
      return;
    }
    res.json(row);
  });
});

module.exports = router;