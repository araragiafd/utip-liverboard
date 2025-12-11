const { Service } = require('node-windows');
const path = require('path');

// サービスオブジェクトを作成
const svc = new Service({
  name: 'utip ライバー掲示板',
  description: 'utip ライバー事務所の掲示板サイト',
  script: path.join(__dirname, 'index.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

// サービスがインストールされていない場合にインストール
svc.on('install', function() {
  console.log('✅ サービスがインストールされました');
  console.log('🚀 サービスを開始します...');
  svc.start();
});

// サービスが既に存在する場合
svc.on('alreadyinstalled', function() {
  console.log('ℹ️ サービスは既にインストールされています');
  console.log('🔄 サービスを再起動します...');
  svc.restart();
});

// サービス開始時
svc.on('start', function() {
  console.log('🎉 utip ライバー掲示板サービスが開始されました！');
  console.log('🌐 アクセス: http://localhost:5000');
});

// エラー処理
svc.on('error', function(err) {
  console.error('❌ サービスエラー:', err);
});

// サービスをインストール
console.log('📦 Windowsサービスをインストール中...');
svc.install();