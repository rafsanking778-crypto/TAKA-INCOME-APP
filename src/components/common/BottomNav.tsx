import React from 'react';
import { Home, CheckSquare, Wallet, ArrowDownToLine, User } from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, isAdminMode, setIsAdminMode, language } = useApp();

  const items: {
    id: ScreenId;
    labelEn: string;
    labelBn: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম', icon: Home },
    { id: 'earn', labelEn: 'Earn', labelBn: 'আয় করুন', icon: CheckSquare },
    { id: 'wallet', labelEn: 'Wallet', labelBn: 'ওয়ালেট', icon: Wallet },
    { id: 'withdraw', labelEn: 'Withdraw', labelBn: 'উইথড্র', icon: ArrowDownToLine },
    { id: 'profile', labelEn: 'Profile', labelBn: 'প্রোফাইল', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080C12]/95 backdrop-blur-xl border-t border-[#00E676]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] px-2 py-2 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = !isAdminMode && currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (isAdminMode) setIsAdminMode(false);
                setCurrentScreen(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-[#00E676] font-black scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {/* Active Neon Pip with Glow */}
              {isActive && (
                <span className="absolute -top-2 w-7 h-1 rounded-full bg-[#00E676] shadow-[0_0_8px_#00E676]" />
              )}
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">
                {language === 'bn' ? item.labelBn : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
