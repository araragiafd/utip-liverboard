@echo off
echo 🚀 GitHub Pagesに手動デプロイします...

REM クライアントをビルド
echo 📦 Reactアプリをビルド中...
cd client
set PUBLIC_URL=/utip-liverboard
call npm run build
if errorlevel 1 (
    echo ❌ ビルドに失敗しました
    pause
    exit /b 1
)
cd ..

REM gh-pagesブランチを作成・切り替え
echo 🌿 gh-pagesブランチを準備中...
git checkout --orphan gh-pages
git rm -rf .
git clean -fxd

REM ビルドファイルをコピー
echo 📁 ビルドファイルをコピー中...
xcopy /E /I client\build\* .
echo. > .nojekyll

REM コミット・プッシュ
echo 📤 GitHub Pagesにプッシュ中...
git add .
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages

REM mainブランチに戻る
git checkout main

echo ✅ デプロイ完了！
echo 🌐 数分後に https://araragiafd.github.io/utip-liverboard/ でアクセス可能
pause