import React, { useState } from 'react';
import {
  Smartphone,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const AuthModals: React.FC = () => {
  const { isLoggedIn, login, register, language } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState('01712345678');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regReferral, setRegReferral] = useState('');

  if (isLoggedIn) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginPhoneOrEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    register(regName, regPhone, regEmail, regPassword, regReferral);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0B0F15] rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#00E676]/35 shadow-neon space-y-6 my-auto text-white">
        {/* Brand Header with Glowing Logo */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="p-2 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/30 shadow-neon">
            <BrandLogo size="lg" showTagline={false} />
          </div>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? language === 'bn'
                ? 'আপনার অ্যাকাউন্টে লগইন করে আয় শুরু করুন'
                : 'Sign in to your account and start earning'
              : language === 'bn'
              ? 'নতুন অ্যাকাউন্ট খুলে সাথে সাথে ওয়েলকাম বোনাস পান'
              : 'Create an account and claim instant signup rewards'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 rounded-2xl bg-[#07090D] border border-slate-800 text-xs font-black">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'লগইন' : 'Login'}
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'রেজিস্টার' : 'Create Account'}
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5 uppercase">
                {language === 'bn' ? 'ফোন বা ইমেইল' : 'Phone or Email'}
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-[#00E676]" />
                <input
                  type="text"
                  value={loginPhoneOrEmail}
                  onChange={(e) => setLoginPhoneOrEmail(e.target.value)}
                  placeholder="01XXXXXXXXX or email@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5 uppercase">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#00E676]" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#00E676] focus:ring-[#00E676]"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset link sent to your registered mobile number.');
                }}
                className="text-[#00E676] font-bold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-neon active:scale-98"
              >
                <span>{language === 'bn' ? 'লগইন করুন' : 'Login'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={() => setMode('register')}
                className="w-full py-3 rounded-2xl bg-[#121922] hover:bg-[#182330] text-white border border-[#00E676]/30 font-bold text-xs transition-colors"
              >
                {language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Account'}
              </button>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1 uppercase">
                {language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
              </label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Rafsan Ahmed"
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 uppercase">
                {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs font-mono focus:border-[#00E676]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 uppercase">
                {language === 'bn' ? 'ইমেইল' : 'Email Address'}
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-300 mb-1 uppercase">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1 uppercase">Confirm</label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat"
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs focus:border-[#00E676]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center justify-between uppercase">
                <span>{language === 'bn' ? 'রেফারেল কোড (ঐচ্ছিক)' : 'Referral Code (Optional)'}</span>
                <span className="text-[#00E676] font-bold">+৳25 Bonus</span>
              </label>
              <input
                type="text"
                value={regReferral}
                onChange={(e) => setRegReferral(e.target.value.toUpperCase())}
                placeholder="e.g. RAFSAN123"
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white text-xs font-mono focus:border-[#00E676]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-neon active:scale-98 mt-3"
            >
              <span>{language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        )}

        {/* Demo Sandbox Fast Access */}
        <div className="pt-2 border-t border-slate-800">
          <p className="text-[11px] text-center text-slate-400 mb-2">
            1-Click Demo Sandbox Fast Sign In:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => login('01712345678', 'password')}
              className="flex-1 py-2.5 rounded-xl bg-[#121922] hover:bg-[#182330] text-[#00E676] border border-[#00E676]/30 text-xs font-black transition-colors shadow-neon-sm"
            >
              Login as User (Rafsan)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
