@echo off
echo 📅 Windowsタスクスケジューラーに登録します...

REM 現在のディレクトリを取得
set CURRENT_DIR=%~dp0

REM タスクを作成
schtasks /create /tn "utip-liverboard" /tr "\"%CURRENT_DIR%build-and-serve.bat\"" /sc onlogon /ru "%USERNAME%" /f

if errorlevel 1 (
    echo ❌ タスクの作成に失敗しました
    echo 💡 管理者として実行してください
    pause
    exit /b 1
)

echo ✅ タスクスケジューラーに登録完了！
echo 🔄 ログイン時に自動でサーバーが開始されます
echo 📋 タスク名: utip-liverboard
echo.
echo 🛠️ タスクの管理:
echo   確認: schtasks /query /tn "utip-liverboard"
echo   削除: schtasks /delete /tn "utip-liverboard" /f
pause