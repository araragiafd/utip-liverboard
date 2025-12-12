@echo off
echo 🔧 手動でGitHub Pagesにデプロイします...

REM 現在のディレクトリを保存
set ORIGINAL_DIR=%CD%

REM クライアントをビルド
echo 📦 Reactアプリをビルド中...
cd client
set PUBLIC_URL=/utip-liverboard
call npm install
if errorlevel 1 (
    echo ❌ npm install に失敗しました
    pause
    exit /b 1
)

call npm run build
if errorlevel 1 (
    echo ❌ ビルドに失敗しました
    pause
    exit /b 1
)

REM 元のディレクトリに戻る
cd "%ORIGINAL_DIR%"

REM 一時的にgh-pagesブランチを作成
echo 🌿 gh-pagesブランチを作成中...
git checkout --orphan gh-pages-temp
git rm -rf .
git clean -fxd

REM ビルドファイルをコピー
echo 📁 ビルドファイルをコピー中...
xcopy /E /I client\build\* .
echo. > .nojekyll

REM コミット・プッシュ
echo 📤 GitHub Pagesにプッシュ中...
git add .
git commit -m "Manual deploy to GitHub Pages"
git branch -D gh-pages 2>nul
git branch -m gh-pages
git push -f origin gh-pages

REM mainブランチに戻る
git checkout main
git branch -D gh-pages-temp 2>nul

echo ✅ 手動デプロイ完了！
echo 🌐 数分後に https://araragiafd.github.io/utip-liverboard/ でアクセス可能
pause