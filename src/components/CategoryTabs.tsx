import React, { useRef } from 'react';
import {
  Home,
  Flag,
  Landmark,
  Globe,
  TrendingUp,
  Trophy,
  Moon,
  Film,
  PenTool,
  Laptop,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Category, CategoryId } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  articlesCount?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="w-3.5 h-3.5" />,
  Flag: <Flag className="w-3.5 h-3.5" />,
  Landmark: <Landmark className="w-3.5 h-3.5" />,
  Globe: <Globe className="w-3.5 h-3.5" />,
  TrendingUp: <TrendingUp className="w-3.5 h-3.5" />,
  Trophy: <Trophy className="w-3.5 h-3.5" />,
  Moon: <Moon className="w-3.5 h-3.5" />,
  Film: <Film className="w-3.5 h-3.5" />,
  PenTool: <PenTool className="w-3.5 h-3.5" />,
  Laptop: <Laptop className="w-3.5 h-3.5" />,
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  articlesCount,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center">
        {/* Left scroll chevron */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex p-1.5 rounded-full text-gray-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10 cursor-pointer"
          aria-label="বামে স্ক্রোল করুন"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center space-x-1 sm:space-x-1.5 py-2.5 overflow-x-auto no-scrollbar scroll-smooth px-1"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs scale-102 ring-2 ring-emerald-600/30'
                    : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-emerald-800 dark:hover:text-emerald-400'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-gray-500 dark:text-zinc-400'}>
                  {ICON_MAP[cat.icon] || <Home className="w-3.5 h-3.5" />}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right scroll chevron */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex p-1.5 rounded-full text-gray-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10 cursor-pointer"
          aria-label="ডানে স্ক্রোল করুন"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
