@echo off
echo 🏗️ 本番用ビルドを作成します...

REM クライアントをビルド
echo 📦 Reactアプリをビルド中...
cd client
call npm run build
if errorlevel 1 (
    echo ❌ ビルドに失敗しました
    pause
    exit /b 1
)
cd ..

echo ✅ ビルド完了！

REM 本番モードでサーバー起動
echo 🚀 本番モードでサーバーを起動中...
echo 🌐 アクセス: http://localhost:5000
echo.
set NODE_ENV=production
call npm start