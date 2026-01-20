import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';

const Header = ({ user, onLogin, onLogout }) => {
  return (
    <header className="bg-white text-black border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">♔</div>
          <h1 className="text-xl font-bold">Chess Analyzer</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 border-2 border-black px-3 py-2">
                <User size={18} />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition"
            >
              <LogIn size={18} />
              <span>Login with Google</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;