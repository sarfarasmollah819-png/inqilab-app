import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  ThumbsUp,
  Heart,
  Smile,
  Frown,
  Send,
  Clock,
  Eye,
  User,
  MapPin,
  Sparkles,
  Check,
  Facebook,
  Twitter,
  Link2,
  MessageCircle,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { NewsArticle } from '../types';
import { toBengaliNumber, BengaliSpeechReader } from '../services/newsService';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onOpenArticle: (article: NewsArticle) => void;
  allArticles: NewsArticle[];
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenArticle,
  allArticles,
}) => {
  if (!article) return null;

  // Font size scale: 0: sm, 1: base, 2: lg, 3: xl
  const [fontScale, setFontScale] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [reactions, setReactions] = useState(article.reactions || { like: 120, love: 45, wow: 18, sad: 2 });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  
  // Comments state
  const [comments, setComments] = useState(article.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Reset audio state when article changes
    setIsPlayingAudio(false);
    BengaliSpeechReader.stop();
    setReactions(article.reactions || { like: 120, love: 45, wow: 18, sad: 2 });
    setComments(article.comments || []);

    return () => {
      BengaliSpeechReader.stop();
    };
  }, [article.id]);

  // Audio speech handling
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      BengaliSpeechReader.stop();
      setIsPlayingAudio(false);
    } else {
      const textToRead =
        article.audioNarrationText ||
        `${article.title}. ${article.excerpt}. ${article.content.join('. ')}`;
      setIsPlayingAudio(true);
      BengaliSpeechReader.speak(
        textToRead,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Reactions handler
  const handleReact = (type: 'like' | 'love' | 'wow' | 'sad') => {
    if (userReaction === type) return;
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setUserReaction(type);
  };

  // Add comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: 'c-' + Date.now(),
      name: commentName.trim() || 'সম্মানিত পাঠক',
      comment: commentText.trim(),
      date: 'এইমাত্র',
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  // Copy link
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Social Share Handlers
  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title}\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(article.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  // Related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const fontScaleClasses = ['font-scale-sm', 'font-scale-base', 'font-scale-lg', 'font-scale-xl'];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center items-start p-0 sm:p-4 md:p-6 transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-950 w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-0 sm:my-4 transition-colors"
      >
        {/* Top Sticky Action Bar in Reader */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">ফিরে যান</span>
          </button>

          {/* Quick Reader Controls: Font Size, Audio Reader, Bookmark, Share */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font size buttons */}
            <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-0.5 text-xs font-bold text-gray-700 dark:text-zinc-300">
              <button
                onClick={() => setFontScale((prev) => Math.max(0, prev - 1))}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${fontScale === 0 ? 'bg-emerald-800 text-white' : 'hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                title="ফন্ট ছোট করুন (A-)"
              >
                A-
              </button>
              <button
                onClick={() => setFontScale(1)}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${fontScale === 1 ? 'bg-emerald-800 text-white' : 'hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                title="সাধারণ ফন্ট সাইজ (A)"
              >
                A
              </button>
              <button
                onClick={() => setFontScale((prev) => Math.min(3, prev + 1))}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${fontScale >= 2 ? 'bg-emerald-800 text-white' : 'hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                title="ফন্ট বড় করুন (A+)"
              >
                A+
              </button>
            </div>

            {/* Audio Reader Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
              }`}
              title="সংবাদটি অডিও শুনুন"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">থামুন</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">শুনুন</span>
                </>
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
              title={isBookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded-sm">
                {article.categoryLabel}
              </span>
              {article.isBreaking && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ব্রেকিং
                </span>
              )}
              <span className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-bn text-gray-900 dark:text-zinc-100 leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-base sm:text-lg font-semibold text-red-700 dark:text-red-400">
                {article.subtitle}
              </p>
            )}

            {/* Author Line */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  {article.author.name[0]}
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-zinc-200">
                    {article.author.name}
                  </span>
                  <span className="text-gray-500 dark:text-zinc-400 ml-1">
                    • {article.author.role} ({article.author.location || 'ঢাকা'})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {toBengaliNumber(article.views)} বার পঠিত
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="space-y-2">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {article.imageCaption && (
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 italic px-1">
                <span>{article.imageCaption}</span>
                {article.imageCredit && <span>ছবি: {article.imageCredit}</span>}
              </div>
            )}
          </div>

          {/* Excerpt Highlight Box */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-700 text-emerald-950 dark:text-emerald-200 text-base font-semibold leading-relaxed">
            {article.excerpt}
          </div>

          {/* Main Article Paragraphs with Dynamic Font Scale */}
          <div className={`space-y-4 text-gray-800 dark:text-zinc-200 ${fontScaleClasses[fontScale]}`}>
            {article.content.map((p, index) => (
              <p key={index} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 mr-1">ট্যাগ:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-gray-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share Section */}
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-sm font-bold text-gray-800 dark:text-zinc-200">
                সংবাদটি শেয়ার করুন:
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareFacebook}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                title="ফেসবুকে শেয়ার করুন"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="p-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer"
                title="হোয়াটসঅ্যাপে শেয়ার করুন"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareTwitter}
                className="p-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors cursor-pointer"
                title="টুইটারে শেয়ার করুন"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                title="লিংক কপি করুন"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span>লিংক কপি</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reader Reactions */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 mb-3 text-center">
              এই খবরে আপনার অনুভূতি কী?
            </h3>
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <button
                onClick={() => handleReact('like')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer ${
                  userReaction === 'like' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 scale-105' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                }`}
              >
                <ThumbsUp className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold">লাইক</span>
                <span className="text-[11px] text-gray-500">{toBengaliNumber(reactions.like)}</span>
              </button>

              <button
                onClick={() => handleReact('love')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer ${
                  userReaction === 'love' ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 scale-105' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                }`}
              >
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <span className="text-xs font-semibold">ভালোবাসা</span>
                <span className="text-[11px] text-gray-500">{toBengaliNumber(reactions.love)}</span>
              </button>

              <button
                onClick={() => handleReact('wow')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer ${
                  userReaction === 'wow' ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 scale-105' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                }`}
              >
                <Smile className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-semibold">বিস্ময়</span>
                <span className="text-[11px] text-gray-500">{toBengaliNumber(reactions.wow)}</span>
              </button>

              <button
                onClick={() => handleReact('sad')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer ${
                  userReaction === 'sad' ? 'bg-purple-100 dark:bg-purple-950 text-purple-600 scale-105' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                }`}
              >
                <Frown className="w-5 h-5 text-purple-500" />
                <span className="text-xs font-semibold">দুঃখ</span>
                <span className="text-[11px] text-gray-500">{toBengaliNumber(reactions.sad)}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-base font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
              পাঠকের মন্তব্য ({toBengaliNumber(comments.length)})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="আপনার নাম (ঐচ্ছিক)"
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <div className="relative">
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="আপনার সুচিন্তিত মতামত লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>মন্তব্য প্রকাশ করুন</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-zinc-800">
              {comments.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-zinc-400 text-center py-2">
                  এখনো কোনো মন্তব্য করা হয়নি। আপনিই প্রথম মন্তব্য করুন!
                </p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-700/60 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-800 dark:text-emerald-400">
                        {c.name}
                      </span>
                      <span className="text-[11px] text-gray-400">{c.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">
                      {c.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-lg font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
                সম্পর্কিত অন্যান্য সংবাদ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onOpenArticle(rel)}
                    className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-16/10 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400">
                          {rel.categoryLabel}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                    <div className="px-3 pb-2.5 text-[10px] text-gray-500 dark:text-zinc-400">
                      {rel.publishedAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
