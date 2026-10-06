export type TabType = 'explore' | 'categories' | 'my-rolls' | 'community' | 'generator-detail';

export type DetailGeneratorId = 'feline-jung' | 'fantasy-tavern' | 'deep-space';

export interface GeneratorItem {
  id: string;
  detailId?: DetailGeneratorId;
  title: string;
  creator: string;
  creatorHandle: string;
  avatarUrl?: string;
  rollsCount: number;
  savesCount: number;
  forksCount: number;
  category: 'rpg' | 'writing' | 'prompts' | 'sci-fi' | 'names' | 'utility';
  tags: string[];
  version: string;
  curated?: boolean;
  sampleOutput: string;
  rating?: number;
  currentSeed?: string;
  lastRolled?: string;
}

export interface Curator {
  name: string;
  handle: string;
  followers: string;
  avatarUrl: string;
  verified?: boolean;
  specialty: string;
}

export interface CommunityFork {
  id: string;
  title: string;
  remixedFrom: string;
  preview: string;
  timeAgo: string;
  likes: number;
  tag: string;
}

export interface SavedRollItem {
  id: string;
  generatorId: string;
  generatorTitle: string;
  content: string;
  seed: string;
  timestamp: string;
  category: string;
  pinned?: boolean;
}
