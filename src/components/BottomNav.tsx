import React from 'react';
import { Home, Grid, Clock, Newspaper, Bookmark } from 'lucide-react';
import { CategoryId } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface BottomNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenIslamicWidget: () => void;
  onOpenEPaper: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenIslamicWidget,
  onOpenEPaper,
  onOpenBookmarks,
  savedCount,
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 py-1.5 px-3 shadow-lg transition-colors">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activeCategory === 'all'
              ? 'text-emerald-800 dark:text-emerald-400 font-bold'
              : 'text-gray-500 dark:text-zinc-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">হোম</span>
        </button>

        {/* Categories / National */}
        <button
          onClick={() => onSelectCategory('national')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activeCategory === 'national'
              ? 'text-emerald-800 dark:text-emerald-400 font-bold'
              : 'text-gray-500 dark:text-zinc-400'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px]">জাতীয়</span>
        </button>

        {/* Prayer times */}
        <button
          onClick={onOpenIslamicWidget}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span className="text-[10px]">নামাজ</span>
        </button>

        {/* E-Paper */}
        <button
          onClick={onOpenEPaper}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <Newspaper className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-[10px]">ই-পেপার</span>
        </button>

        {/* Bookmarks */}
        <button
          onClick={onOpenBookmarks}
          className="relative flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          {savedCount > 0 && (
            <span className="absolute 0 top-0.5 right-2 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {toBengaliNumber(savedCount)}
            </span>
          )}
          <span className="text-[10px]">সংরক্ষিত</span>
        </button>
      </div>
    </nav>
  );
};
