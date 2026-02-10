
import React from 'react';
import { Book, LayoutDashboard, Feather, Sparkles, LogOut, User as UserIcon } from 'lucide-react';
import { ViewState, User } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, user, onLogout }) => {
  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('dashboard')}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Book className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">StoryKeeper</span>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <button
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">My Prompts</span>
          </button>
          <button
            onClick={() => setView('preview')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentView === 'preview' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span className="hidden sm:inline">The Book</span>
          </button>
          
          <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-bold text-gray-900 leading-none">{user.name}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Legacy Writer</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
