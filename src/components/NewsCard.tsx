import React from 'react';
import { Bookmark, Share2, Clock, Eye, Volume2 } from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface NewsCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle, e: React.MouseEvent) => void;
  onOpenArticle: (article: NewsArticle) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
  onQuickListen?: (article: NewsArticle, e: React.MouseEvent) => void;
  compact?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onOpenArticle,
  onShare,
  onQuickListen,
  compact = false,
}) => {
  return (
    <article
      id={`news-card-${article.id}`}
      onClick={() => onOpenArticle(article)}
      className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-gray-100 dark:bg-zinc-800">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Category Badge */}
          <span className="absolute top-2.5 left-2.5 bg-emerald-800/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm backdrop-blur-xs shadow-xs">
            {article.categoryLabel}
          </span>

          {article.isBreaking && (
            <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs animate-pulse">
              জরুরি
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="p-3.5 sm:p-4 space-y-2">
          {/* Metadata: Time and Views */}
          <div className="flex items-center justify-between text-[11px] text-gray-600 dark:text-zinc-400">
            <span className="flex items-center gap-1 font-medium text-emerald-800 dark:text-emerald-400">
              {article.author.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Eye className="w-3 h-3" />
                {toBengaliNumber(article.views)}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-base sm:text-lg font-bold font-serif-bn text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          {/* Short Excerpt */}
          {!compact && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-gray-50/70 dark:bg-zinc-900/80 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {onQuickListen && (
            <button
              onClick={(e) => onQuickListen(article, e)}
              className="p-1 text-gray-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
              title="অডিও শুনুন"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[11px] text-gray-600 dark:text-zinc-400">
            {toBengaliNumber(article.readTimeMinutes)} মিনিট পড়া
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(article, e)}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                : 'text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'
            }`}
            title={isBookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক করুন'}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`}
            />
          </button>

          {/* Share Button */}
          <button
            onClick={(e) => onShare(article, e)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="শেয়ার করুন"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
