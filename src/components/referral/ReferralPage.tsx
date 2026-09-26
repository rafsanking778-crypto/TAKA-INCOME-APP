import React, { useState } from 'react';
import {
  Users,
  Copy,
  Share2,
  CheckCircle,
  Gift,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReferralPage: React.FC = () => {
  const { currentUser, language, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const refCode = currentUser.referralCode || 'RAFSAN123';
  const refLink = `https://taka.app/ref/${refCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopiedCode(true);
    showToast(language === 'bn' ? 'রেফারেল কোড কপি হয়েছে!' : 'Referral code copied!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopiedLink(true);
    showToast(language === 'bn' ? 'রেফারেল লিংক কপি হয়েছে!' : 'Referral link copied!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Taka Income App',
        text: `Taka Income App-এ জয়েন করে ঘরে বসেই কাজ করে আয় করুন। আমার কোড ব্যবহার করুন: ${refCode}`,
        url: refLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const referredUsers = [
    { name: 'Sadia Akter', date: '2026-09-25', status: 'Qualified', earned: 100 },
    { name: 'Rahim Khan', date: '2026-09-22', status: 'Qualified', earned: 100 },
    { name: 'Tanvir Hossain', date: '2026-09-20', status: 'Qualified', earned: 100 },
    { name: 'Mehedi Hasan', date: '2026-09-18', status: 'Qualified', earned: 100 },
    { name: 'Nusrat Jahan', date: '2026-09-15', status: 'Registered', earned: 0 },
    { name: 'Sakib Al Hasan', date: '2026-09-12', status: 'Registered', earned: 0 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'bn' ? 'রেফার ও ইনভাইট' : 'Referral Program'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'bn'
            ? 'বন্ধুদের ইনভাইট করে প্রতি ভেরিফায়েড রেফারে ৫০৳ - ১০০৳ পর্যন্ত ইনস্ট্যান্ট বোনাস পান'
            : 'Earn ৳50 for every qualified friend who registers with your code'}
        </p>
      </div>

      {/* Large Green Referral Banner matching prompt */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0C1E16] via-[#091510] to-[#040907] border-2 border-[#00E676]/35 text-white shadow-neon relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/15 text-[#00E676] text-xs font-black border border-[#00E676]/30 shadow-neon-sm">
            <Gift className="w-3.5 h-3.5" />
            <span>Invite Friends & Earn</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Get ৳ 50 per qualified referral
          </h3>
          <p className="text-xs text-slate-300">
            {language === 'bn'
              ? 'আপনার বন্ধু রেজিস্ট্রেশন করে ১ম টাস্ক সম্পূর্ণ করলেই আপনার ওয়ালেটে ৫০৳ স্বয়ংক্রিয়ভাবে জমা হবে।'
              : 'Earn cash bonus every time your referred contact registers and finishes 1 verified task.'}
          </p>
        </div>

        <button
          onClick={handleShare}
          className="relative z-10 py-3 px-6 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-neon self-start sm:self-auto"
        >
          <span>Share Link</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-60 h-60 bg-[#00E676]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Referral Code & Link Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
        {/* Referral Code */}
        <div>
          <label className="block text-xs font-black text-slate-300 mb-1.5 uppercase tracking-wider">
            {language === 'bn' ? 'আপনার রেফারেল কোড' : 'Your Referral Code'}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-2xl bg-[#07090D] border border-slate-800 font-mono font-black text-base sm:text-lg tracking-wider text-[#00E676]">
              {refCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="px-5 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-neon-sm active:scale-98"
            >
              {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
              <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div>
          <label className="block text-xs font-black text-slate-300 mb-1.5 uppercase tracking-wider">
            {language === 'bn' ? 'রেফারেল লিংক' : 'Your Referral Link'}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 rounded-2xl bg-[#07090D] border border-slate-800 text-xs font-medium text-slate-300 truncate">
              {refLink}
            </div>
            <button
              onClick={handleShare}
              className="px-5 py-3 rounded-2xl bg-[#121922] hover:bg-[#182330] text-white border border-[#00E676]/30 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm active:scale-98"
            >
              <Share2 className="w-4 h-4 text-[#00E676]" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Referral Statistics: Total Referrals, Qualified Referrals, Referral Earnings */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase">
            Total Referrals
          </span>
          <span className="text-xl sm:text-3xl font-black font-sans text-white">
            {currentUser.totalReferrals}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/30 text-center shadow-neon-sm">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase">
            Qualified Referrals
          </span>
          <span className="text-xl sm:text-3xl font-black font-sans text-[#00E676]">
            {currentUser.qualifiedReferrals}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-amber-400/25 text-center shadow-gold">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase">
            Referral Earnings
          </span>
          <span className="text-xl sm:text-3xl font-black font-sans text-amber-400 flex items-baseline justify-center gap-0.5">
            <span>৳</span>
            <span>{currentUser.referralEarnings}</span>
          </span>
        </div>
      </div>

      {/* Referred Friends Table */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          {language === 'bn' ? 'আমন্ত্রিত বন্ধুদের তালিকা' : 'Invited Friends'}
        </h3>

        <div className="divide-y divide-slate-800">
          {referredUsers.map((user, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#00E676]/15 text-[#00E676] font-bold flex items-center justify-center text-xs border border-[#00E676]/30">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.date}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    user.status === 'Qualified'
                      ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {user.status}
                </span>
                <span className="block font-sans font-black text-amber-400 mt-0.5">
                  +৳ {user.earned}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
