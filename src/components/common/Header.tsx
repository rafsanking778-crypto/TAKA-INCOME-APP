import React from 'react';
import {
  Bell,
  Shield,
  Smartphone,
  Laptop,
  Maximize2,
  PlusCircle,
  AlertTriangle,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    language,
    setLanguage,
    unreadCount,
    isAdminMode,
    setIsAdminMode,
    currentUser,
    depositDemoMoney,
    deviceMode,
    setDeviceMode,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090D]/95 border-b border-[#00E676]/15 transition-colors">
      {/* Top Demo Mode Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-[11px] sm:text-xs py-1 px-3 sm:px-4 font-extrabold text-center flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 mx-auto">
          <AlertTriangle className="w-3.5 h-3.5 text-slate-950 flex-shrink-0 animate-pulse" />
          <span>
            {language === 'bn'
              ? 'ডেমো মোড — কোনো আসল টাকা লেনদেন হচ্ছে না। শুধুমাত্র টেস্টিং ও ডেমো প্রদর্শনের জন্য।'
              : 'DEMO MODE — NO REAL MONEY IS BEING TRANSFERRED. Simulation Environment.'}
          </span>
        </div>
        <button
          onClick={() => depositDemoMoney(500)}
          className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-black/25 hover:bg-black/40 text-[10px] text-white transition-all font-black"
          title="Add ৳500 demo testing balance"
        >
          <PlusCircle className="w-3 h-3 text-[#00E676]" />
          +৳500 Test
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            if (isAdminMode) setIsAdminMode(false);
            setCurrentScreen('home');
          }}
          className="cursor-pointer"
        >
          <BrandLogo size="md" />
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0E141D] p-1 rounded-xl border border-[#00E676]/20 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              deviceMode === 'responsive'
                ? 'bg-[#00E676] text-slate-950 shadow-neon-sm font-extrabold'
                : 'hover:text-white'
            }`}
            title="Auto Responsive View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Responsive</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile_frame')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              deviceMode === 'mobile_frame'
                ? 'bg-[#00E676] text-slate-950 shadow-neon-sm font-extrabold'
                : 'hover:text-white'
            }`}
            title="Mobile Device Mockup View (like Figma screenshot)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile View</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#00E676] text-slate-950 shadow-neon-sm font-extrabold'
                : 'hover:text-white'
            }`}
            title="Desktop PC Dashboard View"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>PC Dashboard</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Admin Toggle */}
          <button
            onClick={() => {
              const next = !isAdminMode;
              setIsAdminMode(next);
              if (next) setCurrentScreen('admin');
              else setCurrentScreen('home');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isAdminMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-gold'
                : 'bg-[#0E141D] hover:bg-[#141C28] text-slate-200 border-[#00E676]/20'
            }`}
            title="Toggle Admin Management Portal"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isAdminMode ? 'Admin Portal' : 'Admin'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#0E141D] hover:bg-[#141C28] text-slate-200 border border-[#00E676]/20 transition-colors flex items-center gap-1"
            title="Toggle Language (English / বাংলা)"
          >
            <Globe className="w-3.5 h-3.5 text-[#00E676]" />
            <span>{language === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentScreen('notifications');
            }}
            className="relative p-2 rounded-xl text-slate-200 bg-[#0E141D] hover:bg-[#141C28] border border-[#00E676]/20 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentScreen('profile');
            }}
            className={`flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl transition-all border ${
              currentScreen === 'profile'
                ? 'border-[#00E676] bg-[#00E676]/15 shadow-neon-sm'
                : 'border-[#00E676]/20 bg-[#0E141D] hover:bg-[#141C28]'
            }`}
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#00E676]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00E676] rounded-full border-2 border-[#07090D] shadow-[0_0_6px_#00E676]" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white truncate max-w-[85px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-extrabold text-[#00E676] flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Verified</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
