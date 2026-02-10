
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Loader2, Sparkles, BookOpen, Book, Settings2, Type, Palette, ChevronDown, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import Navigation from './components/Navigation';
import StoryEditor from './components/StoryEditor';
import FlipBook from './components/FlipBook';
import PageStrip from './components/PageStrip';
import { Prompt, Story, ViewState, BookSizeConfig, FontStyleConfig, ColorSchemeConfig, User } from './types';
import { INITIAL_PROMPTS, INITIAL_STORIES, CATEGORY_COLORS, BOOK_SIZES, FONT_STYLES, COLOR_SCHEMES } from './constants';
import { generateNewPrompt } from './services/geminiService';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <div className="mb-8 p-4 bg-indigo-100 rounded-full">
      <BookOpen className="w-16 h-16 text-indigo-600" />
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 serif-text leading-tight">
      Preserve your legacy, <br/><span className="text-indigo-600">one story at a time.</span>
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
      A meaningful way to share your life's journey. Receive weekly prompts, write your memories, 
      and we'll help you craft them into a beautiful heirloom book for your family.
    </p>
    <button 
      onClick={onStart}
      className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-2xl hover:shadow-indigo-200 active:scale-95"
    >
      Start Your Journal
    </button>
  </div>
);

const LoginPage: React.FC<{ onLogin: (user: User) => void; onSwitch: () => void }> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated login
    onLogin({ id: '1', name: 'John Doe', email });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-indigo-100 rounded-2xl mb-4">
            <Book className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 serif-text">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue your story.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          New to StoryKeeper? <button onClick={onSwitch} className="text-indigo-600 font-bold hover:underline">Create an account</button>
        </div>
      </div>
    </div>
  );
};

const SignupPage: React.FC<{ onSignup: (user: User) => void; onSwitch: () => void }> = ({ onSignup, onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({ id: Math.random().toString(), name, email });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-indigo-100 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 serif-text">Join StoryKeeper</h2>
          <p className="text-gray-500 mt-2">Begin preserving your legacy today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Choose Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <button onClick={onSwitch} className="text-indigo-600 font-bold hover:underline">Sign in instead</button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [selectedBookSize, setSelectedBookSize] = useState<BookSizeConfig>(BOOK_SIZES[0]);
  const [selectedFontStyle, setSelectedFontStyle] = useState<FontStyleConfig>(FONT_STYLES[0]);
  const [selectedColorScheme, setSelectedColorScheme] = useState<ColorSchemeConfig>(COLOR_SCHEMES[0]);
  
  const [activeCustomTab, setActiveCustomTab] = useState<'format' | 'type' | 'color' | null>(null);
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0);

  // Persistence
  useEffect(() => {
    const savedUser = localStorage.getItem('sk_user');
    const savedStories = localStorage.getItem('sk_stories');
    const savedPrompts = localStorage.getItem('sk_prompts');
    const savedSize = localStorage.getItem('sk_book_size');
    const savedFont = localStorage.getItem('sk_font_style');
    const savedColor = localStorage.getItem('sk_color_scheme');
    
    if (savedUser) {
        setUser(JSON.parse(savedUser));
        setView('dashboard');
    }
    
    if (savedStories) setStories(JSON.parse(savedStories));
    if (savedPrompts) setPrompts(JSON.parse(savedPrompts));
    if (savedSize) {
      const size = BOOK_SIZES.find(s => s.id === savedSize);
      if (size) setSelectedBookSize(size);
    }
    if (savedFont) {
      const font = FONT_STYLES.find(f => f.id === savedFont);
      if (font) setSelectedFontStyle(font);
    }
    if (savedColor) {
      const color = COLOR_SCHEMES.find(c => c.id === savedColor);
      if (color) setSelectedColorScheme(color);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('sk_user', JSON.stringify(user));
    else localStorage.removeItem('sk_user');

    localStorage.setItem('sk_stories', JSON.stringify(stories));
    localStorage.setItem('sk_prompts', JSON.stringify(prompts));
    localStorage.setItem('sk_book_size', selectedBookSize.id);
    localStorage.setItem('sk_font_style', selectedFontStyle.id);
    localStorage.setItem('sk_color_scheme', selectedColorScheme.id);
  }, [user, stories, prompts, selectedBookSize, selectedFontStyle, selectedColorScheme]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleSaveStory = (newStory: Story) => {
    setStories(prev => {
      const idx = prev.findIndex(s => s.id === newStory.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = newStory;
        return updated;
      }
      return [...prev, newStory];
    });

    setPrompts(prev => prev.map(p => 
      p.id === newStory.promptId ? { ...p, isAnswered: true } : p
    ));

    setView('dashboard');
    setActivePrompt(null);
  };

  const handleReorderStories = (reorderedStories: Story[]) => {
    setStories(reorderedStories);
  };

  const handleAddPrompt = async () => {
    setIsGeneratingPrompt(true);
    const questions = prompts.map(p => p.question);
    const newPromptData = await generateNewPrompt(questions);
    
    if (newPromptData) {
      const newPrompt: Prompt = {
        id: Math.random().toString(36).substr(2, 9),
        question: newPromptData.question,
        category: newPromptData.category as any,
        isAnswered: false
      };
      setPrompts(prev => [newPrompt, ...prev]);
    }
    setIsGeneratingPrompt(false);
  };

  const toggleTab = (tab: 'format' | 'type' | 'color') => {
    setActiveCustomTab(activeCustomTab === tab ? null : tab);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[#FDFCF9]">
      <Navigation 
        currentView={view} 
        setView={setView} 
        user={user} 
        onLogout={handleLogout} 
      />

      <main className="max-w-6xl mx-auto py-8">
        {view === 'landing' && <LandingPage onStart={() => setView('login')} />}
        
        {view === 'login' && <LoginPage onLogin={handleLogin} onSwitch={() => setView('signup')} />}
        
        {view === 'signup' && <SignupPage onSignup={handleLogin} onSwitch={() => setView('login')} />}

        {view === 'dashboard' && user && (
          <div className="px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 serif-text">Writing Prompts</h2>
                <p className="text-gray-500">Pick a memory to share today, {user.name.split(' ')[0]}.</p>
              </div>
              <button 
                onClick={handleAddPrompt}
                disabled={isGeneratingPrompt}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                {isGeneratingPrompt ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
                Get New AI Prompt
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => {
                const isAnswered = prompt.isAnswered;
                return (
                  <div 
                    key={prompt.id}
                    className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full ${isAnswered ? 'bg-gray-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[prompt.category]}`}>
                        {prompt.category}
                      </span>
                      {isAnswered && (
                        <div className="bg-green-100 text-green-700 p-1 rounded-full">
                          <PlusCircle className="w-4 h-4 rotate-45" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex-grow leading-snug">
                      {prompt.question}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <button 
                        onClick={() => {
                          setActivePrompt(prompt);
                          setView('editor');
                        }}
                        className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${
                          isAnswered 
                          ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isAnswered ? 'Edit Chapter' : 'Write Story'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'editor' && activePrompt && user && (
          <StoryEditor 
            prompt={activePrompt}
            onSave={handleSaveStory}
            onCancel={() => {
              setView('dashboard');
              setActivePrompt(null);
            }}
            initialStory={stories.find(s => s.promptId === activePrompt.id)}
          />
        )}

        {view === 'preview' && user && (
          <div className="px-4 py-8 min-h-screen">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-12 gap-8">
              <div className="text-center xl:text-left">
                <h2 className="text-4xl font-bold text-gray-900 serif-text mb-2">The StoryKeeper Preview</h2>
                <p className="text-gray-500">Reviewing the legacy of {user.name}.</p>
              </div>

              {/* Customization UI */}
              <div className="flex flex-col items-center xl:items-end gap-4 w-full xl:w-auto print:hidden">
                <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 p-2 gap-2">
                  <button 
                    onClick={() => toggleTab('format')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'format' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Settings2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Format</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeCustomTab === 'format' ? 'rotate-180' : ''}`} />
                  </button>
                  <button 
                    onClick={() => toggleTab('type')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'type' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Type className="w-4 h-4" />
                    <span className="text-sm font-bold">Typography</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeCustomTab === 'type' ? 'rotate-180' : ''}`} />
                  </button>
                  <button 
                    onClick={() => toggleTab('color')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'color' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Palette className="w-4 h-4" />
                    <span className="text-sm font-bold">Theme</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeCustomTab === 'color' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown panels */}
                <div className="w-full">
                  {activeCustomTab === 'format' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {BOOK_SIZES.map(size => (
                          <button
                            key={size.id}
                            onClick={() => {
                              setSelectedBookSize(size);
                              setActiveCustomTab(null);
                            }}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${selectedBookSize.id === size.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}
                          >
                            <div className="text-xs font-bold uppercase mb-1 tracking-wider">{size.label}</div>
                            <div className="text-[10px] opacity-70 leading-tight">{size.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeCustomTab === 'type' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {FONT_STYLES.map(font => (
                          <button
                            key={font.id}
                            onClick={() => {
                              setSelectedFontStyle(font);
                              setActiveCustomTab(null);
                            }}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${selectedFontStyle.id === font.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}
                          >
                            <div className={`text-sm font-bold mb-1 ${font.className}`}>{font.label}</div>
                            <div className="text-[10px] opacity-70 leading-tight">{font.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeCustomTab === 'color' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {COLOR_SCHEMES.map(color => (
                          <button
                            key={color.id}
                            onClick={() => {
                              setSelectedColorScheme(color);
                              setActiveCustomTab(null);
                            }}
                            className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center ${selectedColorScheme.id === color.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}
                          >
                            <div className={`w-8 h-4 rounded shadow-sm mb-2 ${color.coverBg}`} />
                            <div className="text-xs font-bold uppercase mb-1 tracking-wider">{color.label}</div>
                            <div className="text-[10px] opacity-70 leading-tight">{color.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {stories.length === 0 ? (
              <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">You haven't completed any stories yet. Start writing to see your book come to life!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                <FlipBook 
                  stories={stories} 
                  sizeConfig={selectedBookSize}
                  fontConfig={selectedFontStyle}
                  colorConfig={selectedColorScheme}
                  currentPage={currentPreviewPage}
                  onPageChange={setCurrentPreviewPage}
                />
                
                <PageStrip 
                  stories={stories}
                  currentPage={currentPreviewPage}
                  onPageChange={setCurrentPreviewPage}
                  onReorder={handleReorderStories}
                  colorConfig={selectedColorScheme}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-gray-200 bg-white print:hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-800">StoryKeeper</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} StoryKeeper. Dedicated to preserving the stories that matter most.</p>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
