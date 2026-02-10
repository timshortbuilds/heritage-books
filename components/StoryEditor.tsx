
import React, { useState, useEffect } from 'react';
import { Save, Wand2, Image as ImageIcon, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Prompt, Story } from '../types';
import { refineStory, generateStoryImage } from '../services/geminiService';

interface StoryEditorProps {
  prompt: Prompt;
  onSave: (story: Story) => void;
  onCancel: () => void;
  initialStory?: Story;
}

const StoryEditor: React.FC<StoryEditorProps> = ({ prompt, onSave, onCancel, initialStory }) => {
  const [title, setTitle] = useState(initialStory?.title || '');
  const [content, setContent] = useState(initialStory?.content || '');
  const [imageUrl, setImageUrl] = useState(initialStory?.imageUrl || '');
  const [isRefining, setIsRefining] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  const handleRefine = async () => {
    if (!content) return;
    setIsRefining(true);
    const refined = await refineStory(content);
    setContent(refined);
    setIsRefining(false);
  };

  const handleGenerateImage = async () => {
    if (!content) return;
    setIsGeneratingImg(true);
    const img = await generateStoryImage(content.substring(0, 500));
    if (img) setImageUrl(img);
    setIsGeneratingImg(false);
  };

  const handleSave = () => {
    onSave({
      id: initialStory?.id || Math.random().toString(36).substr(2, 9),
      promptId: prompt.id,
      title: title || prompt.question,
      content,
      imageUrl,
      dateCreated: initialStory?.dateCreated || new Date().toISOString(),
      status: 'completed',
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Prompts
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-50 bg-white">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 mb-4">
            {prompt.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.question}</h1>
          <p className="text-gray-500">Take your time. Let the memories flow.</p>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this story a title..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-gray-900 placeholder:text-gray-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Once upon a time..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all serif-text text-lg leading-relaxed bg-white text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {imageUrl && (
            <div className="relative rounded-xl overflow-hidden group border border-gray-200">
              <img src={imageUrl} alt="Generated illustration" className="w-full h-64 object-cover" />
              <button 
                onClick={() => setImageUrl('')}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleRefine}
              disabled={isRefining || !content}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 font-bold"
            >
              {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              AI Polish
            </button>
            <button
              onClick={handleGenerateImage}
              disabled={isGeneratingImg || !content}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 font-bold"
            >
              {isGeneratingImg ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              Illustrate Story
            </button>
            <div className="flex-grow" />
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95 font-bold"
            >
              <CheckCircle className="w-5 h-5" />
              Save Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;
