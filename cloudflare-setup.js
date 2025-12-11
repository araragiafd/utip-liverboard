const { spawn } = require('child_process');

console.log('☁️ Cloudflare Tunnelでインターネット公開を開始します...\n');

// cloudflaredがインストールされているかチェック
const checkCloudflared = spawn('cloudflared', ['version'], { stdio: 'pipe' });

checkCloudflared.on('error', () => {
  console.log('❌ cloudflaredがインストールされていません');
  console.log('\n📦 Cloudflare Tunnelをインストールしてください:');
  console.log('   Windows: https://github.com/cloudflare/cloudflared/releases');
  console.log('   または: winget install cloudflare.cloudflared');
  console.log('\n🔧 セットアップ手順:');
  console.log('   1. cloudflaredをインストール');
  console.log('   2. cloudflared tunnel login');
  console.log('   3. 再度このスクリプトを実行\n');
  process.exit(1);
});

checkCloudflared.on('close', (code) => {
  if (code === 0) {
    console.log('✅ cloudflaredが見つかりました');
    
    // Cloudflare Tunnelを開始
    const tunnel = spawn('cloudflared', ['tunnel', '--url', 'http://localhost:3000'], { stdio: 'inherit' });
    
    console.log('\n🌐 Cloudflare Tunnelを作成中...');
    console.log('   ポート3000をインターネットに公開します');
    console.log('\n📱 表示されるURLを他の人に共有してください！');
    console.log('   例: https://abc-123-def.trycloudflare.com\n');
    
    tunnel.on('error', (err) => {
      console.error('❌ Cloudflare Tunnelエラー:', err);
    });
    
    // Ctrl+Cで終了
    process.on('SIGINT', () => {
      console.log('\n🛑 Cloudflare Tunnelを終了します...');
      tunnel.kill();
      process.exit(0);
    });
  }
});