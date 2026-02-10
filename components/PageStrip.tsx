
import React from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Book as BookIcon } from 'lucide-react';
import { Story, ColorSchemeConfig } from '../types';

interface SortableThumbnailProps {
  id: string;
  story: Story;
  index: number;
  isActive: boolean;
  onClick: () => void;
  colorConfig: ColorSchemeConfig;
}

const SortableThumbnail: React.FC<SortableThumbnailProps> = ({ id, story, index, isActive, onClick, colorConfig }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`relative flex-shrink-0 w-32 h-44 group transition-shadow ${isDragging ? 'opacity-50' : ''}`}
    >
      <div 
        className={`w-full h-full rounded-md border-2 overflow-hidden flex flex-col transition-all ${
          isActive 
            ? 'border-indigo-600 ring-4 ring-indigo-100 scale-105 shadow-xl' 
            : 'border-gray-200 hover:border-gray-300 shadow-sm'
        } ${colorConfig.pageBg}`}
      >
        <div 
          onClick={onClick}
          className="flex-grow p-3 flex flex-col gap-1 overflow-hidden cursor-pointer"
        >
          <span className="text-[7px] uppercase tracking-tighter text-gray-400 font-bold">Ch. {index + 1}</span>
          <h4 className="text-[10px] font-bold leading-tight text-gray-800 line-clamp-3">{story.title}</h4>
          {story.imageUrl && (
            <div className="mt-2 w-full aspect-video rounded-sm overflow-hidden border border-gray-100 bg-gray-50">
              <img src={story.imageUrl} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" alt="" />
            </div>
          )}
        </div>
        <div 
          {...attributes} 
          {...listeners} 
          className="h-7 bg-white/70 border-t border-gray-100 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-indigo-50 transition-colors"
        >
           <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

interface PageStripProps {
  stories: Story[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onReorder: (stories: Story[]) => void;
  colorConfig: ColorSchemeConfig;
}

const PageStrip: React.FC<PageStripProps> = ({ stories, currentPage, onPageChange, onReorder, colorConfig }) => {
  // Use strings for SortableContext items
  const storyIds = React.useMemo(() => stories.map(s => s.id), [stories]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = stories.findIndex((s) => s.id === active.id);
      const newIndex = stories.findIndex((s) => s.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(arrayMove(stories, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="w-full bg-gray-50/50 border-t border-gray-200 py-8 px-4 mt-8 print:hidden overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <BookIcon className="w-3 h-3" />
            Chapter Navigation & Layout
          </h3>
          <span className="text-[10px] text-gray-400">Drag handle to reorder • Click card to jump</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 hide-scrollbar">
          {/* Front Cover Thumbnail (Not sortable) */}
          <div 
            onClick={() => onPageChange(0)}
            className={`flex-shrink-0 w-32 h-44 rounded-md border-2 flex flex-col items-center justify-center p-4 cursor-pointer transition-all shadow-sm ${
              currentPage === 0 
                ? 'border-indigo-600 ring-4 ring-indigo-100 scale-105 shadow-xl' 
                : 'border-gray-200 hover:border-gray-300'
            } ${colorConfig.coverBg} ${colorConfig.coverText}`}
          >
            <BookIcon className="w-6 h-6 mb-2 opacity-30" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Front Cover</span>
          </div>

          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={storyIds}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-4">
                {stories.map((story, index) => (
                  <SortableThumbnail
                    key={story.id}
                    id={story.id}
                    story={story}
                    index={index}
                    isActive={currentPage === index + 1}
                    onClick={() => onPageChange(index + 1)}
                    colorConfig={colorConfig}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Back Cover Thumbnail (Not sortable) */}
          <div 
            onClick={() => onPageChange(stories.length + 1)}
            className={`flex-shrink-0 w-32 h-44 rounded-md border-2 flex flex-col items-center justify-center p-4 cursor-pointer transition-all shadow-sm ${
              currentPage === stories.length + 1
                ? 'border-indigo-600 ring-4 ring-indigo-100 scale-105 shadow-xl' 
                : 'border-gray-200 hover:border-gray-300'
            } ${colorConfig.coverBg} ${colorConfig.coverText}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-center">Back Cover</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStrip;
