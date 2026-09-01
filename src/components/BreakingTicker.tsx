import React, { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { BreakingNews } from '../types';

interface BreakingTickerProps {
  items: BreakingNews[];
  onSelectArticle: (articleId: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  items,
  onSelectArticle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="bg-red-50 dark:bg-red-950/40 border-y border-red-200 dark:border-red-900/60 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center gap-2 sm:gap-3">
        {/* Flashing Breaking Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-xs uppercase tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span className="font-serif-bn">ব্রেকিং নিউজ</span>
        </div>

        {/* Ticker Content */}
        <div
          className="flex-1 overflow-hidden cursor-pointer group"
          onClick={() => currentItem.articleId && onSelectArticle(currentItem.articleId)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/50 px-1.5 py-0.5 rounded-xs">
              {currentItem.category}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-zinc-200 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {currentItem.title}
            </span>
            <span className="text-[11px] text-gray-600 dark:text-zinc-400 shrink-0 font-normal">
              ({currentItem.time})
            </span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded-xs hover:bg-red-200 dark:hover:bg-red-900/60 text-red-800 dark:text-red-300 transition-colors cursor-pointer"
            aria-label="পূর্ববর্তী ব্রেকিং খবর"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-xs hover:bg-red-200 dark:hover:bg-red-900/60 text-red-800 dark:text-red-300 transition-colors cursor-pointer"
            aria-label="পরবর্তী ব্রেকিং খবর"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
