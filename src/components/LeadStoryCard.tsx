import React from 'react';
import {
  Bookmark,
  Share2,
  Clock,
  Eye,
  Volume2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface LeadStoryCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle, e: React.MouseEvent) => void;
  onOpenArticle: (article: NewsArticle) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
  onQuickListen?: (article: NewsArticle, e: React.MouseEvent) => void;
}

export const LeadStoryCard: React.FC<LeadStoryCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onOpenArticle,
  onShare,
  onQuickListen,
}) => {
  return (
    <div
      id={`lead-story-${article.id}`}
      onClick={() => onOpenArticle(article)}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col lg:flex-row"
    >
      {/* Visual Area (Image) */}
      <div className="lg:w-7/12 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent lg:hidden" />

        {/* Lead Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>প্রধান সংবাদ</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-emerald-800/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
          {article.categoryLabel}
        </div>

        {/* Image credit on bottom desktop */}
        {article.imageCaption && (
          <div className="hidden lg:block absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white/90 text-[11px] px-2.5 py-1 rounded-sm truncate">
            {article.imageCaption}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="lg:w-5/12 p-4 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata: Author & Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              {article.author.name} • {article.author.location || 'ঢাকা'}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {toBengaliNumber(article.views)}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-bold font-serif-bn text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-snug">
            {article.title}
          </h2>

          {/* Subtitle if present */}
          {article.subtitle && (
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              {article.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Quick bullet points if article has multiple paragraphs */}
          {article.content.length > 1 && (
            <div className="hidden sm:block pt-1 space-y-1">
              <div className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-zinc-400">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="truncate">{article.content[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Quick Listen Button */}
            {onQuickListen && (
              <button
                onClick={(e) => onQuickListen(article, e)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
                title="অডিও খবর শুনুন"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>শুনুন</span>
              </button>
            )}

            {/* Read Time */}
            <span className="text-xs text-gray-600 dark:text-zinc-400">
              পড়ার সময়: {toBengaliNumber(article.readTimeMinutes)} মিনিট
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(article, e)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-zinc-400'
              }`}
              title={isBookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক করুন'}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`}
              />
            </button>

            {/* Share button */}
            <button
              onClick={(e) => onShare(article, e)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-zinc-400 transition-colors cursor-pointer"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Read detail arrow */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform ml-1">
              <span>বিস্তারিত</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
