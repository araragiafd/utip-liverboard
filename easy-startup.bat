@echo off
echo 🚀 スタートアップに自動起動を登録します...

REM 現在のディレクトリを取得
set CURRENT_DIR=%~dp0

REM スタートアップフォルダを開く
echo 📁 スタートアップフォルダを開きます...
start "" "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

REM 起動用ショートカットを作成
echo 📝 起動用バッチファイルを作成中...
(
echo @echo off
echo title utip ライバー掲示板 - 自動起動
echo cd /d "%CURRENT_DIR%"
echo echo 🚀 utip ライバー掲示板を起動中...
echo echo 🌐 アクセス: http://localhost:5000
echo timeout /t 3 /nobreak ^>nul
echo call build-and-serve.bat
) > "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\utip-liverboard.bat"

echo ✅ 登録完了！
echo.
echo 📋 次回PC起動時から自動で開始されます
echo 🌐 アクセス: http://localhost:5000
echo.
echo 🗑️ 削除したい場合は、開いたフォルダから
echo    utip-liverboard.bat を削除してください
echo.
pause