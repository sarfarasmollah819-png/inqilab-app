import React, { useState, useEffect } from 'react';
import {
  Header,
} from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { CategoryTabs } from './components/CategoryTabs';
import { LeadStoryCard } from './components/LeadStoryCard';
import { NewsCard } from './components/NewsCard';
import { IslamicLifeWidget } from './components/IslamicLifeWidget';
import { TrendingSidebar } from './components/TrendingSidebar';
import { NewsDetailModal } from './components/NewsDetailModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { EPaperModal } from './components/EPaperModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AdMobWidget } from './components/AdMobWidget';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

import {
  CATEGORIES,
  BREAKING_NEWS_LIST,
} from './data/newsData';
import {
  CategoryId,
  NewsArticle,
  NotificationItem,
} from './types';
import {
  getInitialArticles,
  getSavedBookmarks,
  saveBookmark,
  removeBookmark,
  isArticleBookmarked,
  getStoredNotifications,
  markNotificationAsRead,
  addNotification,
  BengaliSpeechReader,
  toBengaliNumber,
} from './services/newsService';
import { RefreshCw, CheckCircle, BellRing, Sparkles, Filter } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inqilab_theme_mode');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // News state
  const [articles, setArticles] = useState<NewsArticle[]>(() => getInitialArticles());
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Modals and Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [showIslamicWidgetModal, setShowIslamicWidgetModal] = useState(false);

  // Bookmarks & Notifications
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>(() => getSavedBookmarks());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStoredNotifications());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync dark mode class with <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('inqilab_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('inqilab_theme_mode', 'light');
    }
  }, [darkMode]);

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (article: NewsArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const alreadySaved = bookmarks.some((b) => b.id === article.id);
    if (alreadySaved) {
      removeBookmark(article.id);
      setBookmarks(getSavedBookmarks());
      showToast('খবরটি বুকমার্ক তালিকা থেকে সরানো হয়েছে');
    } else {
      saveBookmark(article);
      setBookmarks(getSavedBookmarks());
      showToast('খবরটি অফলাইনে পড়ার জন্য বুকমার্ক করা হয়েছে');
    }
  };

  // Quick listen audio handler
  const handleQuickListen = (article: NewsArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (BengaliSpeechReader.isSpeaking()) {
      BengaliSpeechReader.stop();
      showToast('অডিও পড়া বন্ধ করা হয়েছে');
    } else {
      showToast(`"${article.title.slice(0, 25)}..." অডিও পড়া হচ্ছে`);
      BengaliSpeechReader.speak(
        `${article.title}. ${article.excerpt}`,
        () => showToast('অডিও পড়া সম্পন্ন হয়েছে'),
        () => showToast('অডিও রিডার চালু করা সম্ভব হয়নি')
      );
    }
  };

  // Social Share
  const handleShare = (article: NewsArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('খবরের লিংক কপি করা হয়েছে!');
      }
    }
  };

  // Refresh news simulator
  const handleRefreshNews = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate real-time update by updating timestamp and view count
      const updated = articles.map((art, idx) => ({
        ...art,
        views: art.views + Math.floor(Math.random() * 25) + 5,
        publishedAt: idx === 0 ? 'এইমাত্র' : art.publishedAt,
      }));
      setArticles(updated);
      setIsRefreshing(false);
      showToast('সর্বশেষ তাজা খবর সফলভাবে আপডেট হয়েছে');
    }, 900);
  };

  // Simulated instant Breaking News push notification
  const handleTriggerTestPush = () => {
    const newNotif = addNotification({
      title: 'ব্রেকিং নিউজ: আন্তর্জাতিক জ্বালানি বাজারে তেলের দাম হ্রাস',
      excerpt: 'বিশ্ববাজারে অপরিশোধিত জ্বালানি তেলের দাম ৪ শতাংশ কমেছে।',
      time: 'এইমাত্র',
      articleId: 'art-2',
      type: 'breaking',
    });
    setNotifications(getStoredNotifications());
    showToast('নতুন ব্রেকিং নিউজ নোটিফিকেশন যুক্ত হয়েছে!');
  };

  // Mark all notifications read
  const handleMarkAllNotifsRead = () => {
    notifications.forEach((n) => markNotificationAsRead(n.id));
    setNotifications(getStoredNotifications());
    showToast('সব নোটিফিকেশন পঠিত হিসেবে চিহ্নিত করা হয়েছে');
  };

  // Filtered articles
  const filteredArticles = articles.filter((art) => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  const leadArticle = filteredArticles.find((a) => a.isTopLead) || filteredArticles[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== leadArticle?.id);

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 bg-emerald-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        savedCount={bookmarks.length}
        unreadNotifsCount={unreadNotifsCount}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenIslamicWidget={() => {
          // Scroll or toggle category
          setActiveCategory('islamic');
          const element = document.getElementById('islamic-section-widget');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker
        items={BREAKING_NEWS_LIST}
        onSelectArticle={(artId) => {
          const target = articles.find((a) => a.id === artId);
          if (target) setSelectedArticle(target);
        }}
      />

      {/* Category Navigation Bar */}
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
        articlesCount={filteredArticles.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7 space-y-6 sm:space-y-8">
        {/* Category Heading & Live Refresh Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif-bn text-gray-900 dark:text-zinc-100 flex items-center gap-2">
              <span>
                {activeCategory === 'all'
                  ? 'আজকের প্রধান খবর ও আপডেট'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </span>
              <span className="text-xs font-sans font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                {toBengaliNumber(filteredArticles.length)}টি সংবাদ
              </span>
            </h2>
          </div>

          {/* Refresh news button */}
          <button
            onClick={handleRefreshNews}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'আপডেট হচ্ছে...' : 'তাজা খবর লোড করুন'}</span>
          </button>
        </div>

        {/* Lead Story Section (Only when leadArticle is available) */}
        {leadArticle && (
          <section aria-label="প্রধান সংবাদ">
            <LeadStoryCard
              article={leadArticle}
              isBookmarked={isArticleBookmarked(leadArticle.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenArticle={(art) => setSelectedArticle(art)}
              onShare={handleShare}
              onQuickListen={handleQuickListen}
            />
          </section>
        )}

        {/* In-feed AdMob placeholder */}
        <AdMobWidget type="infeed" />

        {/* Main Grid: Left News Feed + Right Trending & Widgets Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (8 cols): News Cards Feed */}
          <div className="lg:col-span-8 space-y-6">
            {/* News Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {regularArticles.map((art) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  isBookmarked={isArticleBookmarked(art.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenArticle={(art) => setSelectedArticle(art)}
                  onShare={handleShare}
                  onQuickListen={handleQuickListen}
                />
              ))}
            </div>

            {/* Islamic Life Featured Widget in main flow */}
            <div id="islamic-section-widget">
              <IslamicLifeWidget
                onSelectCategory={(cat) => setActiveCategory(cat)}
              />
            </div>
          </div>

          {/* Right Column (4 cols): Trending, Editorials, E-paper */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <TrendingSidebar
                articles={articles}
                onOpenArticle={(art) => setSelectedArticle(art)}
                onOpenEPaper={() => setIsEPaperOpen(true)}
                onSelectCategory={(cat) => setActiveCategory(cat)}
              />
            </div>
          </div>
        </div>

        {/* Bottom AdMob Banner Placement */}
        <AdMobWidget type="banner" />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        onOpenIslamicWidget={() => {
          setActiveCategory('islamic');
          const element = document.getElementById('islamic-section-widget');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenIslamicWidget={() => {
          setActiveCategory('islamic');
          const element = document.getElementById('islamic-section-widget');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedCount={bookmarks.length}
      />

      {/* News Detail Reader Modal */}
      {selectedArticle && (
        <NewsDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={isArticleBookmarked(selectedArticle.id)}
          onToggleBookmark={(art) => handleToggleBookmark(art)}
          onOpenArticle={(art) => setSelectedArticle(art)}
          allArticles={articles}
        />
      )}

      {/* Bookmarks / Saved News Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onOpenArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={(id) => {
          removeBookmark(id);
          setBookmarks(getSavedBookmarks());
          showToast('সংরক্ষিত তালিকা থেকে সরানো হয়েছে');
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onOpenArticle={(art) => setSelectedArticle(art)}
      />

      {/* Digital E-Paper Modal */}
      <EPaperModal
        isOpen={isEPaperOpen}
        onClose={() => setIsEPaperOpen(false)}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsRead}
        onSelectNotification={(item) => {
          markNotificationAsRead(item.id);
          setNotifications(getStoredNotifications());
          if (item.articleId) {
            const target = articles.find((a) => a.id === item.articleId);
            if (target) {
              setSelectedArticle(target);
              setIsNotificationsOpen(false);
            }
          }
        }}
        onTriggerTestPush={handleTriggerTestPush}
      />
    </div>
  );
}
