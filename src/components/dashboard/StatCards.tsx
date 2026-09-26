import React from 'react';
import { TrendingUp, Coins, ArrowUpRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatCards: React.FC = () => {
  const { wallet, language } = useApp();

  const stats = [
    {
      labelEn: "Today's Earnings",
      labelBn: 'আজকের আয়',
      amount: wallet.todayEarnings,
      subEn: '+18% vs yesterday',
      subBn: 'গতকাল থেকে ১৮% বেশি',
      icon: TrendingUp,
    },
    {
      labelEn: 'Total Earnings',
      labelBn: 'সর্বমোট আয়',
      amount: wallet.totalEarnings,
      subEn: 'All time verified',
      subBn: 'লাইফটাইম অর্জিত',
      icon: Coins,
    },
    {
      labelEn: 'Total Withdrawn',
      labelBn: 'সর্বমোট উইথড্র',
      amount: wallet.totalWithdrawn,
      subEn: 'Disbursed to MFS',
      subBn: 'বিকাশ ও নগদে সফল',
      icon: ArrowUpRight,
    },
    {
      labelEn: 'Pending Balance',
      labelBn: 'পেন্ডিং ব্যালেন্স',
      amount: wallet.pendingBalance,
      subEn: 'Under review',
      subBn: 'ভেরিফিকেশনে রয়েছে',
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#0E141D] border border-[#00E676]/20 hover:border-[#00E676]/45 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-neon-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 truncate">
                {language === 'bn' ? stat.labelBn : stat.labelEn}
              </span>
              <div className="p-2 rounded-xl bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/25 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight flex items-baseline gap-1">
                <span className="text-amber-400 text-lg">৳</span>
                <span>{stat.amount.toLocaleString()}</span>
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                  {language === 'bn' ? stat.subBn : stat.subEn}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
