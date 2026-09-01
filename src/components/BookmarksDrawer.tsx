import React from 'react';
import { Bookmark, X, Trash2, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onOpenArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-zinc-800 transition-transform duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between bg-gray-50/70 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Bookmark className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
                সংরক্ষিত সংবাদ (বুকমার্ক)
              </h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                অফলাইনে পড়ার জন্য সংরক্ষিত ({toBengaliNumber(bookmarks.length)}টি খবর)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                <Bookmark className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-gray-800 dark:text-zinc-200">
                কোনো খবর সংরক্ষিত নেই
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-xs">
                যেকোনো খবরের বুকমার্ক আইকনে ক্লিক করে অফলাইনে পরে পড়ার জন্য সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            bookmarks.map((article) => (
              <div
                key={article.id}
                className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-3 hover:shadow-md transition-all flex gap-3 cursor-pointer"
                onClick={() => {
                  onOpenArticle(article);
                  onClose();
                }}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                      {article.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.publishedAt}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(article.id);
                      }}
                      className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/60 transition-colors cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/60 flex items-center justify-between text-xs text-gray-600 dark:text-zinc-400">
            <span>অফলাইন ক্যাশিং সক্রিয়</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              ইনকিলাব পত্রিকা
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
