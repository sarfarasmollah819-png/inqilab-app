import { NewsArticle, NotificationItem } from '../types';
import { INITIAL_ARTICLES, BREAKING_NEWS_LIST } from '../data/newsData';

const BOOKMARKS_KEY = 'inqilab_saved_articles_v1';
const NOTIFICATIONS_KEY = 'inqilab_notifications_v1';
const ARTICLES_STORAGE_KEY = 'inqilab_custom_articles_v1';

// Bengali digit and date converter
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function getBengaliCurrentDate(): {
  bengaliDate: string;
  hijriDate: string;
  englishDate: string;
  timeString: string;
} {
  const days = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার',
  ];
  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const dateNum = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'বিকাল' : 'সকাল';
  const displayHours = hours % 12 || 12;
  const timeString = `${ampm} ${toBengaliNumber(displayHours)}:${toBengaliNumber(
    minutes.toString().padStart(2, '0')
  )}`;

  return {
    bengaliDate: `${dayName}, ${dateNum} ${monthName} ${yearNum}`,
    hijriDate: '১৯ রবিউল আউয়াল ১৪৪৮ হিজরি',
    englishDate: now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    timeString,
  };
}

// Bookmarks local storage management
export function getSavedBookmarks(): NewsArticle[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load bookmarks', e);
    return [];
  }
}

export function saveBookmark(article: NewsArticle): boolean {
  try {
    const existing = getSavedBookmarks();
    if (existing.some((a) => a.id === article.id)) {
      return false; // already saved
    }
    const updated = [article, ...existing];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save bookmark', e);
    return false;
  }
}

export function removeBookmark(articleId: string): void {
  try {
    const existing = getSavedBookmarks();
    const updated = existing.filter((a) => a.id !== articleId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to remove bookmark', e);
  }
}

export function isArticleBookmarked(articleId: string): boolean {
  const existing = getSavedBookmarks();
  return existing.some((a) => a.id === articleId);
}

// Notifications storage and hooks
export function getStoredNotifications(): NotificationItem[] {
  try {
    const data = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!data) {
      const initial: NotificationItem[] = [
        {
          id: 'notif-1',
          title: 'ব্রেকিং নিউজ: একনেকে ১২ হাজার কোটি টাকার উন্নয়ন প্রকল্প অনুমোদন',
          excerpt: 'গ্রামীণ সড়ক ও সেচ ব্যবস্থার সংস্কারে বিশেষ গুরুত্ব।',
          time: '১০ মিনিট আগে',
          articleId: 'art-1',
          isRead: false,
          type: 'breaking',
        },
        {
          id: 'notif-2',
          title: 'পবিত্র রবিউল আউয়াল: ইনসাফপূর্ণ সমাজ বিনির্মাণে সিরাতের শিক্ষা',
          excerpt: 'ইসলামিক জীবন বিভাগের বিশেষ প্রবন্ধ পড়ুন।',
          time: '১ ঘণ্টা আগে',
          articleId: 'art-7',
          isRead: false,
          type: 'special',
        },
        {
          id: 'notif-3',
          title: 'টি-টোয়েন্টি বিশ্বকাপের চূড়ান্ত দল ঘোষিত',
          excerpt: 'নতুন তিন প্রতিভাকে অন্তর্ভুক্ত করা হয়েছে।',
          time: '৩ ঘণ্টা আগে',
          articleId: 'art-6',
          isRead: true,
          type: 'daily',
        },
      ];
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load notifications', e);
    return [];
  }
}

export function markNotificationAsRead(id: string): void {
  try {
    const current = getStoredNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update notification', e);
  }
}

export function addNotification(item: Omit<NotificationItem, 'id' | 'isRead'>): NotificationItem {
  const newNotif: NotificationItem = {
    ...item,
    id: 'notif-' + Date.now(),
    isRead: false,
  };
  try {
    const current = getStoredNotifications();
    const updated = [newNotif, ...current];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to add notification', e);
  }
  return newNotif;
}

// Text-to-Speech Bengali Speech Synthesis
export class BengaliSpeechReader {
  private static synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static utterance: SpeechSynthesisUtterance | null = null;

  static speak(text: string, onEnd?: () => void, onError?: () => void): void {
    if (!this.synth) {
      onError?.();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-IN'; // Bengali (India)
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    // Try to locate a Bengali voice if browser has one installed
    const voices = this.synth.getVoices();
    const bengaliVoice = voices.find((v) => v.lang.startsWith('bn') || v.name.includes('Bangla') || v.name.includes('Bengali'));
    if (bengaliVoice) {
      utterance.voice = bengaliVoice;
    }

    utterance.onend = () => {
      this.utterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.utterance = null;
      onError?.();
    };

    this.utterance = utterance;
    this.synth.speak(utterance);
  }

  static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.utterance = null;
    }
  }

  static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

// Fetch live articles (with fallback to default and dynamic refresh)
export function getInitialArticles(): NewsArticle[] {
  try {
    const custom = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading custom articles', e);
  }
  return INITIAL_ARTICLES;
}

export function saveArticles(articles: NewsArticle[]): void {
  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed saving articles', e);
  }
}
