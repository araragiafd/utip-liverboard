@echo off
echo 🐙 GitHub接続手順
echo.
echo 現在の状況を確認中...
git status
echo.
echo ブランチをmainに変更...
git branch -M main
echo.
echo 📝 次に実行するコマンド:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo git push -u origin main
echo.
echo ⚠️ YOUR_USERNAME と YOUR_REPO_NAME を実際の値に置き換えてください
echo.
pause