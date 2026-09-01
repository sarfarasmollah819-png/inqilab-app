import React, { useState } from 'react';
import {
  X,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Calendar,
  Layers,
} from 'lucide-react';
import { toBengaliNumber, getBengaliCurrentDate } from '../services/newsService';

interface EPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const dateInfo = getBengaliCurrentDate();

  const pages = [
    { pageNum: 1, title: 'প্রথম পাতা (প্রধান সংবাদ ও জাতীয়)', code: 'P01' },
    { pageNum: 2, title: 'দ্বিতীয় পাতা (নগর ও জনপদ)', code: 'P02' },
    { pageNum: 3, title: 'তৃতীয় পাতা (রাজনীতি ও শাসনব্যবস্থা)', code: 'P03' },
    { pageNum: 4, title: 'চতুর্থ পাতা (ব্যবসা-বাণিজ্য ও অর্থনীতি)', code: 'P04' },
    { pageNum: 5, title: 'পঞ্চম পাতা (আন্তর্জাতিক ও মুসলিম বিশ্ব)', code: 'P05' },
    { pageNum: 6, title: 'ষষ্ঠ পাতা (খেলাধুলা ও বিনোদন)', code: 'P06' },
  ];

  if (!isOpen) return null;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pages.length ? prev + 1 : 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : pages.length));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm flex flex-col justify-between animate-in fade-in"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 text-white px-4 sm:px-6 py-3 border-b border-zinc-800 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-700 text-white">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif-bn">
              ইনকিলাব পত্রিকা ই-পেপার (E-Paper)
            </h3>
            <p className="text-xs text-zinc-400">
              {dateInfo.bengaliDate} • {dateInfo.hijriDate}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-zinc-800 rounded-lg p-0.5 text-xs text-zinc-300">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.2))}
              className="p-1.5 hover:bg-zinc-700 rounded-md cursor-pointer"
              title="জুম কমান"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.2))}
              className="p-1.5 hover:bg-zinc-700 rounded-md cursor-pointer"
              title="জুম বাড়ান"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => alert('আজকের পূর্ণাঙ্গ ই-পেপার সংস্করণ প্রস্তুত হচ্ছে...')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">পিডিএফ ডাউনলোড</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main E-Paper Display Canvas */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-1 overflow-auto p-4 flex items-center justify-center relative"
      >
        {/* Navigation Floating Chevrons */}
        <button
          onClick={handlePrevPage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/90 text-white hover:bg-emerald-700 border border-zinc-700 shadow-xl transition-colors cursor-pointer"
          title="পূর্ববর্তী পাতা"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextPage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/90 text-white hover:bg-emerald-700 border border-zinc-700 shadow-xl transition-colors cursor-pointer"
          title="পরবর্তী পাতা"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Paper Sheet Preview */}
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center top' }}
          className="w-full max-w-3xl bg-amber-50/95 text-zinc-900 p-6 sm:p-8 rounded-lg shadow-2xl border border-amber-200/80 space-y-4 transition-transform duration-200"
        >
          {/* Broadsheet Newspaper Header */}
          <div className="border-b-4 border-double border-zinc-900 pb-3 text-center space-y-1">
            <div className="flex items-center justify-between text-[11px] text-zinc-600 font-semibold border-b border-zinc-400 pb-1">
              <span>রেজিস্টার্ড নং ডব্লিউবি-৭৪</span>
              <span>কলকাতা, {dateInfo.bengaliDate} ({dateInfo.hijriDate})</span>
              <span>মূল্য: ৫.০০ রুপি</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif-bn tracking-tight text-emerald-950 pt-1">
              ইনকিলাব পত্রিকা
            </h1>
            <p className="text-xs font-bold text-zinc-700">
              "সত্য, নিরপেক্ষতা ও ইনসাফের প্রতীক"
            </p>
            <div className="bg-emerald-950 text-white text-xs font-bold py-0.5 px-3 rounded-xs uppercase tracking-widest inline-block">
              {pages[currentPage - 1].title} • পৃষ্ঠা নং {toBengaliNumber(currentPage)}
            </div>
          </div>

          {/* Grid Broadsheet Columns Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed pt-2">
            <div className="md:col-span-2 space-y-2 border-r-0 md:border-r border-zinc-300 pr-0 md:pr-4">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-bn text-zinc-950 leading-tight">
                {currentPage === 1
                  ? 'একনেকে ১২ হাজার কোটি টাকার উন্নয়ন প্রকল্প অনুমোদন, গ্রামীণ অবকাঠামোতে সর্বোচ্চ জোর'
                  : `বিশেষ প্রতিবেদন: ${pages[currentPage - 1].title} সংক্রান্ত সমসাময়িক পর্যালোচনা`}
              </h2>
              <div className="w-full h-44 bg-zinc-200 rounded-xs overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop"
                  alt="News"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-justify font-serif-bn">
                ইনকিলাব রিপোর্ট: জাতীয় অর্থনৈতিক পরিষদের নির্বাহী কমিটির (একনেক) সভায় দেশের তৃণমূল যোগাযোগ, কৃষি সেচ ব্যবস্থা ও বন্যা নিয়ন্ত্রণের জন্য ১২ হাজার কোটি টাকার মেগা প্রকল্প প্যাকেজের চূড়ান্ত অনুমোদন দেওয়া হয়েছে।
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-b border-zinc-300 pb-2">
                <h3 className="font-bold text-sm font-serif-bn text-zinc-950">
                  বিদ্যুৎ সংস্কারে উচ্চপর্যায়ের টাস্কফোর্স
                </h3>
                <p className="text-[11px] text-zinc-700 mt-1">
                  নবায়নযোগ্য শক্তি উৎপাদন বৃদ্ধি ও সিস্টেম লস কমাতে রূপরেখা চূড়ান্ত হচ্ছে।
                </p>
              </div>

              <div className="border-b border-zinc-300 pb-2">
                <h3 className="font-bold text-sm font-serif-bn text-zinc-950">
                  প্রবাসী আয়ে নতুন রেকর্ড
                </h3>
                <p className="text-[11px] text-zinc-700 mt-1">
                  চলতি মাসে রেমিট্যান্স প্রবাহ বেড়েছে ২১ শতাংশ।
                </p>
              </div>

              <div className="p-2.5 bg-emerald-900 text-white rounded-xs text-[11px]">
                <div className="font-bold text-amber-300">নামাজের সময়সূচি (কলকাতা)</div>
                <div>ফজর: ০৪:৩০ | যোহর: ১২:০৫ | মাগরিব: ০৬:২৩</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Page Thumbnails Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 text-white px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between overflow-x-auto no-scrollbar gap-2"
      >
        <div className="text-xs text-zinc-400 font-semibold shrink-0">
          পাতা নির্বাচন করুন:
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {pages.map((p) => (
            <button
              key={p.pageNum}
              onClick={() => setCurrentPage(p.pageNum)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentPage === p.pageNum
                  ? 'bg-emerald-700 text-white ring-2 ring-emerald-500/50'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              পৃষ্ঠা {toBengaliNumber(p.pageNum)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
