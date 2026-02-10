
import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Story, BookSizeConfig, FontStyleConfig, ColorSchemeConfig } from '../types';

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

  const nextPage = () => {
    if (currentPage < maxPageIndex) onPageChange(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const renderFrontCover = () => (
    <div className={`w-full h-full ${colorConfig.coverBg} ${colorConfig.coverText} flex flex-col items-center justify-center p-12 text-center shadow-2xl rounded-r-lg border-l-8 border-black/20 relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      <Bookmark className={`w-16 h-16 mb-8 ${colorConfig.accent} opacity-50`} />
      <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${fontConfig.className}`}>The Book of Memories</h1>
      <div className={`w-24 h-1 ${colorConfig.accent.replace('text-', 'bg-')} mb-8 opacity-50`}></div>
      <p className={`text-lg md:text-xl italic ${fontConfig.className} opacity-90`}>A legacy preserved for generations</p>
      <div className="absolute bottom-12 text-xs tracking-widest uppercase opacity-60">StoryKeeper Edition</div>
    </div>
  );

  const renderBackCover = () => (
    <div className={`w-full h-full ${colorConfig.coverBg} ${colorConfig.coverText} flex flex-col items-center justify-center p-12 text-center shadow-2xl rounded-l-lg border-r-8 border-black/20 relative overflow-hidden`}>
      <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-6">
        <span className={`text-2xl ${fontConfig.className}`}>SK</span>
      </div>
      <p className={`italic max-w-xs ${fontConfig.className} opacity-80`}>
        "Our lives are made of moments. Some small, some grand, all worth remembering."
      </p>
    </div>
  );

  const renderStorySpread = (story: Story, index: number) => (
    <div className={`flex w-full h-full shadow-2xl ${colorConfig.pageBg} rounded-lg overflow-hidden border border-gray-200`}>
      {/* Left Page */}
      <div className="w-1/2 h-full border-r border-gray-200/50 relative p-8 md:p-12 flex flex-col">
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent to-black/5 pointer-events-none" />
        <span className={`text-[10px] uppercase tracking-widest ${colorConfig.pageText} opacity-40 mb-4`}>Chapter {index + 1}</span>
        <h2 className={`text-2xl md:text-3xl font-bold ${colorConfig.pageText} mb-4 leading-tight ${fontConfig.className}`}>{story.title}</h2>
        <div className={`${fontConfig.className} text-base md:text-lg ${colorConfig.pageText} opacity-90 leading-relaxed overflow-y-auto pr-4 flex-grow`}>
          {story.content.length > 900 ? story.content.substring(0, 900) + '...' : story.content}
        </div>
        <div className={`mt-4 text-xs ${colorConfig.pageText} opacity-30 text-center italic`}>Page {index * 2 + 1}</div>
      </div>

      {/* Right Page */}
      <div className="w-1/2 h-full relative p-8 md:p-12 flex flex-col">
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-transparent to-black/5 pointer-events-none" />
        <div className="flex-grow flex flex-col justify-center">
          {story.imageUrl ? (
            <div className={`rounded-lg overflow-hidden shadow-inner bg-gray-100 mb-6 border border-gray-200 ${sizeConfig.id === 'landscape' ? 'aspect-video' : 'aspect-square'}`}>
              <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
            </div>
          ) : (
             <div className="rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-gray-300 italic mb-6 aspect-square">
                <Bookmark className="w-8 h-8 mb-2 opacity-20" />
                <span className="text-sm">Memory remains unillustrated</span>
             </div>
          )}
          {story.content.length > 900 && (
            <div className={`${fontConfig.className} text-base md:text-lg ${colorConfig.pageText} opacity-90 leading-relaxed overflow-y-auto`}>
              ...{story.content.substring(900)}
            </div>
          )}
        </div>
        <div className={`mt-4 text-xs ${colorConfig.pageText} opacity-30 text-center italic`}>Page {index * 2 + 2}</div>
      </div>
    </div>
  );

  const containerClass = useMemo(() => {
    return `relative w-full ${sizeConfig.aspectRatio} max-w-5xl group perspective-1000 transition-all duration-700`;
  }, [sizeConfig.aspectRatio]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col items-center">
      <div className={containerClass}>
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all z-20 hover:scale-110 active:scale-95"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={nextPage}
          disabled={currentPage === maxPageIndex}
          className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-indigo-600 disabled:opacity-0 transition-all z-20 hover:scale-110 active:scale-95"
          aria-label="Next Page"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="w-full h-full transition-all duration-700 ease-in-out transform-gpu flex justify-center items-center">
          {currentPage === 0 && (
            <div key="front" className={`w-1/2 h-full ml-auto animate-in fade-in slide-in-from-right-12 duration-500`}>
              {renderFrontCover()}
            </div>
          )}

          {currentPage > 0 && currentPage < maxPageIndex && (
             <div key={`page-${currentPage}`} className="w-full h-full animate-in fade-in zoom-in-95 duration-500">
               {renderStorySpread(stories[currentPage - 1], currentPage - 1)}
             </div>
          )}

          {currentPage === maxPageIndex && (
            <div key="back" className={`w-1/2 h-full mr-auto animate-in fade-in slide-in-from-left-12 duration-500`}>
              {renderBackCover()}
            </div>
          )}
        </div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] h-6 bg-black/10 blur-xl rounded-[100%]" />
      </div>

      <div className="mt-12 w-full max-w-md bg-gray-100 h-1.5 rounded-full overflow-hidden flex">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentPage / maxPageIndex) * 100}%` }}
        />
      </div>
      <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
        {currentPage === 0 ? 'Cover' : currentPage === maxPageIndex ? 'Back Cover' : `Chapter ${currentPage} of ${stories.length}`}
      </p>

      <button 
        onClick={() => window.print()}
        className="mt-8 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2 border-b border-transparent hover:border-indigo-200 pb-1 print:hidden"
      >
        Download Digital PDF Heirloom
      </button>
    </div>
  );
};

export default FlipBook;
