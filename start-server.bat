@echo off
echo 🚀 utip ライバー掲示板を起動します...
echo.

echo 📦 依存関係をインストール中...
call npm install
if errorlevel 1 (
    echo ❌ サーバー側の依存関係インストールに失敗しました
    pause
    exit /b 1
)

echo 📦 クライアント側の依存関係をインストール中...
cd client
call npm install
if errorlevel 1 (
    echo ❌ クライアント側の依存関係インストールに失敗しました
    pause
    exit /b 1
)

cd ..
echo.
echo ✅ インストール完了！
echo.
echo 🌐 開発サーバーを起動中...
echo   - フロントエンド: http://localhost:3000
echo   - バックエンドAPI: http://localhost:5000
echo.
echo 🛑 終了するには Ctrl+C を押してください
echo.

call npm run dev