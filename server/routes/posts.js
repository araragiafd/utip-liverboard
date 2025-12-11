const express = require('express');
const { db } = require('../database');
const router = express.Router();

// ライバー別投稿一覧取得
router.get('/liver/:liverId', (req, res) => {
  const { liverId } = req.params;
  const query = `
    SELECT p.*, l.name as liver_name 
    FROM posts p 
    JOIN livers l ON p.liver_id = l.id 
    WHERE p.liver_id = ? 
    ORDER BY p.created_at DESC
  `;
  
  db.all(query, [liverId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 投稿詳細取得（返信含む）
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // 投稿取得
  db.get("SELECT p.*, l.name as liver_name FROM posts p JOIN livers l ON p.liver_id = l.id WHERE p.id = ?", [id], (err, post) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!post) {
      res.status(404).json({ error: '投稿が見つかりません' });
      return;
    }
    
    // 返信取得
    db.all("SELECT * FROM replies WHERE post_id = ? ORDER BY created_at ASC", [id], (err, replies) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({ ...post, replies });
    });
  });
});

// 新規投稿作成
router.post('/', (req, res) => {
  const { liver_id, title, content, author_name } = req.body;
  
  if (!liver_id || !title || !content || !author_name) {
    res.status(400).json({ error: '必要な項目が不足しています' });
    return;
  }
  
  db.run(
    "INSERT INTO posts (liver_id, title, content, author_name) VALUES (?, ?, ?, ?)",
    [liver_id, title, content, author_name],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: '投稿が作成されました' });
    }
  );
});

// 返信作成
router.post('/:id/replies', (req, res) => {
  const { id } = req.params;
  const { content, author_name } = req.body;
  
  if (!content || !author_name) {
    res.status(400).json({ error: '必要な項目が不足しています' });
    return;
  }
  
  db.run(
    "INSERT INTO replies (post_id, content, author_name) VALUES (?, ?, ?)",
    [id, content, author_name],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: '返信が作成されました' });
    }
  );
});

module.exports = router;