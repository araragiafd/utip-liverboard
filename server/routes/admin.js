const express = require('express');
const { db } = require('../database');
const router = express.Router();

// ライバー追加
router.post('/livers', (req, res) => {
  const { name, avatar, description, twitter_url, youtube_url } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'ライバー名は必須です' });
    return;
  }
  
  db.run(
    "INSERT INTO livers (name, avatar, description, twitter_url, youtube_url) VALUES (?, ?, ?, ?, ?)",
    [name, avatar || null, description || null, twitter_url || null, youtube_url || null],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'ライバーが追加されました' });
    }
  );
});

// 投稿削除
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM posts WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: '投稿が見つかりません' });
      return;
    }
    res.json({ message: '投稿が削除されました' });
  });
});

// 返信削除
router.delete('/replies/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM replies WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: '返信が見つかりません' });
      return;
    }
    res.json({ message: '返信が削除されました' });
  });
});

module.exports = router;