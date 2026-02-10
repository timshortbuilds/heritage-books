
import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Story, BookSizeConfig, FontStyleConfig, ColorSchemeConfig } from '../types.ts';

interface FlipBookProps {
  stories: Story[];
  sizeConfig: BookSizeConfig;
  fontConfig: FontStyleConfig;
  colorConfig: ColorSchemeConfig;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const FlipBook: React.FC<FlipBookProps> = ({ 
  stories, 
  sizeConfig, 
  fontConfig, 
  colorConfig, 
  currentPage, 
  onPageChange 
}) => {
  const totalSpreads = stories.length + 1;
  const maxPageIndex = totalSpreads; 

  const nextPage = () => { if (currentPage < maxPageIndex) onPageChange(currentPage + 1); };
  const prevPage = () => { if (currentPage > 0) onPageChange(currentPage - 1); };

  const renderFrontCover = () => (
    <div className={`w-full h-full ${colorConfig.coverBg} ${colorConfig.coverText} flex flex-col items-center justify-center p-12 text-center shadow-2xl rounded-r-lg border-l-8 border-black/20 relative overflow-hidden`}>
      <Bookmark className={`w-16 h-16 mb-8 ${colorConfig.accent} opacity-50`} />
      <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${fontConfig.className}`}>The Book of Memories</h1>
      <p className={`text-lg md:text-xl italic ${fontConfig.className} opacity-90`}>A legacy preserved for generations</p>
    </div>
  );

  const renderBackCover = () => (
    <div className={`w-full h-full ${colorConfig.coverBg} ${colorConfig.coverText} flex flex-col items-center justify-center p-12 text-center shadow-2xl rounded-l-lg border-r-8 border-black/20 relative overflow-hidden`}>
      <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-6"><span className={`text-2xl ${fontConfig.className}`}>SK</span></div>
      <p className={`italic max-w-xs ${fontConfig.className} opacity-80`}>"Our lives are made of moments. Some small, some grand, all worth remembering."</p>
    </div>
  );

  const renderStorySpread = (story: Story, index: number) => (
    <div className={`flex w-full h-full shadow-2xl ${colorConfig.pageBg} rounded-lg overflow-hidden border border-gray-200`}>
      <div className="w-1/2 h-full border-r border-gray-200/50 relative p-8 md:p-12 flex flex-col">
        <span className={`text-[10px] uppercase tracking-widest ${colorConfig.pageText} opacity-40 mb-4`}>Chapter {index + 1}</span>
        <h2 className={`text-2xl md:text-3xl font-bold ${colorConfig.pageText} mb-4 leading-tight ${fontConfig.className}`}>{story.title}</h2>
        <div className={`${fontConfig.className} text-base md:text-lg ${colorConfig.pageText} opacity-90 leading-relaxed overflow-y-auto pr-4 flex-grow`}>{story.content.length > 900 ? story.content.substring(0, 900) + '...' : story.content}</div>
        <div className={`mt-4 text-xs ${colorConfig.pageText} opacity-30 text-center italic`}>Page {index * 2 + 1}</div>
      </div>
      <div className="w-1/2 h-full relative p-8 md:p-12 flex flex-col">
        <div className="flex-grow flex flex-col justify-center">
          {story.imageUrl ? (
            <div className={`rounded-lg overflow-hidden shadow-inner bg-gray-100 mb-6 border border-gray-200 ${sizeConfig.id === 'landscape' ? 'aspect-video' : 'aspect-square'}`}><img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" /></div>
          ) : (
             <div className="rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-gray-300 italic mb-6 aspect-square"><Bookmark className="w-8 h-8 mb-2 opacity-20" /><span className="text-sm">Unillustrated</span></div>
          )}
        </div>
        <div className={`mt-4 text-xs ${colorConfig.pageText} opacity-30 text-center italic`}>Page {index * 2 + 2}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col items-center">
      <div className={`relative w-full ${sizeConfig.aspectRatio} max-w-5xl group perspective-1000`}>
        <button onClick={prevPage} disabled={currentPage === 0} className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all z-20"><ChevronLeft className="w-8 h-8" /></button>
        <button onClick={nextPage} disabled={currentPage === maxPageIndex} className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all z-20"><ChevronRight className="w-8 h-8" /></button>
        <div className="w-full h-full flex justify-center items-center">
          {currentPage === 0 && <div className="w-1/2 h-full ml-auto">{renderFrontCover()}</div>}
          {currentPage > 0 && currentPage < maxPageIndex && <div className="w-full h-full">{renderStorySpread(stories[currentPage - 1], currentPage - 1)}</div>}
          {currentPage === maxPageIndex && <div className="w-1/2 h-full mr-auto">{renderBackCover()}</div>}
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
