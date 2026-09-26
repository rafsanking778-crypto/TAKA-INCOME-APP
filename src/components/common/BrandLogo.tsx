import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Visual Logo matching reference design */}
      <div
        className={`${iconSizeClasses[size]} relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#0F171E] to-[#080B0F] border-2 border-[#00E676] shadow-neon-sm flex-shrink-0 group overflow-visible`}
      >
        {/* Soft background ambient glow */}
        <div className="absolute inset-0 rounded-2xl bg-[#00E676]/10 blur-xs pointer-events-none" />

        {/* White T + Neon Green Upward Arrow */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White T Letter */}
            <path
              d="M10 11H26M18 11V31"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Neon Green Upward Diagonal Growth Arrow */}
            <path
              d="M19 25L29 13M29 13H21M29 13V21"
              stroke="#00E676"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0px 0px 4px #00E676)"
            />
          </svg>
        </div>

        {/* Small Gold Taka (৳) Coin Symbol */}
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200 flex items-center justify-center text-[9px] font-black text-slate-950 shadow-gold z-20">
          ৳
        </div>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${textClasses[size]} text-white`}>
            TAKA <span className="text-[#00E676] drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]">INCOME</span>
          </span>
          <span className="px-1.5 py-0.2 text-[9px] font-extrabold rounded-md bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30">
            APP
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-wide text-slate-400 flex items-center gap-1">
            <span>Work</span>
            <span className="text-[#00E676]">•</span>
            <span>Earn</span>
            <span className="text-[#00E676]">•</span>
            <span>Withdraw</span>
          </span>
        )}
      </div>
    </div>
  );
};
