import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdMobWidgetProps {
  type: 'banner' | 'infeed' | 'interstitial';
  onClose?: () => void;
}

export const AdMobWidget: React.FC<AdMobWidgetProps> = ({ type, onClose }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  if (type === 'banner') {
    return (
      <div className="w-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-2 sm:p-3 relative overflow-hidden my-4">
        {/* Ad Tag */}
        <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-zinc-500 font-semibold mb-1 px-1">
          <span className="flex items-center gap-1">
            <span className="bg-amber-400/90 text-amber-950 px-1 rounded-xs font-bold">বিজ্ঞাপন</span>
            <span>Google AdMob Banner (320x50 / 728x90)</span>
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="hover:text-gray-700 dark:hover:text-zinc-300 cursor-pointer"
            title="বিজ্ঞাপন বন্ধ করুন"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Ad Body */}
        <div className="bg-white dark:bg-zinc-950 rounded-lg p-3 border border-dashed border-gray-300 dark:border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ইনকিলাব
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-zinc-100">
                ইনকিলাব পত্রিকা অ্যান্ড্রয়েড ও আইওএস অ্যাপ
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-1">
                প্রতিদিনের টাটকা খবর, ব্রেকিং নিউজ ও নামাজের সময় জানতে এখনই ডাউনলোড করুন।
              </p>
            </div>
          </div>

          <button className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer">
            ইনস্টল করুন
          </button>
        </div>
      </div>
    );
  }

  if (type === 'infeed') {
    return (
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 rounded-xl border border-emerald-200/80 dark:border-zinc-800 p-4 relative overflow-hidden my-3">
        <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-zinc-500 font-semibold mb-2">
          <span className="bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-xs font-bold">
            স্পন্সরড / Sponsored
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="hover:text-gray-700 dark:hover:text-zinc-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-28 h-20 rounded-lg bg-emerald-900 text-white flex items-center justify-center shrink-0 font-serif-bn font-bold text-center text-xs p-2">
            ইসলামিক ব্যাংকিং পার্টনার
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100">
              সুদমুক্ত শরীয়াহ সম্মত বিনিয়োগ ও ডিজিটাল ব্যাংকিং সেবা
            </h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              ঘরে বসেই অ্যাকাউন্ট খুলুন এবং নিশ্চিন্তে লেনদেন করুন যেকোনো সময়।
            </p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shrink-0">
            বিস্তারিত দেখুন
          </button>
        </div>
      </div>
    );
  }

  return null;
};
