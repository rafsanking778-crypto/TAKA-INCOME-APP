import React from 'react';
import {
  Wallet,
  ArrowDownToLine,
  Receipt,
  Eye,
  EyeOff,
  Coins,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WalletPage: React.FC = () => {
  const { wallet, showBalance, setShowBalance, setCurrentScreen, language, depositDemoMoney } = useApp();

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'bn' ? 'আমার ওয়ালেট' : 'My Wallet'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn'
              ? 'আপনার অর্জিত ব্যালেন্স ও উইথড্রয়ের হিসাব'
              : 'Secure balance, pending approvals and disbursement management'}
          </p>
        </div>

        <button
          onClick={() => depositDemoMoney(500)}
          className="px-3 py-1.5 rounded-xl bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 text-xs font-black hover:bg-[#00E676]/25 transition-colors shadow-neon-sm"
        >
          +৳500 Test Topup
        </button>
      </div>

      {/* Large Green Gradient Wallet Card matching mockup */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1E16] via-[#091610] to-[#040907] text-white p-6 sm:p-8 shadow-neon border-2 border-[#00E676]/35">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                {language === 'bn' ? 'উপলব্ধ ব্যালেন্স' : 'Available Balance'}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                {showBalance ? <Eye className="w-4 h-4 text-[#00E676]" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সুরক্ষিত' : 'Encrypted'}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                ৳
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white drop-shadow-md">
                {showBalance ? wallet.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '••••••••'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 text-[11px] block uppercase font-bold">
                  {language === 'bn' ? 'পেন্ডিং ব্যালেন্স' : 'Pending Balance'}
                </span>
                <span className="font-black text-base sm:text-lg font-sans text-slate-200">
                  ৳ {showBalance ? wallet.pendingBalance.toLocaleString() : '••••'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block uppercase font-bold">
                  {language === 'bn' ? 'মোট অর্জিত আয়' : 'Total Earned'}
                </span>
                <span className="font-black text-base sm:text-lg font-sans text-[#00E676]">
                  ৳ {showBalance ? wallet.totalEarnings.toLocaleString() : '••••'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Withdraw & Transaction History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setCurrentScreen('withdraw')}
              className="py-3 px-5 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-neon-sm hover:shadow-neon"
            >
              <ArrowDownToLine className="w-4 h-4 stroke-[3]" />
              <span>{language === 'bn' ? 'উইথড্র করুন' : 'Withdraw'}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('transactions')}
              className="py-3 px-5 rounded-2xl bg-[#121922] hover:bg-[#182330] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 border border-[#00E676]/30 transition-all"
            >
              <Receipt className="w-4 h-4 text-[#00E676]" />
              <span>{language === 'bn' ? 'লেনদেনের বিবরণ' : 'Transaction History'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Statistics: Total Earned, Total Withdrawn, Pending */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          {language === 'bn' ? 'ওয়ালেট পরিসংখ্যান' : 'Wallet Statistics'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/25">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                {language === 'bn' ? 'মোট অর্জিত' : 'Total Earned'}
              </span>
              <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                <span className="text-amber-400 text-sm">৳</span>
                <span>{wallet.totalEarnings.toLocaleString()}</span>
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E141D] border border-amber-400/20 shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/25">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                {language === 'bn' ? 'মোট উত্তোলিত' : 'Total Withdrawn'}
              </span>
              <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                <span className="text-amber-400 text-sm">৳</span>
                <span>{wallet.totalWithdrawn.toLocaleString()}</span>
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E141D] border border-indigo-400/20 shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                {language === 'bn' ? 'পেন্ডিং ব্যালেন্স' : 'Pending Balance'}
              </span>
              <span className="text-lg font-black text-white font-sans flex items-baseline gap-1">
                <span className="text-amber-400 text-sm">৳</span>
                <span>{wallet.pendingBalance.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Card */}
      <div className="p-4 rounded-2xl bg-[#0E141D] border border-[#00E676]/20 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-[#00E676] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-bold text-white mb-0.5">
            {language === 'bn' ? 'পেমেন্ট নিশ্চয়তা ও নিয়মাবলী' : 'Payment Guarantee & Rules'}
          </p>
          <p className="text-slate-400 leading-relaxed">
            {language === 'bn'
              ? 'বিকাশ ও নগদে সর্বনিম্ন ২০০৳ হলে উইথড্র আবেদন করতে পারবেন। উইথড্র আবেদন যাচাইপূর্বক ২৪ ঘণ্টার মধ্যে সরাসরি একাউন্টে ট্রান্সফার করা হয়।'
              : 'Withdrawals are disbursed directly to verified bKash and Nagad numbers. Minimum withdrawal limit is ৳200 with standard ৳10 processing fee.'}
          </p>
        </div>
      </div>
    </div>
  );
};
