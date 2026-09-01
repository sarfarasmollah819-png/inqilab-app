import React from 'react';
import { Flame, TrendingUp, Newspaper, BookOpen, ChevronRight, Eye } from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface TrendingSidebarProps {
  articles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  onOpenEPaper: () => void;
  onSelectCategory: (cat: any) => void;
}

export const TrendingSidebar: React.FC<TrendingSidebarProps> = ({
  articles,
  onOpenArticle,
  onOpenEPaper,
  onSelectCategory,
}) => {
  // Sort by views for most read
  const mostReadArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  const opinionArticles = articles.filter((a) => a.category === 'opinion' || a.category === 'islamic').slice(0, 3);

  const bengaliNumbers = ['১', '২', '৩', '৪', '৫'];

  return (
    <aside className="space-y-6">
      {/* Most Read (সর্বাধিক পঠিত) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
              সর্বাধিক পঠিত
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
            শীর্ষ ৫
          </span>
        </div>

        <div className="space-y-3.5 divide-y divide-gray-100 dark:divide-zinc-800/80">
          {mostReadArticles.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className={`pt-3 first:pt-0 group flex items-start gap-3 cursor-pointer`}
            >
              {/* Number Badge */}
              <span className="flex-shrink-0 w-6 h-6 rounded-md bg-gray-100 dark:bg-zinc-800 group-hover:bg-emerald-800 group-hover:text-white dark:group-hover:bg-emerald-700 text-gray-700 dark:text-zinc-300 font-bold text-xs flex items-center justify-center transition-colors">
                {bengaliNumbers[idx]}
              </span>

              {/* Title & metadata */}
              <div className="flex-1 space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold font-serif-bn text-gray-800 dark:text-zinc-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-zinc-400">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {toBengaliNumber(article.views)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E-Paper Digital edition Promo Card */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-700/50 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              ডিজিটাল সংস্করণ
            </span>
          </div>

          <h4 className="text-lg font-bold font-serif-bn leading-tight">
            ইনকিলাব পত্রিকা আজকের ই-পেপার
          </h4>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            মুদ্রিত কাগজের মতো হুবহু ই-পেপার পড়ুন যেকোনো ডিভাইস থেকে সহজেই।
          </p>

          <button
            onClick={onOpenEPaper}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>ই-পেপার ব্রাউজ করুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Opinion & Editorial (মতামত ও সম্পাদকীয়) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
              মতামত ও সম্পাদকীয়
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('opinion')}
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            সব দেখুন
          </button>
        </div>

        <div className="space-y-3">
          {opinionArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
            >
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                {art.categoryLabel}
              </span>
              <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 dark:text-zinc-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors line-clamp-2 mt-0.5">
                {art.title}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1 font-medium">
                {art.author.name} • {art.publishedAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
