import React, { useState, useMemo } from 'react';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onOpenArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const popularKeywords = [
    'একনেক',
    'বাজেট',
    'ফিলিস্তিন',
    'ক্রিকেট',
    'রবিউল আউয়াল',
    'রেমিট্যান্স',
    'এআই',
    'বিদ্যুৎ',
  ];

  const filteredArticles = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all') return [];

    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory;

      const q = query.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesText =
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q)) ||
        art.author.name.toLowerCase().includes(q) ||
        art.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [query, selectedCategory, articles]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center items-start p-3 sm:p-6 transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-4 sm:my-10 transition-colors"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="খবরের শিরোনাম, বিষয় বা কি-ওয়ার্ড দিয়ে খুঁজুন..."
            className="flex-1 bg-transparent text-base sm:text-lg text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Keywords */}
        <div className="px-4 sm:px-5 py-3 bg-gray-50/70 dark:bg-zinc-900/60 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-gray-500 dark:text-zinc-400 font-semibold shrink-0">
            জনপ্রিয় অনুসন্ধান:
          </span>
          {popularKeywords.map((kw, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(kw)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-emerald-600 dark:hover:border-emerald-500 text-gray-700 dark:text-zinc-300 transition-colors cursor-pointer shrink-0"
            >
              #{kw}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() || selectedCategory !== 'all' ? (
            <div>
              <div className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-3">
                ফলাফল পাওয়া গেছে: {toBengaliNumber(filteredArticles.length)}টি খবর
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    "{query}" সংক্রান্ত কোনো খবর পাওয়া যায়নি।
                  </p>
                  <p className="text-xs text-gray-500">
                    বানান যাচাই করুন অথবা অন্য কোনো প্রাসঙ্গিক শব্দ দিয়ে চেষ্টা করুন।
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onOpenArticle(art);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-emerald-600 dark:hover:border-emerald-500 hover:shadow-xs transition-all flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-zinc-800">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                            {art.categoryLabel}
                          </span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-400">{art.publishedAt}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-gray-500 dark:text-zinc-400">
              <Search className="w-8 h-8 mx-auto text-emerald-600/50 mb-2" />
              <p className="text-sm font-medium">
                অনুসন্ধান করতে কী-ওয়ার্ড টাইপ করুন
              </p>
              <p className="text-xs">
                জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি বা ইসলামিক জীবনের যেকোনো খবর সহজে খুঁজে নিন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
