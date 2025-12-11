const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// API ルート
app.use('/api/livers', require('./routes/livers'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/admin', require('./routes/admin'));

// React アプリケーションの配信
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// データベース初期化
db.init().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
    console.log(`ローカルアクセス: http://localhost:${PORT}`);
    console.log(`ネットワークアクセス: http://[あなたのIPアドレス]:${PORT}`);
  });
}).catch(err => {
  console.error('データベース初期化エラー:', err);
});