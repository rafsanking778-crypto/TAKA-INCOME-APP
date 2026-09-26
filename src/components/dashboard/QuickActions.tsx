import React from 'react';
import { CheckSquare, ArrowDownToLine, Users, Gift } from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

export const QuickActions: React.FC = () => {
  const { setCurrentScreen, language, currentUser } = useApp();

  const actions: {
    id: ScreenId;
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    {
      id: 'earn',
      titleEn: 'Earn Now',
      titleBn: 'আয় শুরু করুন',
      descEn: '6 active tasks',
      descBn: '৬টি নতুন কাজ',
      icon: CheckSquare,
      badge: 'Hot',
    },
    {
      id: 'withdraw',
      titleEn: 'Withdraw',
      titleBn: 'টাকা তুলুন',
      descEn: 'bKash & Nagad',
      descBn: 'বিকাশ ও নগদ',
      icon: ArrowDownToLine,
      badge: 'Instant',
    },
    {
      id: 'referral',
      titleEn: 'Referral',
      titleBn: 'রেফার করুন',
      descEn: '৳50 per invite',
      descBn: '৫০৳ প্রতি রেফার',
      icon: Users,
      badge: '৳50',
    },
    {
      id: 'daily_bonus',
      titleEn: 'Daily Bonus',
      titleBn: 'দৈনিক বোনাস',
      descEn: `Day ${currentUser.currentStreak} streak`,
      descBn: `দিন ${currentUser.currentStreak} বোনাস`,
      icon: Gift,
      badge: 'Claim',
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
          {language === 'bn' ? 'কুইক অ্যাকশন' : 'Quick Actions'}
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">Instant Shortcuts</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => setCurrentScreen(act.id)}
              className="p-3.5 rounded-2xl bg-[#0E141D] border border-[#00E676]/20 hover:border-[#00E676]/50 shadow-xs hover:shadow-neon-sm transition-all duration-200 text-left flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="p-2.5 rounded-xl bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 shadow-neon-sm group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
                {act.badge && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {act.badge}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs sm:text-sm font-black text-white leading-tight group-hover:text-[#00E676] transition-colors">
                  {language === 'bn' ? act.titleBn : act.titleEn}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {language === 'bn' ? act.descBn : act.descEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
