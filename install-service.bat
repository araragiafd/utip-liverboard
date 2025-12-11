@echo off
echo 🔧 Windowsサービスとして登録します...

REM PM2をグローバルインストール
echo 📦 PM2をインストール中...
call npm install -g pm2
call npm install -g pm2-windows-service

REM アプリケーションをビルド
echo 🏗️ アプリケーションをビルド中...
cd client
call npm run build
cd ..

REM PM2設定ファイルを作成
echo 📝 PM2設定を作成中...

REM PM2でサービス登録
echo 🚀 サービスを登録中...
call pm2 start ecosystem.config.js
call pm2 save
call pm2-service-install
call pm2 startup

echo ✅ サービス登録完了！
echo 🌐 サイトは http://localhost:5000 でアクセス可能です
echo 🔄 PCを再起動してもサービスが自動で開始されます
pause