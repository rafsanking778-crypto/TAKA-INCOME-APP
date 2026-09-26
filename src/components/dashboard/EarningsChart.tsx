import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EarningsChart: React.FC = () => {
  const { language } = useApp();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const dailyData = [
    { label: 'Mon', value: 120, height: '40%' },
    { label: 'Tue', value: 180, height: '60%' },
    { label: 'Wed', value: 240, height: '75%' },
    { label: 'Thu', value: 150, height: '50%' },
    { label: 'Fri', value: 310, height: '95%' },
    { label: 'Sat', value: 280, height: '85%' },
    { label: 'Sun', value: 320, height: '100%', isToday: true },
  ];

  const weeklyData = [
    { label: 'W1', value: 850, height: '55%' },
    { label: 'W2', value: 1120, height: '70%' },
    { label: 'W3', value: 1450, height: '90%' },
    { label: 'W4', value: 1600, height: '100%', isToday: true },
  ];

  const monthlyData = [
    { label: 'Jun', value: 2400, height: '45%' },
    { label: 'Jul', value: 3200, height: '60%' },
    { label: 'Aug', value: 4100, height: '80%' },
    { label: 'Sep', value: 4850, height: '95%', isToday: true },
  ];

  const currentDataset = timeframe === 'daily' ? dailyData : timeframe === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#00E676]" />
            <h3 className="text-sm sm:text-base font-black text-white">
              {language === 'bn' ? 'আয়ের পরিসংখ্যান' : 'Earnings Overview'}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {language === 'bn'
              ? 'টাস্ক, কুইজ ও বোনাস থেকে অর্জিত সাপ্তাহিক প্রবৃদ্ধি'
              : 'Verified daily reward distribution in BDT (৳)'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-[#07090D] p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeframe(tab)}
              className={`px-3 py-1 rounded-lg font-black capitalize transition-all ${
                timeframe === tab
                  ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'daily'
                ? language === 'bn'
                  ? 'দৈনিক'
                  : 'Daily'
                : tab === 'weekly'
                ? language === 'bn'
                  ? 'সাপ্তাহিক'
                  : 'Weekly'
                : language === 'bn'
                ? 'মাসিক'
                : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Bars Graphic with Neon Green Highlights */}
      <div className="pt-4 pb-2">
        <div className="h-36 sm:h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-800">
          {currentDataset.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1 text-[10px] font-black py-0.5 px-1.5 rounded-md bg-[#00E676] text-slate-950 whitespace-nowrap pointer-events-none shadow-neon-sm">
                ৳{item.value}
              </div>

              {/* Bar Column */}
              <div className="w-full max-w-[36px] bg-[#121922] rounded-t-xl h-full flex items-end p-0.5 relative overflow-hidden">
                <div
                  style={{ height: item.height }}
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    item.isToday
                      ? 'bg-gradient-to-t from-[#00E676] to-[#00FF87] shadow-[0_0_12px_rgba(0,230,118,0.5)]'
                      : 'bg-[#00E676]/30 group-hover:bg-[#00E676]/60'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-bold tracking-tight ${
                  item.isToday ? 'text-[#00E676]' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer highlight */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] inline-block shadow-[0_0_6px_#00E676]" />
            <span>{language === 'bn' ? 'আজকের শীর্ষ আয়' : 'Peak Earnings'}: <strong className="text-white">৳320</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[#00E676] font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.5% this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};
