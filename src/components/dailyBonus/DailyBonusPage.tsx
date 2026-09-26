import React from 'react';
import {
  Flame,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DailyBonusPage: React.FC = () => {
  const { currentUser, dailyRewards, hasClaimedToday, claimDailyBonus, language } = useApp();

  const currentStreak = currentUser.currentStreak;

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'bn' ? 'দৈনিক বোনাস' : 'Daily Bonus'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'bn'
            ? 'প্রতিদিন লগইন করে ধারাবাহিক বোনাস সংগ্রহ করুন এবং ৭ম দিনে বড় পুরস্কার জিতুন!'
            : 'Check in daily to build your streak and unlock escalating cash rewards!'}
        </p>
      </div>

      {/* Main Roadmap Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#0E141D] border border-[#00E676]/25 shadow-xs space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-black border border-amber-400/30 shadow-gold">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>
              {language === 'bn' ? `বর্তমান স্ট্রিক: ${currentStreak} দিন` : `Current Streak: ${currentStreak} days`}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white">
            Check in daily & get rewards!
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn'
              ? 'পরপর ৭ দিন চেক-ইন করলে মোট ৳২৪০ পর্যন্ত নগদ বোনাস পাওয়া যায়।'
              : 'Maintain consecutive logins to unlock maximum cash rewards'}
          </p>
        </div>

        {/* 7-Day Visual Grid with glowing green and gold elements */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {dailyRewards.slice(0, 6).map((step) => {
            const isCompleted = step.day <= currentStreak;
            const isToday = step.day === currentStreak && !hasClaimedToday;

            return (
              <div
                key={step.day}
                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center relative ${
                  isCompleted
                    ? 'border-[#00E676] bg-[#00E676]/15 text-[#00E676] shadow-neon-sm'
                    : isToday
                    ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-gold animate-pulse'
                    : 'border-slate-800 bg-[#07090D] text-slate-400'
                }`}
              >
                {/* Completed Check Badge */}
                {isCompleted && (
                  <span className="w-5 h-5 rounded-full bg-[#00E676] text-slate-950 flex items-center justify-center text-xs mb-1 font-black shadow-neon-sm">
                    ✓
                  </span>
                )}

                <span className="text-[11px] font-black uppercase tracking-wider block mb-1">
                  Day {step.day}
                </span>

                <span className="text-base sm:text-lg font-black font-sans text-white flex items-baseline gap-0.5">
                  <span className="text-amber-400 text-sm">৳</span>
                  <span>{step.reward}</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Day 7 Golden Mystery Reward Card with Gold Glow */}
        <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-[#1E1708] via-[#161106] to-[#0A0702] text-white shadow-gold border-2 border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-amber-300/40 shadow-gold">
              🎁
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-amber-400 block">
                Ultimate 7th Day Reward
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Day 7 → ৳ 100 Reward!
              </h3>
              <p className="text-xs text-slate-300">
                Complete 7 consecutive check-ins to open this Golden Reward Chest.
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-black font-sans text-amber-400 block drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              ৳ 100
            </span>
            <span className="text-xs font-bold text-slate-300">Cash Bonus</span>
          </div>
        </div>

        {/* Claim Action Button */}
        <div className="pt-2 text-center">
          <button
            onClick={claimDailyBonus}
            disabled={hasClaimedToday}
            className={`w-full max-w-sm py-3.5 px-6 rounded-2xl font-black text-sm transition-all shadow-md active:scale-98 ${
              hasClaimedToday
                ? 'bg-[#121922] text-slate-500 cursor-not-allowed border border-slate-800'
                : 'bg-[#00E676] hover:bg-[#00FF87] text-slate-950 shadow-neon'
            }`}
          >
            {hasClaimedToday
              ? language === 'bn'
                ? 'আজকের বোনাস গ্রহণ সম্পন্ন হয়েছে ✓'
                : "Today's Bonus Claimed ✓"
              : language === 'bn'
              ? `আজকের বোনাস সংগ্রহ করুন (৳${dailyRewards[Math.min(6, currentStreak)].reward})`
              : `Claim Day ${Math.min(7, currentStreak + 1)} Reward`}
          </button>

          <p className="text-xs text-slate-400 mt-2.5 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00E676]" />
            <span>
              {hasClaimedToday
                ? language === 'bn'
                  ? 'পরবর্তী রিওয়ার্ড আনলক হবে আগামী কাল'
                  : 'Next check-in unlocks tomorrow at 00:00'
                : language === 'bn'
                ? 'আজকের রিওয়ার্ড প্রস্তুত আছে!'
                : 'Reward is ready to claim now!'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
