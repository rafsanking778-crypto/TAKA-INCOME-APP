import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Coins,
  ArrowDownToLine,
  Users,
  Megaphone,
  CheckCheck,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    clearNotifications,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'task':
        return (
          <div className="p-2.5 rounded-2xl bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'earning':
        return (
          <div className="p-2.5 rounded-2xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
            <Coins className="w-4 h-4" />
          </div>
        );
      case 'withdrawal':
        return (
          <div className="p-2.5 rounded-2xl bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <ArrowDownToLine className="w-4 h-4" />
          </div>
        );
      case 'referral':
        return (
          <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Users className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Megaphone className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn' ? 'টাস্ক, লেনদেন ও সিস্টেমের জরুরি আপডেট' : 'Real-time updates regarding your earnings, withdrawals and announcements'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E141D] text-slate-300 border border-[#00E676]/20 text-xs font-bold hover:text-white transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Mark read</span>
          </button>
          <button
            onClick={clearNotifications}
            className="p-1.5 rounded-xl bg-[#0E141D] text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'all'
              ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
              : 'bg-[#0E141D] text-slate-400 border border-slate-800'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'unread'
              ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
              : 'bg-[#0E141D] text-slate-400 border border-slate-800'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      {/* Notification Cards List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#0E141D] border border-slate-800 text-center text-xs text-slate-400">
            No notifications to display.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                item.read
                  ? 'bg-[#0E141D] border-slate-800/80 opacity-75'
                  : 'bg-[#0C151B] border-[#00E676]/35 shadow-neon-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                {getNotifIcon(item.type)}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-black text-white">
                      {language === 'bn' ? item.titleBn : item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {language === 'bn' ? item.messageBn : item.message}
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {item.time} • {item.date}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
