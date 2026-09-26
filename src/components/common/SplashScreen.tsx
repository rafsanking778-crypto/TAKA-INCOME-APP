import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setShowSplash, language } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setShowSplash(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#07090D] text-white selection:bg-[#00E676] selection:text-black">
      {/* Top Status */}
      <div className="w-full flex justify-between items-center text-xs text-slate-500 font-mono">
        <span>TAKA INCOME OS v2.4</span>
        <div className="flex items-center gap-1.5 text-[#00E676] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span>MFS SECURE NODE</span>
        </div>
      </div>

      {/* Center Hero Logo */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Glowing Logo matching requirement: Green circular/squircle outline, white T, green upward arrow, gold coin */}
        <div className="relative group">
          {/* Neon Glow halo */}
          <div className="absolute -inset-4 bg-[#00E676]/25 rounded-3xl blur-2xl animate-pulse" />

          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#0E141D] to-[#07090D] border-2 border-[#00E676] shadow-[0_0_35px_rgba(0,230,118,0.45)] flex items-center justify-center">
            {/* White T Letter */}
            <span className="text-6xl font-black text-white font-sans tracking-tighter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
              T
            </span>

            {/* Neon Green Upward Arrow */}
            <div className="absolute top-3 right-3 text-[#00E676] animate-bounce">
              <ArrowUpRight className="w-8 h-8 stroke-[3.5]" />
            </div>

            {/* Gold Taka / Coin Badge */}
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 border-2 border-[#07090D] flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_15px_rgba(245,158,11,0.6)]">
              ৳
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            TAKA <span className="text-[#00E676] drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]">INCOME</span> APP
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase">
            Work • Earn • Withdraw
          </p>
          <p className="text-xs text-slate-500 pt-1">
            “ছোট ছোট কাজ বড় বড় স্বপ্ন” — বিশ্বস্ত • নিরাপদ • দ্রুত পেমেন্ট
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full max-w-[240px] space-y-2 pt-4">
          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#00E676] to-[#00FF87] shadow-[0_0_10px_#00E676] transition-all duration-150"
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Loading MFS Vault...</span>
            <span className="text-[#00E676] font-bold">{progress}%</span>
          </div>
        </div>

        {progress >= 100 && (
          <button
            onClick={handleEnter}
            className="w-full py-3 px-6 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-sm shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all animate-in fade-in zoom-in-95 duration-200"
          >
            {language === 'bn' ? 'অ্যাপে প্রবেশ করুন' : 'Enter Application'}
          </button>
        )}
      </div>

      {/* Footer MFS Partners */}
      <div className="flex flex-col items-center gap-2 text-center text-xs text-slate-500">
        <div className="flex items-center gap-3 font-bold">
          <span className="text-[#E2136E]">bKash Verified</span>
          <span>•</span>
          <span className="text-[#F7941D]">Nagad Verified</span>
          <span>•</span>
          <span className="text-white">SSL Encrypted</span>
        </div>
        <p className="text-[10px] text-slate-600">
          Bangladeshi Micro-Earning & Automated Financial Distribution System
        </p>
      </div>
    </div>
  );
};
