import React from 'react';
import {
  Newspaper,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Send,
  Heart,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenEPaper: () => void;
  onOpenIslamicWidget: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenEPaper,
  onOpenIslamicWidget,
}) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-red-600 pt-10 pb-16 sm:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-emerald-800/80">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-amber-400/40 flex items-center justify-center font-serif-bn font-bold text-amber-400 text-lg shadow-xs">
                ই
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-bn text-white">
                  ইনকিলাব পত্রিকা
                </h3>
                <p className="text-[11px] text-amber-300">
                  "সত্য, নিরপেক্ষতা ও ইনসাফের প্রতীক"
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              ভারতবর্ষের কোটি কোটি বাংলাভাষী পাঠকের আস্থা ও নির্ভরযোগ্য জাতীয় পত্রিকা। আমরা সত্য, ন্যায় ও বস্তুনিষ্ঠ সাংবাদিকতায় সর্বদা অবিচল।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-emerald-900/90 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-emerald-900/90 hover:bg-sky-500 text-white flex items-center justify-center transition-colors"
                title="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-emerald-900/90 hover:bg-red-700 text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-emerald-900/90 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 border-b border-emerald-800 pb-1.5">
              সংবাদ বিভাগসমূহ
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('national')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>জাতীয় সংবাদ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('politics')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>রাজনীতি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('world')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>আন্তর্জাতিক</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('economy')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>অর্থনীতি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sports')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>খেলাধুলা</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('islamic')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>ইসলামিক জীবন</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('opinion')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>মতামত ও সম্পাদকীয়</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tech')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>তথ্যপ্রযুক্তি</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Special Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 border-b border-emerald-800 pb-1.5">
              বিশেষ সেবা
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenEPaper}
                className="w-full text-left p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-white">ইনকিলাব ই-পেপার সংস্করণ</span>
                <Newspaper className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onOpenIslamicWidget}
                className="w-full text-left p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-white">নামাজের সময়সূচি ও হাদিস</span>
                <span className="text-amber-400 font-bold">আজকের</span>
              </button>

              <div className="p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-800/80 text-[11px] space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>বিজ্ঞাপন ও সার্কুলেশন যোগাযোগ</span>
                </div>
                <div className="text-emerald-200">বিজ্ঞাপন হটলাইন: +৯১ ৩৩ ২২৩৪ ৫৬৭৮</div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 border-b border-emerald-800 pb-1.5">
              যোগাযোগ ও ব্যুরো কার্যালয়
            </h4>
            <div className="space-y-2 text-xs text-emerald-200/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>সেন্ট্রাল এভিনিউ, পার্ক সার্কাস, কলকাতা-৭০০০১৭, পশ্চিমবঙ্গ, ভারত।</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ফোন: +৯১ ৩৩ ২২৩৪ ৫৬৭৮ / ৯</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ইমেইল: news@inqilabpatrika.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/80">
          <div>
            © {new Date().getFullYear()} ইনকিলাব পত্রিকা (Inqilab Patrika)। সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">গোপনীয়তা নীতি</a>
            <span>•</span>
            <a href="#" className="hover:underline">ব্যবহারের শর্তাবলী</a>
            <span>•</span>
            <a href="#" className="hover:underline">সাইটম্যাপ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
