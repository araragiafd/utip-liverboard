import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  liver_name: string;
  liver_id: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
  author_name: string;
  created_at: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('投稿取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyAuthor.trim() || submitting) return;

    setSubmitting(true);
    try {
      await axios.post(`/api/posts/${id}/replies`, {
        content: replyContent,
        author_name: replyAuthor
      });
      
      setReplyContent('');
      setReplyAuthor('');
      fetchPost(); // 投稿を再取得して返信を更新
    } catch (error) {
      console.error('返信投稿エラー:', error);
      alert('返信の投稿に失敗しました');
    } finally {
      setSubmitting(false);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">投稿が見つかりません</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ホームに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ナビゲーション */}
      <div className="mb-6">
        <Link 
          to={`/liver/${post.liver_id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← {post.liver_name} 掲示板に戻る
        </Link>
      </div>

      {/* 投稿詳細 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>投稿者: {post.author_name}</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* 返信一覧 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          返信 ({post.replies.length})
        </h2>
        
        <div className="space-y-4">
          {post.replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{reply.author_name}</span>
                <span className="text-sm text-gray-500">{formatDate(reply.created_at)}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 返信フォーム */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">返信を投稿</h3>
        
        <form onSubmit={handleReplySubmit} className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              お名前
            </label>
            <input
              type="text"
              id="author"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="お名前を入力してください"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              返信内容
            </label>
            <textarea
              id="content"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="返信内容を入力してください"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '投稿中...' : '返信を投稿'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;