import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Liver {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  liver_name: string;
}

const LiverBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [liver, setLiver] = useState<Liver | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLiverData();
      fetchPosts();
    }
  }, [id]);

  const fetchLiverData = async () => {
    try {
      const response = await axios.get(`/api/livers/${id}`);
      setLiver(response.data);
    } catch (error) {
      console.error('ライバー情報取得エラー:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/liver/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.error('投稿取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP') + ' ' + date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

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

  if (!liver) {
    return (
      <div className="text-center py-12 animate-slide-in">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 inline-block border border-white/50 shadow-lg">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ライバーが見つかりません</h2>
          <Link to="/" className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold inline-block">
            🏠 ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in">
      {/* ライバー情報ヘッダー */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/50">
        <div className="flex items-center mb-6">
          <div className="relative mr-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-xl animate-pulse-glow">
              {liver.avatar ? (
                <img 
                  src={liver.avatar} 
                  alt={liver.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {liver.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gradient mb-3">
              🎭 {liver.name} 掲示板
            </h1>
            <p className="text-gray-800 text-lg">{liver.description}</p>
            <div className="mt-4 flex space-x-2">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                ✨ ACTIVE
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs rounded-full">
                💬 {posts.length} POSTS
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors font-medium"
          >
            <span>←</span>
            <span>🏠 ライバー一覧に戻る</span>
          </Link>
          <Link
            to={`/liver/${id}/create`}
            className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ✍️ 新規投稿
          </Link>
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/50 shadow-lg">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">まだ投稿がありません</h3>
            <p className="text-gray-700 mb-8">最初の投稿をして、コミュニティを盛り上げましょう！</p>
            <Link
              to={`/liver/${id}/create`}
              className="btn-success text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              🚀 最初の投稿をする
            </Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 hover-lift shadow-lg animate-slide-in border border-white/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex-1 group">
                  <Link 
                    to={`/post/${post.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    💬 {post.title}
                  </Link>
                </h3>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-600 mb-1">
                    📅 {formatDate(post.created_at)}
                  </div>
                  <div className="px-2 py-1 bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs rounded-full">
                    NEW
                  </div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-6 leading-relaxed">
                {post.content.length > 150 
                  ? post.content.substring(0, 150) + '...' 
                  : post.content
                }
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {post.author_name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {post.author_name}
                  </span>
                </div>
                <Link
                  to={`/post/${post.id}`}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  <span>詳細を見る</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiverBoard;