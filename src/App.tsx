import React, { useEffect, useState } from 'react';
import { AppProvider, useApp, ScreenId } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { EarnPage } from './components/earn/EarnPage';
import { WalletPage } from './components/wallet/WalletPage';
import { WithdrawPage } from './components/withdraw/WithdrawPage';
import { TransactionsPage } from './components/transactions/TransactionsPage';
import { ReferralPage } from './components/referral/ReferralPage';
import { DailyBonusPage } from './components/dailyBonus/DailyBonusPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HelpSupportModal } from './components/support/HelpSupportModal';
import { AuthModals } from './components/auth/AuthModals';
import { CheckCircle2, AlertCircle, Info, Wifi, Battery, Signal, Layers } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, isAdminMode, setIsAdminMode, deviceMode, toastMessage } = useApp();
  const [showScreenNavigator, setShowScreenNavigator] = useState(false);

  // Strictly enforce dark mode on root for black + neon green identity
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const screensList: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Home Dashboard' },
    { id: 'earn', label: 'Earn Money' },
    { id: 'wallet', label: 'My Wallet' },
    { id: 'withdraw', label: 'Withdraw Money' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'referral', label: 'Referral' },
    { id: 'daily_bonus', label: 'Daily Bonus' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'profile', label: 'My Profile' },
    { id: 'support', label: 'Help & Support' },
  ];

  const renderScreen = () => {
    if (isAdminMode) {
      return <AdminDashboard />;
    }

    switch (currentScreen) {
      case 'home':
        return <HomeDashboard />;
      case 'earn':
        return <EarnPage />;
      case 'wallet':
        return <WalletPage />;
      case 'withdraw':
        return <WithdrawPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'referral':
        return <ReferralPage />;
      case 'daily_bonus':
        return <DailyBonusPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminDashboard />;
      case 'support':
        return <HelpSupportModal />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white flex flex-col transition-colors selection:bg-[#00E676] selection:text-slate-950">
      {/* Global Header */}
      <Header />

      {/* Main Container Layout */}
      {deviceMode === 'mobile_frame' ? (
        /* Mobile Device Frame Mockup Mode (Matches Figma screenshot showcase) */
        <div className="flex-1 py-8 px-4 flex flex-col items-center justify-center bg-[#040608]">
          <div className="w-full max-w-[415px] h-[860px] bg-[#0A0E14] rounded-[52px] p-3.5 shadow-neon-lg border-4 border-[#00E676]/35 relative flex flex-col overflow-hidden">
            {/* Phone Speaker & Dynamic Island */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-end px-3 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            {/* Inner Phone Screen */}
            <div className="flex-1 rounded-[42px] bg-[#07090D] overflow-hidden flex flex-col relative text-white">
              {/* Phone Status Bar */}
              <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-300 z-40 select-none bg-[#07090D]">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-xs text-[#00E676]">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Scrollable Mobile App Body */}
              <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {renderScreen()}
              </div>

              {/* In-Frame Bottom Navigation */}
              {!isAdminMode && <BottomNav />}
            </div>
          </div>
        </div>
      ) : (
        /* Full Layout (Responsive or Desktop PC) */
        <div className="flex-1 max-w-7xl w-full mx-auto flex">
          {/* Desktop Left Sidebar (hidden on mobile in auto responsive mode) */}
          <div className={`${deviceMode === 'desktop' ? 'block' : 'hidden lg:block'}`}>
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
            {renderScreen()}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation (only shown on small screens when in responsive mode) */}
      {deviceMode === 'responsive' && !isAdminMode && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}

      {/* Quick Screen Jumper Pill Floating Action */}
      <div className="fixed bottom-20 lg:bottom-6 left-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowScreenNavigator(!showScreenNavigator)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0E141D] hover:bg-[#141C28] text-[#00E676] border border-[#00E676]/35 text-xs font-black shadow-neon-sm transition-all"
            title="Jump to any screen"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Screen Jumper</span>
          </button>

          {showScreenNavigator && (
            <div className="absolute bottom-12 left-0 w-52 p-2 rounded-2xl bg-[#0B0F15] border border-[#00E676]/35 shadow-neon text-xs space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <p className="px-2 py-1 text-[10px] font-black uppercase text-slate-400">
                Direct Screen Navigation:
              </p>
              {screensList.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    if (isAdminMode) setIsAdminMode(false);
                    setCurrentScreen(sc.id);
                    setShowScreenNavigator(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl font-bold transition-colors ${
                    !isAdminMode && currentScreen === sc.id
                      ? 'bg-[#00E676] text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white hover:bg-[#121922]'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setIsAdminMode(!isAdminMode);
                    setShowScreenNavigator(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl font-bold transition-colors ${
                    isAdminMode
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'text-amber-400 hover:bg-[#121922]'
                  }`}
                >
                  {isAdminMode ? 'Exit Admin Mode' : 'Admin Console'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Authentication Modals */}
      <AuthModals />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-neon text-xs font-black border backdrop-blur-md ${
              toastMessage.type === 'success'
                ? 'bg-[#00E676] text-slate-950 border-[#00FF87]'
                : toastMessage.type === 'error'
                ? 'bg-rose-600 text-white border-rose-500 shadow-rose-950/20'
                : 'bg-[#0E141D] text-white border-[#00E676]/30'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 stroke-[3] flex-shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 flex-shrink-0 text-[#00E676]" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
