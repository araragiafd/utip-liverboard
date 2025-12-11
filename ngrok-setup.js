const { spawn } = require('child_process');

console.log('🚀 ngrokでインターネット公開を開始します...\n');

// ngrokがインストールされているかチェック
const checkNgrok = spawn('ngrok', ['version'], { stdio: 'pipe' });

checkNgrok.on('error', () => {
  console.log('❌ ngrokがインストールされていません');
  console.log('\n📦 ngrokをインストールしてください:');
  console.log('   1. https://ngrok.com/ でアカウント作成');
  console.log('   2. ngrokをダウンロード・インストール');
  console.log('   3. 認証トークンを設定: ngrok authtoken [YOUR_TOKEN]');
  console.log('   4. 再度このスクリプトを実行\n');
  process.exit(1);
});

checkNgrok.on('close', (code) => {
  if (code === 0) {
    console.log('✅ ngrokが見つかりました');
    
    // フロントエンド用のngrokトンネル
    const frontendTunnel = spawn('ngrok', ['http', '3000'], { stdio: 'inherit' });
    
    console.log('\n🌐 フロントエンド用トンネルを作成中...');
    console.log('   ポート3000をインターネットに公開します');
    console.log('\n📱 表示されるURLを他の人に共有してください！');
    console.log('   例: https://abc123.ngrok.io\n');
    
    frontendTunnel.on('error', (err) => {
      console.error('❌ ngrokエラー:', err);
    });
    
    // Ctrl+Cで終了
    process.on('SIGINT', () => {
      console.log('\n🛑 ngrokトンネルを終了します...');
      frontendTunnel.kill();
      process.exit(0);
    });
  }
});