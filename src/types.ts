export type CategoryId =
  | 'all'
  | 'national'
  | 'politics'
  | 'economy'
  | 'sports'
  | 'world'
  | 'entertainment'
  | 'islamic'
  | 'opinion'
  | 'tech';

export interface Category {
  id: CategoryId;
  label: string;
  enLabel: string;
  icon: string;
  color: string;
}

export interface Author {
  name: string;
  role: string;
  avatar?: string;
  location?: string;
}

export interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;
  avatarColor?: string;
}

export interface Reactions {
  like: number;
  love: number;
  wow: number;
  sad: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string[];
  category: CategoryId;
  categoryLabel: string;
  imageUrl: string;
  imageCaption?: string;
  imageCredit?: string;
  author: Author;
  publishedAt: string; // e.g. "১০ মিনিট আগে" or formatted string
  publishedTimestamp: number;
  readTimeMinutes: number;
  views: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTopLead?: boolean;
  tags: string[];
  audioNarrationText?: string;
  reactions: Reactions;
  comments: Comment[];
  relatedIds?: string[];
}

export interface BreakingNews {
  id: string;
  title: string;
  time: string;
  category: string;
  articleId: string;
}

export interface PrayerTimeData {
  city: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sehri: string;
  iftar: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  excerpt: string;
  time: string;
  articleId?: string;
  isRead: boolean;
  type: 'breaking' | 'daily' | 'special';
}
