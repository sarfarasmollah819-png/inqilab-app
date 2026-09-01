import React, { useState } from 'react';
import { Moon, Clock, BookOpen, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { PRAYER_TIMES_DATA, DAILY_HADITH } from '../data/newsData';

interface IslamicLifeWidgetProps {
  onSelectCategory: (category: any) => void;
}

export const IslamicLifeWidget: React.FC<IslamicLifeWidgetProps> = ({
  onSelectCategory,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('kolkata');
  const cityData = PRAYER_TIMES_DATA[selectedCity] || PRAYER_TIMES_DATA.kolkata;

  const prayerItems = [
    { name: 'ফজর', time: cityData.fajr, icon: '🌅' },
    { name: 'সূর্যোদয়', time: cityData.sunrise, icon: '☀️' },
    { name: 'যোহর', time: cityData.dhuhr, icon: '☀️' },
    { name: 'আসর', time: cityData.asr, icon: '🌤️' },
    { name: 'মাগরিব', time: cityData.maghrib, icon: '🌇' },
    { name: 'এশা', time: cityData.isha, icon: '🌙' },
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-950 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-700/40 relative overflow-hidden">
      {/* Islamic Geometric decorative background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header with City Picker */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-800/80 border border-emerald-600/50 shadow-xs">
            <Moon className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif-bn tracking-tight text-white flex items-center gap-1.5">
              <span>ইসলামিক জীবন ও নামাজের সময়</span>
              <span className="text-xs bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                আজকের সূচি
              </span>
            </h3>
            <p className="text-xs text-emerald-200/80">
              ১৯ রবিউল আউয়াল ১৪৪৮ হিজরি
            </p>
          </div>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-600/40 rounded-lg px-2.5 py-1 text-xs">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="kolkata" className="bg-emerald-900 text-white">কলকাতা</option>
            <option value="delhi" className="bg-emerald-900 text-white">দিল্লি</option>
            <option value="mumbai" className="bg-emerald-900 text-white">মুম্বাই</option>
            <option value="hyderabad" className="bg-emerald-900 text-white">হায়দ্রাবাদ</option>
            <option value="patna" className="bg-emerald-900 text-white">পাটনা</option>
            <option value="siliguri" className="bg-emerald-900 text-white">শিলিগুড়ি</option>
          </select>
        </div>
      </div>

      {/* 5 Waqt Prayer Times Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {prayerItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-emerald-800/40 hover:bg-emerald-800/70 border border-emerald-700/50 rounded-xl p-2.5 text-center transition-all duration-200"
          >
            <span className="text-base block mb-0.5">{item.icon}</span>
            <div className="text-xs text-emerald-200 font-medium">{item.name}</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">{item.time}</div>
          </div>
        ))}
      </div>

      {/* Sehri & Iftar Banner */}
      <div className="bg-emerald-950/70 border border-emerald-700/40 rounded-xl px-4 py-2 flex items-center justify-around text-xs mb-4">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-300 font-semibold">সেহরির শেষ সময়:</span>
          <span className="font-bold text-amber-300">{cityData.sehri} মি.</span>
        </div>
        <span className="text-emerald-600">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-300 font-semibold">ইফতারের সময়:</span>
          <span className="font-bold text-amber-300">{cityData.iftar} মি.</span>
        </div>
      </div>

      {/* Daily Hadith Banner */}
      <div className="bg-emerald-800/30 border border-emerald-600/40 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>দৈনিক হাদিস শরীফ</span>
        </div>
        <p className="text-center font-serif-bn text-emerald-100 text-base sm:text-lg mb-2 font-medium">
          {DAILY_HADITH.arabic}
        </p>
        <p className="text-xs sm:text-sm text-gray-200 text-center font-medium leading-relaxed">
          "{DAILY_HADITH.bengali}"
        </p>
        <div className="text-right text-[11px] text-emerald-300/80 mt-1">
          — {DAILY_HADITH.source}
        </div>
      </div>

      {/* Explore Category Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onSelectCategory('islamic')}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <span>ইসলামিক জীবনের সকল খবর ও প্রবন্ধ পড়ুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
