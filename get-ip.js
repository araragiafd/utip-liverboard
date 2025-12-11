const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // IPv4で、内部アドレスでないものを探す
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return 'localhost';
}

const ip = getLocalIP();
console.log('\n🌐 ネットワークアクセス情報:');
console.log(`   ローカル: http://localhost:3000`);
console.log(`   ネットワーク: http://${ip}:3000`);
console.log(`   API: http://${ip}:5000`);
console.log('\n📱 他の端末からアクセスする場合:');
console.log(`   同じWi-Fiネットワークに接続して`);
console.log(`   http://${ip}:3000 にアクセスしてください\n`);