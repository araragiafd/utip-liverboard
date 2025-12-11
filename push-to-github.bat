@echo off
echo 🚀 GitHubにプッシュします...
echo.
echo ⚠️ 認証が求められた場合:
echo ユーザー名: araragiafd
echo パスワード: [Personal Access Token を入力]
echo.
echo Personal Access Tokenの作成方法:
echo 1. GitHub.com → Settings → Developer settings
echo 2. Personal access tokens → Tokens (classic)
echo 3. Generate new token (classic)
echo 4. repo スコープを選択
echo.
git push -u origin main
pause