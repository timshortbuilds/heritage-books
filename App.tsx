
import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Loader2, 
  BookOpen, 
  Book, 
  Settings2, 
  Type, 
  Palette, 
  ChevronDown, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Wand2, 
  Clock, 
  Heart,
  LayoutDashboard,
  Feather,
  Menu,
  X
} from 'lucide-react';
import Navigation from './components/Navigation.tsx';
import StoryEditor from './components/StoryEditor.tsx';
import FlipBook from './components/FlipBook.tsx';
import PageStrip from './components/PageStrip.tsx';
import { Prompt, Story, ViewState, BookSizeConfig, FontStyleConfig, ColorSchemeConfig, User } from './types.ts';
import { INITIAL_PROMPTS, INITIAL_STORIES, CATEGORY_COLORS, BOOK_SIZES, FONT_STYLES, COLOR_SCHEMES } from './constants.ts';
import { generateNewPrompt } from './services/geminiService.ts';

const LandingPage: React.FC<{ onStart: () => void; onLogin: () => void }> = ({ onStart, onLogin }) => (
  <div className="bg-[#FDFCF9]">
    {/* Hero Section */}
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl serif-text">
              <span className="block">The most meaningful</span>
              <span className="block text-indigo-600">gift for your family.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Preserve your life story, one memory at a time. We send you a question a week, you reply with a story, and at the end of the year, we bind them into a beautiful heirloom book.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 active:scale-95"
              >
                Get Started Free
              </button>
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-2xl text-lg font-bold hover:bg-indigo-50 transition-all active:scale-95"
              >
                Sign In
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <span className="ml-2">Trusted by 50,000+ families worldwide</span>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] bg-white p-4">
              <div className="w-full h-full border border-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1544822688-c6f14d6986ba?auto=format&fit=crop&q=80&w=1200" 
                  alt="Beautiful bound book" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-80 mb-1">Preview of Your Story</p>
                    <h3 className="text-2xl font-bold serif-text">A Legacy That Lasts Forever</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl serif-text">
            Everything you need to write your book.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
              <Wand2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Writing Polish</h3>
            <p className="text-gray-500 leading-relaxed">
              Don't worry about grammar or flow. Our AI helper gently polishes your words while keeping your unique voice perfectly intact.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
              <Palette className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Illustrations</h3>
            <p className="text-gray-500 leading-relaxed">
              Instantly turn your text into beautiful, painterly illustrations that bring your childhood memories to life on the page.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Weekly Inspiration</h3>
            <p className="text-gray-500 leading-relaxed">
              Never stare at a blank page. We send thoughtful, biographical prompts that spark deep memories you haven't thought about in years.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works Section */}
    <section className="py-24 bg-[#FDFCF9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 serif-text">How StoryKeeper Works</h2>
        </div>
        <div className="space-y-12">
          {[
            { step: '01', title: 'We ask the questions', desc: 'Each week, we email you a carefully selected question about your life. You pick the ones you want to answer.' },
            { step: '02', title: 'You tell the stories', desc: 'Write a few paragraphs or a long chapter. Use our AI tools to help you refine your thoughts and add images.' },
            { step: '03', title: 'Family stays connected', desc: 'Your stories are shared with the family members you invite, creating a private living history.' },
            { step: '04', title: 'A book is born', desc: 'At the end of the journey, we bind your stories into a beautiful, hard-cover heirloom book for your family.' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-8 items-start">
              <div className="flex-shrink-0 text-4xl font-black text-indigo-100 serif-text">{item.step}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-indigo-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
          </div>
          <blockquote className="text-3xl md:text-4xl font-bold serif-text italic leading-tight max-w-4xl mx-auto">
            "I never thought I could write a book, but one story a week was easy. Now my grandkids have a part of me that will never fade."
          </blockquote>
          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white mb-4">
              <img src="https://i.pravatar.cc/100?u=elder" alt="author" />
            </div>
            <p className="font-bold text-xl">— Martha G., StoryKeeper Member</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Final */}
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 serif-text">Ready to share your story?</h2>
        <p className="text-xl text-gray-500 mb-10">
          The best time to start was years ago. The second best time is today.
        </p>
        <button 
          onClick={onStart}
          className="px-12 py-5 bg-indigo-600 text-white rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-2xl hover:shadow-indigo-200 active:scale-95"
        >
          Start My Legacy Book
        </button>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Book className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">StoryKeeper</span>
        </div>
        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
        </div>
        <p className="text-sm text-gray-400">© 2025 StoryKeeper Inc. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

const LoginPage: React.FC<{ onLogin: (user: User) => void; onSwitch: () => void }> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ id: '1', name: 'John Doe', email });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
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
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-indigo-100 rounded-2xl mb-4">
            <UserIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 serif-text">Join StoryKeeper</h2>
          <p className="text-gray-500 mt-2">Begin preserving your legacy today.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Jane Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="jane@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Choose Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('sk_user');
    const savedStories = localStorage.getItem('sk_stories');
    const savedPrompts = localStorage.getItem('sk_prompts');
    const savedSize = localStorage.getItem('sk_book_size');
    const savedFont = localStorage.getItem('sk_font_style');
    const savedColor = localStorage.getItem('sk_color_scheme');
    if (savedUser) { setUser(JSON.parse(savedUser)); setView('dashboard'); }
    if (savedStories) setStories(JSON.parse(savedStories));
    if (savedPrompts) setPrompts(JSON.parse(savedPrompts));
    if (savedSize) { const s = BOOK_SIZES.find(x => x.id === savedSize); if (s) setSelectedBookSize(s); }
    if (savedFont) { const f = FONT_STYLES.find(x => x.id === savedFont); if (f) setSelectedFontStyle(f); }
    if (savedColor) { const c = COLOR_SCHEMES.find(x => x.id === savedColor); if (c) setSelectedColorScheme(c); }
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

  const handleLogin = (newUser: User) => { setUser(newUser); setView('dashboard'); };
  const handleLogout = () => { setUser(null); setView('landing'); };
  const handleSaveStory = (newStory: Story) => {
    setStories(prev => {
      const idx = prev.findIndex(s => s.id === newStory.id);
      if (idx > -1) { const updated = [...prev]; updated[idx] = newStory; return updated; }
      return [...prev, newStory];
    });
    setPrompts(prev => prev.map(p => p.id === newStory.promptId ? { ...p, isAnswered: true } : p));
    setView('dashboard'); setActivePrompt(null);
  };
  const handleReorderStories = (reorderedStories: Story[]) => { setStories(reorderedStories); };
  const handleAddPrompt = async () => {
    setIsGeneratingPrompt(true);
    const questions = prompts.map(p => p.question);
    const newPromptData = await generateNewPrompt(questions);
    if (newPromptData) {
      const newPrompt: Prompt = { id: Math.random().toString(36).substr(2, 9), question: newPromptData.question, category: newPromptData.category as any, isAnswered: false };
      setPrompts(prev => [newPrompt, ...prev]);
    }
    setIsGeneratingPrompt(false);
  };
  const toggleTab = (tab: 'format' | 'type' | 'color') => { setActiveCustomTab(activeCustomTab === tab ? null : tab); };

  // Guest Header
  const GuestHeader = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">StoryKeeper</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <button onClick={() => setView('login')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Sign In</button>
            <button onClick={() => setView('signup')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-100">Get Started</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          <a href="#" className="block py-2 text-gray-600 font-semibold">Pricing</a>
          <a href="#" className="block py-2 text-gray-600 font-semibold">How it Works</a>
          <button onClick={() => { setView('login'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-indigo-600 font-bold">Sign In</button>
          <button onClick={() => { setView('signup'); setIsMenuOpen(false); }} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Get Started</button>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[#FDFCF9]">
      {!user && <GuestHeader />}
      <Navigation currentView={view} setView={setView} user={user} onLogout={handleLogout} />
      
      <main className={`${!user && view === 'landing' ? '' : 'max-w-6xl mx-auto py-8 pt-24'}`}>
        {view === 'landing' && <LandingPage onStart={() => setView('signup')} onLogin={() => setView('login')} />}
        {view === 'login' && <LoginPage onLogin={handleLogin} onSwitch={() => setView('signup')} />}
        {view === 'signup' && <SignupPage onSignup={handleLogin} onSwitch={() => setView('login')} />}
        {view === 'dashboard' && user && (
          <div className="px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 serif-text">Writing Prompts</h2>
                <p className="text-gray-500">Pick a memory to share today, {user.name.split(' ')[0]}.</p>
              </div>
              <button onClick={handleAddPrompt} disabled={isGeneratingPrompt} className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50">
                {isGeneratingPrompt ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />} Get New AI Prompt
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((p) => (
                <div key={p.id} className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full ${p.isAnswered ? 'bg-gray-50/50' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[p.category]}`}>{p.category}</span>
                    {p.isAnswered && <div className="bg-green-100 text-green-700 p-1 rounded-full"><PlusCircle className="w-4 h-4 rotate-45" /></div>}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex-grow leading-snug">{p.question}</h3>
                  <button onClick={() => { setActivePrompt(p); setView('editor'); }} className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${p.isAnswered ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    {p.isAnswered ? 'Edit Chapter' : 'Write Story'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === 'editor' && activePrompt && user && (
          <StoryEditor prompt={activePrompt} onSave={handleSaveStory} onCancel={() => { setView('dashboard'); setActivePrompt(null); }} initialStory={stories.find(s => s.promptId === activePrompt.id)} />
        )}
        {view === 'preview' && user && (
          <div className="px-4 py-8 min-h-screen">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-12 gap-8 text-center xl:text-left">
              <div><h2 className="text-4xl font-bold text-gray-900 serif-text mb-2">The StoryKeeper Preview</h2><p className="text-gray-500">Reviewing the legacy of {user.name}.</p></div>
              <div className="flex flex-col items-center xl:items-end gap-4 w-full xl:w-auto print:hidden">
                <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 p-2 gap-2">
                  <button onClick={() => toggleTab('format')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'format' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}><Settings2 className="w-4 h-4" /> Format</button>
                  <button onClick={() => toggleTab('type')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'type' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}><Type className="w-4 h-4" /> Typography</button>
                  <button onClick={() => toggleTab('color')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeCustomTab === 'color' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}><Palette className="w-4 h-4" /> Theme</button>
                </div>
                {activeCustomTab === 'format' && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BOOK_SIZES.map(s => <button key={s.id} onClick={() => { setSelectedBookSize(s); setActiveCustomTab(null); }} className={`p-3 rounded-xl border-2 text-center transition-all ${selectedBookSize.id === s.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}><div className="text-xs font-bold uppercase mb-1 tracking-wider">{s.label}</div></button>)}
                  </div>
                )}
                {activeCustomTab === 'type' && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {FONT_STYLES.map(f => <button key={f.id} onClick={() => { setSelectedFontStyle(f); setActiveCustomTab(null); }} className={`p-3 rounded-xl border-2 text-center transition-all ${selectedFontStyle.id === f.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}><div className={`text-sm font-bold ${f.className}`}>{f.label}</div></button>)}
                  </div>
                )}
                {activeCustomTab === 'color' && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COLOR_SCHEMES.map(c => <button key={c.id} onClick={() => { setSelectedColorScheme(c); setActiveCustomTab(null); }} className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center ${selectedColorScheme.id === c.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-indigo-200 text-gray-600'}`}><div className={`w-8 h-4 rounded shadow-sm mb-2 ${c.coverBg}`} /><div className="text-xs font-bold uppercase tracking-wider">{c.label}</div></button>)}
                  </div>
                )}
              </div>
            </div>
            {stories.length === 0 ? (
              <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200"><p className="text-gray-500">You haven't completed any stories yet.</p></div>
            ) : (
              <div className="flex flex-col gap-12">
                <FlipBook stories={stories} sizeConfig={selectedBookSize} fontConfig={selectedFontStyle} colorConfig={selectedColorScheme} currentPage={currentPreviewPage} onPageChange={setCurrentPreviewPage} />
                <PageStrip stories={stories} currentPage={currentPreviewPage} onPageChange={setCurrentPreviewPage} onReorder={handleReorderStories} colorConfig={selectedColorScheme} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
