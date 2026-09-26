import React, { useState } from 'react';
import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction, TransactionType } from '../../types';

export const TransactionsPage: React.FC = () => {
  const { transactions, language } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterTabs = [
    { id: 'all', labelEn: 'All', labelBn: 'সবগুলো' },
    { id: 'task_reward', labelEn: 'Earnings', labelBn: 'আয়' },
    { id: 'withdrawal', labelEn: 'Withdrawals', labelBn: 'উইথড্র' },
    { id: 'daily_bonus', labelEn: 'Bonuses', labelBn: 'বোনাস' },
    { id: 'referral_bonus', labelEn: 'Referral', labelBn: 'রেফারেল' },
  ];

  const filtered = transactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.title.toLowerCase().includes(q) ||
        tx.titleBn.toLowerCase().includes(q) ||
        (tx.accountNumber && tx.accountNumber.includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 shadow-neon-sm">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 animate-pulse">
            <Clock className="w-3 h-3" />
            <span>Processing</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <AlertCircle className="w-3 h-3" />
            <span>Rejected</span>
          </span>
        );
    }
  };

  const getTxnIcon = (type: TransactionType) => {
    switch (type) {
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-amber-400" />;
      case 'referral_bonus':
        return <Users className="w-4 h-4 text-indigo-400" />;
      case 'daily_bonus':
        return <Gift className="w-4 h-4 text-amber-400" />;
      default:
        return <ArrowDownLeft className="w-4 h-4 text-[#00E676]" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'bn' ? 'লেনদেনের বিবরণ' : 'Transaction History'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn' ? 'সকল আয়, বোনাস ও উইথড্রয়ের বিস্তারিত তালিকা' : 'Complete audit record of every debit and credit transaction'}
          </p>
        </div>

        <button
          onClick={() => alert('Exporting statement as PDF/CSV...')}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E141D] text-slate-300 border border-[#00E676]/20 text-xs font-bold hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#00E676]" />
          <span>Statement</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                  : 'bg-[#0E141D] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-[#0E141D] text-xs text-white placeholder:text-slate-500 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676]"
          />
        </div>
      </div>

      {/* Transactions Container */}
      <div className="bg-[#0E141D] rounded-3xl border border-[#00E676]/20 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No transactions found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {filtered.map((tx) => {
              const isCredit = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#121922] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-3 rounded-2xl bg-[#07090D] flex-shrink-0 border border-slate-800">
                      {getTxnIcon(tx.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {language === 'bn' ? tx.titleBn : tx.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded-md bg-[#07090D] border border-slate-800">
                          {tx.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {tx.description || tx.type}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {tx.date} at {tx.time} {tx.accountNumber ? `• MFS: ${tx.accountNumber}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col justify-between sm:items-end gap-1.5 pl-12 sm:pl-0">
                    <span
                      className={`text-sm sm:text-base font-black font-sans ${
                        isCredit ? 'text-[#00E676] drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]' : 'text-white'
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
        )}
      </div>
    </div>
  );
};
