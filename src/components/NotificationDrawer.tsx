import React from 'react';
import {
  Bell,
  X,
  CheckCheck,
  Flame,
  Send,
  Sparkles,
  Info,
} from 'lucide-react';
import { NotificationItem } from '../types';
import { toBengaliNumber } from '../services/newsService';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onTriggerTestPush: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onTriggerTestPush,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-zinc-800 transition-transform duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between bg-gray-50/70 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-bn text-gray-900 dark:text-zinc-100">
                নোটিফিকেশন
              </h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                {unreadCount > 0
                  ? `${toBengaliNumber(unreadCount)}টি অপঠিত নোটিফিকেশন`
                  : 'সকল নোটিফিকেশন পড়া হয়েছে'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="p-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="সব পঠিত চিহ্নিত করুন"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FCM Push Notification Simulator Bar */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="leading-tight">
              FCM পুশ নোটিফিকেশন সক্রিয়
            </span>
          </div>
          <button
            onClick={onTriggerTestPush}
            className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all text-xs cursor-pointer shadow-xs whitespace-nowrap"
          >
            টেস্ট এলার্ট পাঠান
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                <Bell className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-gray-800 dark:text-zinc-200">
                কোনো নতুন নোটিফিকেশন নেই
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-xs">
                গুরুত্বপূর্ণ ও ব্রেকিং নিউজ সরাসরি আপনার স্ক্রিনে চলে আসবে।
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  !item.isRead
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-2xs'
                    : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 opacity-80'
                }`}
              >
                {/* Type Icon */}
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    item.type === 'breaking'
                      ? 'bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400'
                  }`}
                >
                  {item.type === 'breaking' ? (
                    <Flame className="w-4 h-4 fill-red-500" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'breaking'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-emerald-700 dark:text-emerald-400'
                      }`}
                    >
                      {item.type === 'breaking' ? 'ব্রেকিং নিউজ' : 'বিশেষ আপডেট'}
                    </span>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold font-serif-bn text-gray-900 dark:text-zinc-100 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/60 text-xs text-gray-500 dark:text-zinc-400 text-center">
          ইনকিলাব পত্রিকা পুশ সার্ভিস • স্বয়ংক্রিয় আপডেট
        </div>
      </div>
    </div>
  );
};
