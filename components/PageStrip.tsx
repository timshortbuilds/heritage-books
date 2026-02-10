
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, TouchSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Book as BookIcon } from 'lucide-react';
import { Story, ColorSchemeConfig } from '../types.ts';

interface SortableThumbnailProps { id: string; story: Story; index: number; isActive: boolean; onClick: () => void; colorConfig: ColorSchemeConfig; }

const SortableThumbnail: React.FC<SortableThumbnailProps> = ({ id, story, index, isActive, onClick, colorConfig }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 50 : 1 }} className={`relative flex-shrink-0 w-32 h-44 group ${isDragging ? 'opacity-50' : ''}`}>
      <div className={`w-full h-full rounded-md border-2 overflow-hidden flex flex-col transition-all ${isActive ? 'border-indigo-600 ring-4 ring-indigo-100 scale-105 shadow-xl' : 'border-gray-200 shadow-sm'} ${colorConfig.pageBg}`}>
        <div onClick={onClick} className="flex-grow p-3 flex flex-col gap-1 cursor-pointer overflow-hidden">
          <span className="text-[7px] uppercase tracking-tighter text-gray-400 font-bold">Ch. {index + 1}</span>
          <h4 className="text-[10px] font-bold leading-tight text-gray-800 line-clamp-3">{story.title}</h4>
          {story.imageUrl && <div className="mt-2 w-full aspect-video rounded-sm overflow-hidden"><img src={story.imageUrl} className="w-full h-full object-cover" alt="" /></div>}
        </div>
        <div {...attributes} {...listeners} className="h-7 bg-white/70 border-t border-gray-100 flex items-center justify-center cursor-grab"><GripVertical className="w-4 h-4 text-gray-400" /></div>
      </div>
    </div>
  );
};

interface PageStripProps { stories: Story[]; currentPage: number; onPageChange: (page: number) => void; onReorder: (stories: Story[]) => void; colorConfig: ColorSchemeConfig; }

const PageStrip: React.FC<PageStripProps> = ({ stories, currentPage, onPageChange, onReorder, colorConfig }) => {
  const storyIds = React.useMemo(() => stories.map(s => s.id), [stories]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = stories.findIndex((s) => s.id === active.id);
      const newIndex = stories.findIndex((s) => s.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) onReorder(arrayMove(stories, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-full bg-gray-50/50 border-t border-gray-200 py-8 px-4 mt-8 print:hidden">
      <div className="max-w-6xl mx-auto overflow-x-auto flex gap-4 pb-4">
        <div onClick={() => onPageChange(0)} className={`flex-shrink-0 w-32 h-44 rounded-md border-2 flex flex-col items-center justify-center p-4 cursor-pointer ${currentPage === 0 ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-gray-200'} ${colorConfig.coverBg} ${colorConfig.coverText}`}><BookIcon className="w-6 h-6 mb-2 opacity-30" /><span className="text-[10px] font-bold uppercase tracking-widest text-center">Front Cover</span></div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={storyIds} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-4">
              {stories.map((s, i) => <SortableThumbnail key={s.id} id={s.id} story={s} index={i} isActive={currentPage === i + 1} onClick={() => onPageChange(i + 1)} colorConfig={colorConfig} />)}
            </div>
          </SortableContext>
        </DndContext>
        <div onClick={() => onPageChange(stories.length + 1)} className={`flex-shrink-0 w-32 h-44 rounded-md border-2 flex flex-col items-center justify-center p-4 cursor-pointer ${currentPage === stories.length + 1 ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-gray-200'} ${colorConfig.coverBg} ${colorConfig.coverText}`}><span className="text-[10px] font-bold uppercase tracking-widest text-center">Back Cover</span></div>
      </div>
    </div>
  );
};

export default PageStrip;
