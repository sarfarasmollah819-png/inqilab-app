import React from 'react';
import {
  Sun,
  Moon,
  Search,
  Bookmark,
  Bell,
  Newspaper,
  Calendar,
  Clock,
  CloudSun,
  Flame,
  Volume2,
} from 'lucide-react';
import { getBengaliCurrentDate, toBengaliNumber } from '../services/newsService';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenNotifications: () => void;
  onOpenEPaper: () => void;
  savedCount: number;
  unreadNotifsCount: number;
  onSelectCategory: (catId: any) => void;
  onOpenIslamicWidget?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenBookmarks,
  onOpenNotifications,
  onOpenEPaper,
  savedCount,
  unreadNotifsCount,
  onSelectCategory,
  onOpenIslamicWidget,
}) => {
  const dateInfo = getBengaliCurrentDate();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 shadow-xs transition-colors duration-200">
      {/* Top micro bar: Date, Weather, Prayer times shortcut */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between border-b border-emerald-800">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-medium">{dateInfo.bengaliDate}</span>
          </div>
          <span className="hidden md:inline text-emerald-400 opacity-60">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
            <span>{dateInfo.hijriDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center gap-1 text-emerald-200">
            <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            <span>কলকাতা ২৯°সে. রৌদ্রোজ্জ্বল</span>
          </div>
          <span className="hidden sm:inline text-emerald-400 opacity-60">|</span>
          <button
            onClick={onOpenIslamicWidget}
            className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">নামাজের সময়সূচি</span>
            <span className="sm:hidden">নামাজ</span>
          </button>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
        {/* Left: Newspaper Logo & Motto */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-3 cursor-pointer group"
          id="newspaper-brand-logo"
        >
          {/* Stylized Emblem matching user's Inqilab logo */}
          <div className="relative flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 bg-linear-to-br from-emerald-800 to-emerald-950 rounded-xl flex items-center justify-center shadow-md border-2 border-emerald-600/40 p-1 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full border border-amber-400/40 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-emerald-900/60">
              {/* Sun rays & fist motif */}
              <div className="absolute -top-1 w-6 h-6 bg-amber-400/20 rounded-full blur-xs"></div>
              <span className="text-amber-400 font-bold text-base leading-none font-serif-bn">ই</span>
              <span className="text-[9px] text-white/90 font-medium tracking-tight mt-0.5">ইনকিলাব</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-bn tracking-tight text-emerald-900 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                ইনকিলাব পত্রিকা
              </h1>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-sm bg-red-600 text-white tracking-wider">
                অনলাইন
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-600 dark:text-zinc-400 font-medium tracking-wide">
              "সত্য, নিরপেক্ষতা ও ইনসাফের প্রতীক"
            </p>
          </div>
        </div>

        {/* Right actions: Search, Dark Mode, Bookmarks, Notifications, E-Paper */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* E-Paper button */}
          <button
            id="epaper-header-btn"
            onClick={onOpenEPaper}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all cursor-pointer shadow-2xs"
            title="আজকের ই-পেপার পড়ুন"
          >
            <Newspaper className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            <span>ই-পেপার</span>
          </button>

          {/* Search Button */}
          <button
            id="search-header-btn"
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="খবর অনুসন্ধান করুন"
            aria-label="অনুসন্ধান"
          >
            <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden md:inline text-xs font-medium">অনুসন্ধান</span>
          </button>

          {/* Bookmarks / Saved articles */}
          <button
            id="bookmarks-header-btn"
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="সংরক্ষিত খবর"
            aria-label="বুকমার্ক"
          >
            <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {toBengaliNumber(savedCount)}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button
            id="notifications-header-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="নোটিফিকেশন"
            aria-label="নোটিফিকেশন"
          >
            <Bell className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {toBengaliNumber(unreadNotifsCount)}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-amber-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title={darkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            aria-label="থিম পরিবর্তন"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
