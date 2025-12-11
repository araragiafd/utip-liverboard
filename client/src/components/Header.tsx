import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="glass-effect shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 animate-pulse-glow">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">utip</h1>
              <p className="text-sm text-gray-600 -mt-1">ライバー掲示板</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">🏠 ホーム</span>
              <div className="absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </Link>
            <a 
              href="https://utip-live.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">🌐 公式サイト</span>
              <div className="absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;