import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LiverBoard from './pages/LiverBoard';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <Router basename="/utip-liverboard">
      <div className="min-h-screen">
        {/* 背景のアニメーション要素 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <Header />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liver/:id" element={<LiverBoard />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/liver/:id/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;