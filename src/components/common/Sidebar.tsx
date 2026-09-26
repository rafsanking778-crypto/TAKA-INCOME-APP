import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  ArrowDownToLine,
  Receipt,
  Users,
  Gift,
  Bell,
  User,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    isAdminMode,
    setIsAdminMode,
    language,
    wallet,
    unreadCount,
    currentUser,
  } = useApp();

  const navItems: {
    id: ScreenId;
    labelEn: string;
    labelBn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'home',
      labelEn: 'Dashboard',
      labelBn: 'ড্যাশবোর্ড',
      icon: LayoutDashboard,
    },
    {
      id: 'earn',
      labelEn: 'Earn Money',
      labelBn: 'টাকা আয় করুন',
      icon: CheckSquare,
      badge: 'HOT',
      badgeColor: 'bg-[#00E676] text-slate-950 font-black',
    },
    {
      id: 'wallet',
      labelEn: 'My Wallet',
      labelBn: 'আমার ওয়ালেট',
      icon: Wallet,
    },
    {
      id: 'withdraw',
      labelEn: 'Withdraw Money',
      labelBn: 'উইথড্র করুন',
      icon: ArrowDownToLine,
      badge: 'Instant',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
    },
    {
      id: 'transactions',
      labelEn: 'Transactions',
      labelBn: 'লেনদেন হিস্ট্রি',
      icon: Receipt,
    },
    {
      id: 'referral',
      labelEn: 'Refer & Earn',
      labelBn: 'রেফার করুন',
      icon: Users,
      badge: '৳50',
      badgeColor: 'bg-indigo-500 text-white font-black',
    },
    {
      id: 'daily_bonus',
      labelEn: 'Daily Bonus',
      labelBn: 'দৈনিক বোনাস',
      icon: Gift,
      badge: `${currentUser.currentStreak}d`,
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
    },
    {
      id: 'notifications',
      labelEn: 'Notifications',
      labelBn: 'নোটিফিকেশন',
      icon: Bell,
      badge: unreadCount > 0 ? `${unreadCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'profile',
      labelEn: 'My Profile',
      labelBn: 'প্রোফাইল',
      icon: User,
    },
    {
      id: 'support',
      labelEn: 'Help & Support',
      labelBn: 'সহায়তা ও নিয়মাবলী',
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between py-5 px-3 bg-[#0B0F15] border-r border-[#00E676]/15 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !isAdminMode && currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isAdminMode) setIsAdminMode(false);
                  setCurrentScreen(item.id);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/40 shadow-neon-sm font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-[#121922] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#00E676]' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                      item.badgeColor || 'bg-[#00E676] text-slate-950 font-black'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Portal Shortcut Card */}
        <div className="p-3.5 rounded-2xl bg-[#101721] border border-amber-400/25 shadow-gold">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black text-white leading-none">Admin Workspace</p>
              <p className="text-[10px] text-slate-400">Manage tasks & payouts</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAdminMode(true);
              setCurrentScreen('admin');
            }}
            className={`w-full mt-2 py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              isAdminMode
                ? 'bg-amber-400 text-slate-950 shadow-gold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>{isAdminMode ? 'Viewing Admin' : 'Open Admin Panel'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mini Wallet Quick Card with Neon Glow */}
      <div className="pt-4 border-t border-[#00E676]/15 space-y-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0D1C15] via-[#091510] to-[#040A07] border border-[#00E676]/30 text-white shadow-neon-sm">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-1">
            <span>{language === 'bn' ? 'উপলব্ধ ব্যালেন্স' : 'Available Balance'}</span>
            <span className="w-2 h-2 rounded-full bg-[#00E676] shadow-[0_0_8px_#00E676] animate-pulse" />
          </div>
          <p className="text-2xl font-black font-sans tracking-tight text-white flex items-baseline gap-1">
            <span className="text-amber-400">৳</span>
            <span>{wallet.availableBalance.toLocaleString()}</span>
          </p>
          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>{language === 'bn' ? 'পেন্ডিং:' : 'Pending:'} ৳{wallet.pendingBalance}</span>
            <button
              onClick={() => {
                if (isAdminMode) setIsAdminMode(false);
                setCurrentScreen('withdraw');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black transition-colors shadow-neon-sm text-xs"
            >
              {language === 'bn' ? 'উইথড্র' : 'Withdraw'}
            </button>
          </div>
        </div>

        {/* Supported MFS branding */}
        <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
          <span>Supported MFS:</span>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#E2136E]">bKash</span>
            <span>•</span>
            <span className="font-extrabold text-[#F7941D]">Nagad</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
