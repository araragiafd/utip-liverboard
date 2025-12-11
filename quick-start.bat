@echo off
title utip ライバー掲示板
color 0A

echo.
echo  ██╗   ██╗████████╗██╗██████╗ 
echo  ██║   ██║╚══██╔══╝██║██╔══██╗
echo  ██║   ██║   ██║   ██║██████╔╝
echo  ██║   ██║   ██║   ██║██╔═══╝ 
echo  ╚██████╔╝   ██║   ██║██║     
echo   ╚═════╝    ╚═╝   ╚═╝╚═╝     
echo.
echo  ライバー掲示板システム
echo.

if not exist node_modules (
    echo 📦 初回セットアップを実行します...
    call npm install
    cd client
    call npm install
    cd ..
    echo ✅ セットアップ完了！
    echo.
)

echo 🚀 サーバーを起動しています...
echo.
echo 📱 アクセス方法:
echo    ローカル: http://localhost:3000
echo    ネットワーク: npm run ip で確認
echo.

start "" http://localhost:3000
call npm run dev