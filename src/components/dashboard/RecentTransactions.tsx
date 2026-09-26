import React from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const RecentTransactions: React.FC = () => {
  const { transactions, setCurrentScreen, language } = useApp();
  const recent = transactions.slice(0, 4);

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 shadow-neon-sm">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Completed</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 animate-pulse">
            <Clock className="w-2.5 h-2.5" />
            <span>Processing</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Clock className="w-2.5 h-2.5" />
            <span>Pending</span>
          </span>
        );
      case 'rejected':
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>Rejected</span>
          </span>
        );
    }
  };

  const getTxnIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'withdrawal':
        return (
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
      case 'referral_bonus':
        return (
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Users className="w-4 h-4" />
          </div>
        );
      case 'daily_bonus':
        return (
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Gift className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 rounded-xl bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-white">
            {language === 'bn' ? 'সাম্প্রতিক লেনদেন' : 'Recent Transactions'}
          </h3>
          <p className="text-[11px] text-slate-400">
            {language === 'bn' ? 'সর্বশেষ আয় ও উইথড্র স্টেটাস' : 'Latest earnings & payouts'}
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('transactions')}
          className="flex items-center gap-1 text-xs font-black text-[#00E676] hover:underline"
        >
          <span>{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-800/80">
        {recent.map((tx) => {
          const isCredit = tx.amount > 0;
          return (
            <div key={tx.id} className="py-3 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                {getTxnIcon(tx.type)}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {language === 'bn' ? tx.titleBn : tx.title}
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1 py-0.2 rounded border border-slate-800">
                      {tx.id}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {tx.date} • {tx.time} {tx.accountNumber ? `(${tx.accountNumber})` : ''}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                <span
                  className={`text-xs sm:text-sm font-black font-sans ${
                    isCredit ? 'text-[#00E676] drop-shadow-[0_0_6px_rgba(0,230,118,0.4)]' : 'text-slate-200'
                  }`}
                >
                  {isCredit ? `+৳ ${tx.amount}` : `-৳ ${Math.abs(tx.amount)}`}
                </span>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
