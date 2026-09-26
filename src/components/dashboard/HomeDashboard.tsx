import React from 'react';
import { Sparkles, CheckCircle2, Zap, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BalanceCard } from './BalanceCard';
import { StatCards } from './StatCards';
import { EarningsChart } from './EarningsChart';
import { QuickActions } from './QuickActions';
import { RecentTransactions } from './RecentTransactions';

export const HomeDashboard: React.FC = () => {
  const { currentUser, language, setCurrentScreen } = useApp();

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Top Welcome Bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {language === 'bn' ? `হ্যালো, ${currentUser.name}` : `Hello, ${currentUser.name}`}
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 shadow-neon-sm">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn' ? 'স্বাগতম! আজকের কাজগুলো সম্পন্ন করে আয় করুন।' : 'Welcome back! Ready to earn today?'}
          </p>
        </div>

        {/* Streak Quick Badge with Gold/Amber Accent */}
        <button
          onClick={() => setCurrentScreen('daily_bonus')}
          className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/25 transition-all shadow-gold"
        >
          <span className="text-base sm:text-xl">🔥</span>
          <div className="text-left hidden sm:block">
            <p className="text-[10px] uppercase font-black text-amber-400/80 leading-tight">
              Streak
            </p>
            <p className="text-xs font-black text-white leading-none">
              {currentUser.currentStreak} {language === 'bn' ? 'দিন' : 'Days'}
            </p>
          </div>
        </button>
      </div>

      {/* Featured Banner with Black/Charcoal Background & Neon Green Border */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C151A] via-[#091116] to-[#060B0E] text-white p-5 sm:p-6 border border-[#00E676]/30 shadow-neon-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] text-xs font-black border border-[#00E676]/30">
              <Zap className="w-3.5 h-3.5 fill-[#00E676]" />
              <span>{language === 'bn' ? 'ঘরে বসেই আয় করুন' : 'Work from Anywhere'}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              “ছোট ছোট কাজ বড় বড় স্বপ্ন”
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === 'bn'
                ? 'ভিডিও দেখা, সার্ভে পূরণ ও কুইজ খেলে প্রতিদিন ২০০৳ থেকে ৫০০৳ আয় করুন। সরাসরি বিকাশ ও নগদে পেমেন্ট।'
                : 'Complete micro-tasks, surveys & quizzes. Withdraw your earnings via bKash & Nagad.'}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setCurrentScreen('earn')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-neon-sm hover:shadow-neon"
            >
              <span>{language === 'bn' ? 'আয় শুরু করুন' : 'Start Earning'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Soft background ambient light */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Balance Card */}
      <BalanceCard />

      {/* 4 Statistics Cards */}
      <StatCards />

      {/* Quick Actions Shortcuts */}
      <QuickActions />

      {/* Grid: Earnings Chart + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7">
          <EarningsChart />
        </div>
        <div className="lg:col-span-5">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};
