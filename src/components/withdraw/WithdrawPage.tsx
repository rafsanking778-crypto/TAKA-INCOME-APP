import React, { useState } from 'react';
import {
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';

export const WithdrawPage: React.FC = () => {
  const { wallet, settings, requestWithdrawal, withdrawals, currentUser, language, setCurrentScreen } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [accountNumber, setAccountNumber] = useState(currentUser.phone || '01712345678');
  const [amount, setAmount] = useState('100');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const fee = settings.withdrawalFee;
  const netAmount = Math.max(0, numAmount - fee);
  const minLimit = settings.minWithdrawal || 100;

  const hasMinBalance = wallet.availableBalance >= minLimit;
  const isValidAmount = numAmount >= minLimit && numAmount <= wallet.availableBalance;
  const isValidPhone = accountNumber.length === 11 && accountNumber.startsWith('01');

  const myWithdrawals = withdrawals.filter((w) => w.userId === currentUser.id);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount || !isValidPhone) return;
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = () => {
    const res = requestWithdrawal(selectedMethod, accountNumber, numAmount);
    if (res.success) {
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'bn' ? 'টাকা উত্তোলন (উইথড্র)' : 'Withdraw Money'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'bn'
            ? 'সরাসরি বিকাশ বা নগদে আপনার অর্জিত টাকা ক্যাশআউট করুন (সর্বনিম্ন ১০০৳)'
            : 'Transfer earnings instantly to your personal bKash or Nagad wallet (Min ৳100)'}
        </p>
      </div>

      {/* Balance Threshold Warning Notice if below ৳100 */}
      {!hasMinBalance && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">
                {language === 'bn' ? 'উইথড্র করার পর্যাপ্ত ব্যালেন্স নেই' : 'Minimum Withdrawal is ৳100'}
              </p>
              <p className="text-[11px] text-amber-200/80">
                {language === 'bn'
                  ? `আপনার বর্তমান ব্যালেন্স ৳${wallet.availableBalance.toFixed(2)}। ১০০৳ হলেই উইথড্র করতে পারবেন।`
                  : `Your current balance is ৳${wallet.availableBalance.toFixed(2)}. Complete tasks to reach ৳100.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('earn')}
            className="px-3 py-1.5 rounded-xl bg-[#00E676] text-slate-950 font-black text-xs whitespace-nowrap shadow-sm hover:bg-[#00FF87]"
          >
            Earn Now
          </button>
        </div>
      )}

      {/* Payment Method Cards */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          {language === 'bn' ? 'পেমেন্ট মাধ্যম বেছে নিন' : 'Select Payment Method'}
        </label>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* bKash Card */}
          <button
            type="button"
            onClick={() => setSelectedMethod('bkash')}
            className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-2 relative ${
              selectedMethod === 'bkash'
                ? 'border-[#E2136E] bg-[#E2136E]/15 shadow-[0_0_20px_rgba(226,19,110,0.3)]'
                : 'border-slate-800 bg-[#0E141D] hover:border-slate-700'
            }`}
          >
            {selectedMethod === 'bkash' && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✓
              </span>
            )}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E2136E] to-[#B00E54] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              bKash
            </div>
            <div className="text-center">
              <span className="text-sm font-extrabold text-white block">bKash</span>
              <span className="text-[10px] text-slate-400">বিকাশ পার্সোনাল</span>
            </div>
          </button>

          {/* Nagad Card */}
          <button
            type="button"
            onClick={() => setSelectedMethod('nagad')}
            className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-2 relative ${
              selectedMethod === 'nagad'
                ? 'border-[#F7941D] bg-[#F7941D]/15 shadow-[0_0_20px_rgba(247,148,29,0.3)]'
                : 'border-slate-800 bg-[#0E141D] hover:border-slate-700'
            }`}
          >
            {selectedMethod === 'nagad' && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#F7941D] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✓
              </span>
            )}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F7941D] to-[#D97706] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              Nagad
            </div>
            <div className="text-center">
              <span className="text-sm font-extrabold text-white block">Nagad</span>
              <span className="text-[10px] text-slate-400">নগদ পার্সোনাল</span>
            </div>
          </button>
        </div>
      </div>

      {/* Withdrawal Form */}
      <form
        onSubmit={handleOpenConfirm}
        className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-slate-800 shadow-xl space-y-4"
      >
        {/* Mobile Number Field */}
        <div>
          <label className="block text-xs font-bold text-white mb-1.5">
            {selectedMethod.toUpperCase()} {language === 'bn' ? 'অ্যাকাউন্ট / মোবাইল নম্বর' : 'Account Number'}
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              maxLength={11}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="01XXXXXXXXX"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono font-bold text-sm tracking-wide focus:ring-2 focus:ring-[#00E676] focus:border-transparent"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {language === 'bn' ? 'সঠিক ১১ সংখ্যার পার্সোনাল নম্বর দিন' : 'Enter 11-digit personal MFS wallet number'}
          </p>
        </div>

        {/* Amount Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-white">
              {language === 'bn' ? 'উত্তোলনের পরিমাণ' : 'Withdrawal Amount'}
            </label>
            <span className="text-xs font-semibold text-[#00E676]">
              {language === 'bn' ? 'ব্যালেন্স:' : 'Available:'} ৳{wallet.availableBalance.toLocaleString()}
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-bold text-[#F59E0B] text-base">৳</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Min 100"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold text-base focus:ring-2 focus:ring-[#00E676] focus:border-transparent"
            />
          </div>

          {/* Quick Amount Chips including ৳100 min preset */}
          <div className="flex gap-2 mt-2">
            {['100', '200', '500', '1000'].map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => setAmount(chip)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  amount === chip
                    ? 'bg-[#00E676] text-slate-950 border-[#00E676] shadow-[0_0_10px_#00E676]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                ৳{chip}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount(String(Math.max(minLimit, wallet.availableBalance)))}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-[#00E676] border border-slate-700 hover:border-[#00E676]"
            >
              All
            </button>
          </div>
        </div>

        {/* Calculation Breakdown Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>{language === 'bn' ? 'উপলব্ধ ব্যালেন্স' : 'Available Balance'}</span>
            <span className="font-bold text-white">৳ {wallet.availableBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{language === 'bn' ? 'সর্বনিম্ন উইথড্র' : 'Minimum Withdrawal'}</span>
            <span className="font-bold text-[#F59E0B]">৳ {minLimit}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{language === 'bn' ? 'উইথড্রয়াল ফি' : 'Withdrawal Fee'}</span>
            <span className="font-bold text-white">৳ {fee}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
            <span>{language === 'bn' ? 'আপনি পাবেন (You Will Receive)' : 'You Will Receive'}</span>
            <span className="text-[#00E676] font-extrabold font-sans text-base">
              ৳ {netAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Large Button: REQUEST WITHDRAWAL */}
        <button
          type="submit"
          disabled={!hasMinBalance || !isValidAmount || !isValidPhone}
          className="w-full py-3.5 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] active:scale-98"
        >
          <ArrowDownToLine className="w-5 h-5 stroke-[2.5]" />
          <span>REQUEST WITHDRAWAL</span>
        </button>
      </form>

      {/* Withdrawal Status Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {language === 'bn' ? 'আপনার উইথড্র হিস্ট্রি ও স্টেটাস' : 'Your Withdrawal Requests'}
        </h3>

        {myWithdrawals.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#0E141D] border border-slate-800 text-center text-xs text-slate-400">
            No withdrawal requests yet.
          </div>
        ) : (
          <div className="space-y-2.5">
            {myWithdrawals.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-[#0E141D] border border-slate-800 shadow-md flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                      w.method === 'bkash' ? 'bg-[#E2136E]' : 'bg-[#F7941D]'
                    }`}
                  >
                    {w.method === 'bkash' ? 'bK' : 'NG'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">৳ {w.amount}</span>
                      <span className="text-xs text-slate-400">({w.method.toUpperCase()})</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {w.accountNumber} • {w.requestedAt}
                    </p>
                    {w.transactionRef && (
                      <p className="text-[10px] text-[#00E676] font-mono">
                        Ref: {w.transactionRef}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {w.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  {w.status === 'processing' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold animate-pulse">
                      <Clock className="w-3 h-3" />
                      Processing
                    </span>
                  )}
                  {w.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                  {w.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold">
                      <AlertCircle className="w-3 h-3" />
                      Rejected
                    </span>
                  )}
                  <span className="block text-[10px] text-slate-400 mt-1">
                    Net: ৳{w.netAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal (Requested exact structure) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 border border-[#00E676]/30 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <div
                className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-sm ${
                  selectedMethod === 'bkash' ? 'bg-[#E2136E]' : 'bg-[#F7941D]'
                }`}
              >
                {selectedMethod.toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-white">
                Withdrawal Summary
              </h3>
              <p className="text-xs text-slate-400">
                Please verify transaction credentials before final submission
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="font-bold text-white capitalize">{selectedMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account:</span>
                <span className="font-mono font-bold text-white">{accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="font-bold text-white">৳ {numAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee:</span>
                <span className="font-bold text-white">৳ {fee}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                <span>Final Amount:</span>
                <span className="text-[#00E676] font-extrabold font-sans text-base">
                  ৳ {netAmount}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
              <span>
                Withdrawal will enter Pending status and complete once verified by the payment system.
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold text-xs border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs shadow-[0_0_15px_#00E676]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
