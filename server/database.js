const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'liverboard.db');
const db = new sqlite3.Database(dbPath);

const init = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // ライバーテーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS livers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          avatar TEXT,
          description TEXT,
          twitter_url TEXT,
          youtube_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 投稿テーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          liver_id INTEGER,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          author_name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (liver_id) REFERENCES livers (id)
        )
      `);

      // 返信テーブル
      db.run(`
        CREATE TABLE IF NOT EXISTS replies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER,
          content TEXT NOT NULL,
          author_name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES posts (id)
        )
      `);

      // サンプルデータ挿入
      db.get("SELECT COUNT(*) as count FROM livers", (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (row.count === 0) {
          const sampleLivers = [
            ['山田花子', '/images/avatar1.jpg', 'ゲーム配信が得意なライバーです', 'https://twitter.com/yamada', 'https://youtube.com/yamada'],
            ['田中太郎', '/images/avatar2.jpg', '歌配信メインのライバーです', 'https://twitter.com/tanaka', 'https://youtube.com/tanaka'],
            ['佐藤美咲', '/images/avatar3.jpg', '雑談配信が人気のライバーです', 'https://twitter.com/sato', 'https://youtube.com/sato']
          ];

          const stmt = db.prepare("INSERT INTO livers (name, avatar, description, twitter_url, youtube_url) VALUES (?, ?, ?, ?, ?)");
          sampleLivers.forEach(liver => {
            stmt.run(liver);
          });
          stmt.finalize();
        }
        
        resolve();
      });
    });
  });
};

module.exports = { db, init };