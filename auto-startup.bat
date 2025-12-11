@echo off
echo 🚀 スタートアップに登録します...

REM スタートアップフォルダのパスを取得
set STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup

REM 起動用バッチファイルを作成
echo @echo off > "%STARTUP_FOLDER%\utip-liverboard.bat"
echo cd /d "%~dp0" >> "%STARTUP_FOLDER%\utip-liverboard.bat"
echo start /min cmd /c "npm run dev" >> "%STARTUP_FOLDER%\utip-liverboard.bat"

echo ✅ スタートアップに登録完了！
echo 🔄 次回PC起動時から自動でサーバーが開始されます
echo 📁 登録場所: %STARTUP_FOLDER%
pause