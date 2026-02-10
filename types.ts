
export interface Story {
  id: string;
  promptId: string;
  title: string;
  content: string;
  imageUrl?: string;
  dateCreated: string;
  status: 'draft' | 'completed';
}

export interface Prompt {
  id: string;
  question: string;
  category: 'Childhood' | 'Family' | 'Career' | 'Adventures' | 'Wisdom';
  isAnswered: boolean;
}

export type ViewState = 'landing' | 'login' | 'signup' | 'dashboard' | 'editor' | 'preview';

export interface User {
  id: string;
  name: string;
  email: string;
}

export type BookSize = 'portrait' | 'square' | 'landscape' | 'compact';

export interface BookSizeConfig {
  id: BookSize;
  label: string;
  aspectRatio: string; // spread aspect ratio
  singleRatio: string; // single page ratio
  description: string;
}

export type FontStyle = 'classic' | 'minimal' | 'elegant' | 'vintage';

export interface FontStyleConfig {
  id: FontStyle;
  label: string;
  className: string;
  description: string;
}

export type ColorScheme = 'heritage' | 'midnight' | 'parchment' | 'botanical';

export interface ColorSchemeConfig {
  id: ColorScheme;
  label: string;
  coverBg: string;
  coverText: string;
  pageBg: string;
  pageText: string;
  accent: string;
  description: string;
}
