
import { Prompt, BookSizeConfig, FontStyleConfig, ColorSchemeConfig, Story } from './types';

export const INITIAL_PROMPTS: Prompt[] = [
  { id: '1', question: 'What is one of your earliest memories from childhood?', category: 'Childhood', isAnswered: true },
  { id: '2', question: 'How did you meet your spouse or partner?', category: 'Family', isAnswered: true },
  { id: '3', question: 'What was your first job, and what did it teach you?', category: 'Career', isAnswered: true },
  { id: '4', question: 'Tell the story of how you first came to know Jesus Christ as your Savior. How has your walk with the Lord changed as you\'ve grown older?', category: 'Wisdom', isAnswered: false },
  { id: '5', question: 'Tell a story about a time you were truly brave.', category: 'Adventures', isAnswered: false },
  { id: '6', question: 'What are the most important Christian values you\'ve sought to instill in your children and grandchildren? How did you strive to build a Christ-centered home?', category: 'Family', isAnswered: false },
  { id: '7', question: 'What is the best piece of advice you ever received?', category: 'Wisdom', isAnswered: false },
  { id: '8', question: 'What is your favorite memory from Sunday School, a church potluck, or a youth group event? Who in your early church life most influenced your faith?', category: 'Childhood', isAnswered: false },
  { id: '9', question: 'Tell a story about a time you clearly felt the Holy Spirit\'s guidance or witnessed God\'s hand at work in a difficult or miraculous situation.', category: 'Adventures', isAnswered: false },
  { id: '10', question: 'Which Bible verse or promise from Scripture has been your "anchor" during life\'s storms? How did God use His Word to comfort you during a specific trial?', category: 'Wisdom', isAnswered: false },
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    promptId: '1',
    title: 'The Blue Bicycle',
    content: 'I remember the bright blue frame and the squeak of the training wheels on the driveway. My father was holding the back of the seat, promising not to let go. The sun was warm on my neck, and the smell of freshly cut grass filled the air. That moment of pure terror turning into triumph when I realized he HAD let go remains one of my most vivid childhood milestones.',
    dateCreated: new Date().toISOString(),
    status: 'completed'
  },
  {
    id: 's2',
    promptId: '2',
    title: 'Coffee and Rain',
    content: 'We both reached for the last blueberry muffin at the corner bakery on a rainy Tuesday in Seattle. Instead of an awkward apology, we shared a laugh and then a table. Two hours of conversation later, I knew I wanted to know everything about her. It started with a muffin and turned into a lifetime.',
    dateCreated: new Date().toISOString(),
    status: 'completed'
  },
  {
    id: 's3',
    promptId: '3',
    title: 'Paper Routes',
    content: 'My first job was delivering papers at 5:00 AM. It taught me the value of consistency and the quiet beauty of the world before it wakes up. I learned that showing up when you don\'t want to is often the most important part of any job.',
    dateCreated: new Date().toISOString(),
    status: 'completed'
  }
];

export const CATEGORY_COLORS: Record<string, string> = {
  Childhood: 'bg-blue-100 text-blue-800',
  Family: 'bg-rose-100 text-rose-800',
  Career: 'bg-emerald-100 text-emerald-800',
  Adventures: 'bg-amber-100 text-amber-800',
  Wisdom: 'bg-indigo-100 text-indigo-800',
};

export const BOOK_SIZES: BookSizeConfig[] = [
  { 
    id: 'portrait', 
    label: 'Classic Portrait', 
    aspectRatio: 'aspect-[3/2]', 
    singleRatio: 'aspect-[3/4]',
    description: 'The standard choice for family histories (8.5" x 11").' 
  },
  { 
    id: 'square', 
    label: 'Modern Square', 
    aspectRatio: 'aspect-[2/1]', 
    singleRatio: 'aspect-[1/1]',
    description: 'Clean, elegant, and perfectly balanced (10" x 10").' 
  },
  { 
    id: 'landscape', 
    label: 'Cinematic Landscape', 
    aspectRatio: 'aspect-[2.6/1]', 
    singleRatio: 'aspect-[4/3]',
    description: 'Best for showcasing large, beautiful illustrations.' 
  },
  { 
    id: 'compact', 
    label: 'Journal', 
    aspectRatio: 'aspect-[4/3]', 
    singleRatio: 'aspect-[2/3]',
    description: 'A cozy, smaller format perfect for pocket reading.' 
  },
];

export const FONT_STYLES: FontStyleConfig[] = [
  {
    id: 'classic',
    label: 'Classic',
    className: 'font-style-classic',
    description: 'Traditional heritage serif typography.'
  },
  {
    id: 'minimal',
    label: 'Minimal',
    className: 'font-style-minimal',
    description: 'Clean, modern sans-serif for clarity.'
  },
  {
    id: 'elegant',
    label: 'Elegant',
    className: 'font-style-elegant',
    description: 'High-contrast display serif for a boutique feel.'
  },
  {
    id: 'vintage',
    label: 'Vintage',
    className: 'font-style-vintage',
    description: 'A nostalgic typewriter style for memories.'
  }
];

export const COLOR_SCHEMES: ColorSchemeConfig[] = [
  {
    id: 'heritage',
    label: 'Heritage',
    coverBg: 'bg-indigo-900',
    coverText: 'text-white',
    pageBg: 'bg-[#fdfbf7]',
    pageText: 'text-gray-900',
    accent: 'text-indigo-400',
    description: 'Classic navy and ivory.'
  },
  {
    id: 'midnight',
    label: 'Midnight',
    coverBg: 'bg-gray-950',
    coverText: 'text-gray-100',
    pageBg: 'bg-[#fafafa]',
    pageText: 'text-gray-800',
    accent: 'text-gray-400',
    description: 'Formal charcoal and silver.'
  },
  {
    id: 'parchment',
    label: 'Parchment',
    coverBg: 'bg-[#4a3728]',
    coverText: 'text-[#e6d5b8]',
    pageBg: 'bg-[#f4ebd0]',
    pageText: 'text-[#2c1e14]',
    accent: 'text-[#8b5e3c]',
    description: 'Warm earth tones and sepia.'
  },
  {
    id: 'botanical',
    label: 'Botanical',
    coverBg: 'bg-[#2d4033]',
    coverText: 'text-[#f0f4f1]',
    pageBg: 'bg-[#f8faf8]',
    pageText: 'text-[#1a2e21]',
    accent: 'text-[#5c8a67]',
    description: 'Deep forest greens and off-white.'
  }
];
