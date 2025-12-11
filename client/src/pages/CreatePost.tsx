import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface Liver {
  id: number;
  name: string;
}

const CreatePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liver, setLiver] = useState<Liver | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLiver();
    }
  }, [id]);

  const fetchLiver = async () => {
    try {
      const response = await axios.get(`/api/livers/${id}`);
      setLiver(response.data);
    } catch (error) {
      console.error('ライバー情報取得エラー:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await axios.post('/api/posts', {
        liver_id: id,
        title: title.trim(),
        content: content.trim(),
        author_name: authorName.trim()
      });

      // 投稿成功後、作成された投稿の詳細ページに遷移
      navigate(`/post/${response.data.id}`);
    } catch (error) {
      console.error('投稿作成エラー:', error);
      alert('投稿の作成に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  if (!liver) {
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
    <div className="max-w-3xl mx-auto animate-slide-in">
      {/* ナビゲーション */}
      <div className="mb-8">
        <Link 
          to={`/liver/${id}`}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors font-medium"
        >
          <span>←</span>
          <span>🎭 {liver.name} 掲示板に戻る</span>
        </Link>
      </div>

      {/* 投稿作成フォーム */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✍️</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            新規投稿を作成
          </h1>
          <p className="text-gray-800">
            {liver.name} 掲示板に素敵な投稿をしてみましょう！
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="author" className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
              <span>👤</span>
              <span>お名前</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80"
              placeholder="あなたのお名前を入力してください ✨"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
              <span>📝</span>
              <span>タイトル</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80"
              placeholder="魅力的なタイトルを考えてみましょう 🎯"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
              <span>💭</span>
              <span>内容</span>
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 resize-none"
              placeholder="あなたの想いを自由に表現してください... 🌟&#10;&#10;例：&#10;・今日の配信について&#10;・応援メッセージ&#10;・質問や感想&#10;・楽しかった思い出"
              required
            />
            <div className="text-right text-sm text-gray-600">
              {content.length} 文字
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-purple-200">
            <Link
              to={`/liver/${id}`}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <span>❌</span>
              <span>キャンセル</span>
            </Link>
            <button
              type="submit"
              disabled={submitting || !title.trim() || !content.trim() || !authorName.trim()}
              className="btn-success text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>投稿中...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>投稿する</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* ヒント */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
            <span>💡</span>
            <span>投稿のコツ</span>
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 具体的で分かりやすいタイトルをつけましょう</li>
            <li>• 他の人が読んで楽しめる内容を心がけましょう</li>
            <li>• 質問や感想、応援メッセージなど何でもOKです</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;