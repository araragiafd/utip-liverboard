const { execSync } = require('child_process');
const fs = require('fs');

console.log('🐙 GitHub接続セットアップを開始します...\n');

// Gitの初期化確認
try {
  execSync('git status', { stdio: 'pipe' });
  console.log('✅ Gitリポジトリが既に初期化されています');
} catch (error) {
  console.log('📦 Gitリポジトリを初期化します...');
  execSync('git init');
  console.log('✅ Gitリポジトリを初期化しました');
}

// 初回コミット
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "🎉 Initial commit: utip ライバー掲示板"', { stdio: 'inherit' });
  console.log('✅ 初回コミットを作成しました');
} catch (error) {
  console.log('ℹ️ コミットは既に存在するか、変更がありません');
}

console.log('\n🔗 次のステップ:');
console.log('1. GitHubで新しいリポジトリを作成');
console.log('2. 以下のコマンドを実行してリモートリポジトリを追加:');
console.log('   git remote add origin https://github.com/YOUR_USERNAME/utip-liverboard.git');
console.log('3. コードをプッシュ:');
console.log('   git branch -M main');
console.log('   git push -u origin main');
console.log('\n🚀 GitHub Actions、Issues、PRテンプレートも設定済みです！');