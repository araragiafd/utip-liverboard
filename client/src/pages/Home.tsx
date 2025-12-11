import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Liver {
  id: number;
  name: string;
  avatar: string;
  description: string;
  twitter_url?: string;
  youtube_url?: string;
}

const Home: React.FC = () => {
  const [livers, setLivers] = useState<Liver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivers();
  }, []);

  const fetchLivers = async () => {
    try {
      const response = await fetch('/utip-liverboard/data/livers.json');
      const data = await response.json();
      setLivers(data);
    } catch (error) {
      console.error('ライバー取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradients = [
    'from-pink-400 via-purple-500 to-indigo-500',
    'from-green-400 via-blue-500 to-purple-600',
    'from-yellow-400 via-red-500 to-pink-500',
    'from-indigo-400 via-purple-500 to-pink-500',
    'from-blue-400 via-purple-500 to-red-500',
    'from-teal-400 via-blue-500 to-purple-600'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in">
      {/* ヒーローセクション */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 mb-8 border border-white/50 shadow-xl">
          <h1 className="text-6xl font-bold text-gradient mb-6 animate-bounce-in">
            ✨ utip ライバー掲示板 ✨
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            🎭 所属ライバーの専用掲示板で、ファンの皆様と楽しく交流しましょう！ 💬
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium animate-pulse-glow">
              🔥 HOT
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full text-sm font-medium">
              💎 PREMIUM
            </div>
          </div>
        </div>
      </div>

      {/* ライバーカードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {livers.map((liver, index) => (
          <div 
            key={liver.id} 
            className="group hover-lift animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/50">
              {/* カードヘッダー */}
              <div className={`h-32 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs font-medium opacity-80">🎬 LIVE STREAMER</div>
                </div>
              </div>
              
              {/* アバター */}
              <div className="relative -mt-12 flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {liver.avatar ? (
                    <img 
                      src={liver.avatar} 
                      alt={liver.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {liver.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* カード内容 */}
              <div className="p-6 pt-4 text-center bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {liver.name}
                </h3>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  {liver.description}
                </p>
                
                {/* ソーシャルリンク */}
                <div className="flex justify-center space-x-6 mb-6">
                  {liver.twitter_url && (
                    <a 
                      href={liver.twitter_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center space-y-1 group/social"
                    >
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group-hover/social:scale-110 shadow-lg">
                        🐦
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Twitter</span>
                    </a>
                  )}
                  {liver.youtube_url && (
                    <a 
                      href={liver.youtube_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center space-y-1 group/social"
                    >
                      <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group-hover/social:scale-110 shadow-lg">
                        📺
                      </div>
                      <span className="text-xs text-gray-600 font-medium">YouTube</span>
                    </a>
                  )}
                </div>
                
                {/* 掲示板ボタン */}
                <Link
                  to={`/liver/${liver.id}`}
                  className="block w-full btn-gradient text-white text-center py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  💬 掲示板を見る
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* フッターセクション */}
      <div className="mt-20 text-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 inline-block border border-white/50 shadow-lg">
          <p className="text-gray-800 mb-4">🌟 新しいライバーも続々参加予定！</p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;