import React, { useState } from 'react';
import { Eye, EyeOff, PlusCircle, ArrowDownToLine, ShieldCheck, Sparkles, CheckSquare, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BalanceCard: React.FC = () => {
  const { wallet, showBalance, setShowBalance, setCurrentScreen, language, depositDemoMoney, resetBalanceToZero } = useApp();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('500');

  const handleDeposit = () => {
    const num = parseFloat(depositAmount);
    if (num > 0) {
      depositDemoMoney(num);
      setShowDepositModal(false);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E141D] via-[#0E1724] to-[#0A1017] text-white p-5 sm:p-7 shadow-2xl border border-[#00E676]/30 shadow-[#00E676]/5">
        {/* Soft green ambient glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header row: Label & Eye Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
                {language === 'bn' ? 'উপলব্ধ ব্যালেন্স' : 'Available Balance'}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title={showBalance ? 'Hide balance' : 'Show balance'}
              >
                {showBalance ? <Eye className="w-4 h-4 text-[#00E676]" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetBalanceToZero}
                className="text-[10px] font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
                title="Reset balance to ৳0 (Starting Fresh Mode)"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset ৳0</span>
              </button>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E676]/10 backdrop-blur-md border border-[#00E676]/30 text-[11px] font-bold text-[#00E676]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নিরাপদ ওয়ালেট' : 'Secure Vault'}</span>
              </div>
            </div>
          </div>

          {/* Amount Display with Gold ৳ Accent */}
          <div className="mt-3 mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                ৳
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white drop-shadow-sm">
                {showBalance ? wallet.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '••••••••'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>
                {language === 'bn'
                  ? 'বিকাশ ও নগদে যেকোনো সময় সর্বনিম্ন ১০০৳ হলে ইনস্ট্যান্ট ক্যাশআউট'
                  : 'Fast disbursement via bKash & Nagad (Minimum withdrawal ৳100)'}
              </span>
            </p>
          </div>

          {/* Action Buttons: Earn Money & Withdraw (Requested exact button labels) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setCurrentScreen('earn')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,230,118,0.35)]"
            >
              <CheckSquare className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'bn' ? 'টাকা আয় করুন' : 'Earn Money'}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('withdraw')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 active:scale-98 border border-[#00E676]/40 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
            >
              <ArrowDownToLine className="w-4 h-4 text-[#00E676]" />
              <span>{language === 'bn' ? 'টাকা তুলুন' : 'Withdraw'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demo Deposit Simulator Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#00E676]/30 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2">
              {language === 'bn' ? 'ডেমো টেস্ট ব্যালেন্স যোগ করুন' : 'Simulate Balance Top-up'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {language === 'bn'
                ? 'টেস্টিং করার জন্য আপনার ওয়ালেটে যেকোনো পরিমাণ ডেমো টাকা যুক্ত করুন।'
                : 'Top up virtual test balance to experience withdrawals and task systems.'}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex gap-2">
                {['100', '200', '500', '1000'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setDepositAmount(preset)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                      depositAmount === preset
                        ? 'bg-[#00E676] text-slate-950 border-[#00E676] shadow-[0_0_10px_#00E676]'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    ৳{preset}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#F59E0B] font-bold">৳</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00E676]"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs border border-slate-800"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleDeposit}
                className="flex-1 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs shadow-md shadow-[#00E676]/30"
              >
                {language === 'bn' ? 'যোগ করুন' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
