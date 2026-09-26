import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Receipt,
  ArrowDownToLine,
  Settings,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Trash2,
  Search,
  ExternalLink,
  ChevronRight,
  DollarSign,
  Activity,
  FileCheck2,
  ShieldAlert,
  BarChart3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskItem, TaskCategory, TaskDifficulty } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    usersList,
    toggleUserStatus,
    withdrawals,
    approveWithdrawal,
    rejectWithdrawal,
    taskSubmissions,
    approveTaskSubmission,
    rejectTaskSubmission,
    tasks,
    addNewTask,
    deleteTask,
    settings,
    updateSettings,
    transactions,
    language,
    setIsAdminMode,
    setCurrentScreen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'users'
    | 'tasks'
    | 'submissions'
    | 'transactions'
    | 'withdrawals'
    | 'referrals'
    | 'notifications'
    | 'reports'
    | 'security_logs'
    | 'settings'
  >('overview');

  const [withdrawalFilter, setWithdrawalFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');
  const [userSearch, setUserSearch] = useState('');

  // Task creation state
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTitleBn, setNewTaskTitleBn] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskReward, setNewTaskReward] = useState('25');
  const [newTaskTime, setNewTaskTime] = useState('5 min');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('daily');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState<TaskDifficulty>('Easy');

  // System settings state
  const [minWithdrawalInput, setMinWithdrawalInput] = useState(String(settings.minWithdrawal));
  const [withdrawalFeeInput, setWithdrawalFeeInput] = useState(String(settings.withdrawalFee));
  const [referralRewardInput, setReferralRewardInput] = useState(String(settings.referralReward));

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    addNewTask({
      title: newTaskTitle,
      titleBn: newTaskTitleBn || newTaskTitle,
      description: newTaskDesc,
      descriptionBn: newTaskDesc,
      category: newTaskCategory,
      reward: parseFloat(newTaskReward) || 20,
      estimatedTime: newTaskTime,
      difficulty: newTaskDifficulty,
      type: 'action',
      iconType: 'offer',
      requirements: ['Complete instructions and submit proof'],
      instructions: ['Read instructions', 'Perform task', 'Submit feedback screenshot/text'],
      active: true,
    });

    setShowNewTaskModal(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      minWithdrawal: parseFloat(minWithdrawalInput) || 200,
      withdrawalFee: parseFloat(withdrawalFeeInput) || 10,
      referralReward: parseFloat(referralRewardInput) || 50,
    });
  };

  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'pending' || w.status === 'processing').length;
  const pendingSubmissionsCount = taskSubmissions.filter((s) => s.status === 'pending').length;

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredWithdrawals = withdrawals.filter((w) => {
    if (withdrawalFilter === 'all') return true;
    return w.status === withdrawalFilter;
  });

  const adminNav = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'submissions', label: 'Task Submissions', icon: FileCheck2, badge: pendingSubmissionsCount },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'withdrawals', label: 'Withdrawals', icon: ArrowDownToLine, badge: pendingWithdrawalsCount },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'security_logs', label: 'Security Logs', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6 pb-20 sm:pb-8 text-white">
      {/* Admin Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-[#0B0F15] border-2 border-[#00E676]/35 shadow-neon">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#00E676]/15 text-[#00E676] flex items-center justify-center font-black border border-[#00E676]/30 shadow-neon-sm">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white">Taka Income App — Admin Console</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#00E676] text-slate-950 font-black text-[10px] shadow-neon-sm">
                SuperAdmin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Black & Neon Green Management Engine • bKash/Nagad Disbursements & Anti-Fraud
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAdminMode(false);
            setCurrentScreen('home');
          }}
          className="px-4 py-2.5 rounded-xl bg-[#121922] hover:bg-[#182330] text-[#00E676] border border-[#00E676]/30 text-xs font-black transition-colors self-start sm:self-auto shadow-neon-sm"
        >
          Exit to User App
        </button>
      </div>

      {/* Admin Navigation Sidebar/Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
        {adminNav.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#0E141D] border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 5 Metric Cards matching Mockup Screenshot */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="p-4 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase">Total Users</span>
              <p className="text-2xl font-black font-sans text-white">12,580</p>
              <span className="text-[10px] font-bold text-[#00E676]">↑ +12% growth</span>
            </div>

            <div className="p-4 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase">Active Users</span>
              <p className="text-2xl font-black font-sans text-white">9,320</p>
              <span className="text-[10px] font-bold text-[#00E676]">↑ 74% retention</span>
            </div>

            <div className="p-4 rounded-3xl bg-[#0E141D] border border-[#00E676]/30 shadow-neon-sm">
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase">Total Earnings</span>
              <p className="text-2xl font-black font-sans text-[#00E676] flex items-baseline gap-0.5">
                <span className="text-amber-400 text-lg">৳</span>
                <span>245,680</span>
              </p>
              <span className="text-[10px] font-bold text-slate-400">All tasks & bonuses</span>
            </div>

            <div className="p-4 rounded-3xl bg-[#0E141D] border border-amber-400/25 shadow-gold">
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase">Total Withdrawals</span>
              <p className="text-2xl font-black font-sans text-amber-400 flex items-baseline gap-0.5">
                <span>৳</span>
                <span>120,540</span>
              </p>
              <span className="text-[10px] font-bold text-slate-400">bKash & Nagad</span>
            </div>

            <div className="p-4 rounded-3xl bg-[#0E141D] border border-rose-500/25 col-span-2 lg:col-span-1 shadow-sm">
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase">Pending Withdrawals</span>
              <p className="text-2xl font-black font-sans text-rose-400">{pendingWithdrawalsCount}</p>
              <span className="text-[10px] font-bold text-slate-400">Requires review</span>
            </div>
          </div>

          {/* Quick Action Queues */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Pending Withdrawals Quick Box */}
            <div className="p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ArrowDownToLine className="w-4 h-4 text-[#00E676]" />
                  <span>Pending Withdrawal Requests</span>
                </h3>
                <button
                  onClick={() => setActiveTab('withdrawals')}
                  className="text-xs font-black text-[#00E676] hover:underline"
                >
                  View All ({pendingWithdrawalsCount})
                </button>
              </div>

              {withdrawals.filter((w) => w.status === 'pending' || w.status === 'processing').length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No pending withdrawals in queue.</p>
              ) : (
                <div className="divide-y divide-slate-800">
                  {withdrawals
                    .filter((w) => w.status === 'pending' || w.status === 'processing')
                    .slice(0, 3)
                    .map((w) => (
                      <div key={w.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-black text-white">
                            ৳{w.amount} via {w.method.toUpperCase()}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {w.userName} • {w.accountNumber}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveWithdrawal(w.id)}
                            className="px-3 py-1 rounded-lg bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-[10px] shadow-neon-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectWithdrawal(w.id)}
                            className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px]"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Pending Tasks Review Quick Box */}
            <div className="p-5 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#00E676]" />
                  <span>Pending Task Proofs</span>
                </h3>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="text-xs font-black text-[#00E676] hover:underline"
                >
                  View All ({pendingSubmissionsCount})
                </button>
              </div>

              {taskSubmissions.filter((s) => s.status === 'pending').length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No pending submissions to verify.</p>
              ) : (
                <div className="divide-y divide-slate-800">
                  {taskSubmissions
                    .filter((s) => s.status === 'pending')
                    .slice(0, 3)
                    .map((sub) => (
                      <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-black text-white">
                            {sub.taskTitle} (৳{sub.reward})
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                            {sub.userName}: "{sub.proofData}"
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveTaskSubmission(sub.id)}
                            className="px-3 py-1 rounded-lg bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-[10px] shadow-neon-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectTaskSubmission(sub.id)}
                            className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px]"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === 'users' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-black text-white">User Accounts Directory</h3>
              <p className="text-xs text-slate-400">View user balances, status, and account suspension</p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user..."
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-800 bg-[#07090D] text-xs text-white focus:border-[#00E676]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Phone</th>
                  <th className="py-2.5">Referral Code</th>
                  <th className="py-2.5">Referrals</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#121922]">
                    <td className="py-3 flex items-center gap-2">
                      <img src={u.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-[#00E676]" />
                      <span className="font-bold text-white">{u.name}</span>
                    </td>
                    <td className="py-3 font-mono">{u.phone}</td>
                    <td className="py-3 font-mono font-bold text-[#00E676]">{u.referralCode}</td>
                    <td className="py-3 font-sans font-bold">{u.totalReferrals}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          u.status === 'active'
                            ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black ${
                          u.status === 'active'
                            ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                            : 'bg-[#00E676]/20 text-[#00E676] hover:bg-[#00E676]/30'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Restore'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white">Active Tasks Management</h3>
            <button
              onClick={() => setShowNewTaskModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-neon-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Task</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-sm text-white">{t.title}</span>
                    <span className="font-black text-[#00E676]">৳{t.reward}</span>
                  </div>
                  <p className="text-slate-400 mb-2">{t.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="uppercase font-bold text-[#00E676]">{t.category}</span>
                    <span>•</span>
                    <span>{t.estimatedTime}</span>
                    <span>•</span>
                    <span>{t.difficulty}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TASK SUBMISSIONS */}
      {activeTab === 'submissions' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
          <h3 className="text-base font-black text-white">Task Submissions Verification</h3>

          <div className="space-y-3">
            {taskSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl border border-slate-800 bg-[#07090D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-white text-sm">
                      {sub.taskTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#00E676]/15 text-[#00E676] font-bold">
                      ৳{sub.reward}
                    </span>
                    <span className="text-slate-400">by {sub.userName}</span>
                  </div>
                  <p className="text-slate-300 bg-[#0E141D] p-2.5 rounded-xl border border-slate-800 font-mono text-[11px]">
                    "{sub.proofData}"
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Submitted: {sub.submittedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  {sub.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => approveTaskSubmission(sub.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black shadow-neon-sm"
                      >
                        Approve & Pay
                      </button>
                      <button
                        onClick={() => rejectTaskSubmission(sub.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-2.5 py-1 rounded-full font-black uppercase text-[10px] ${
                        sub.status === 'completed'
                          ? 'bg-[#00E676]/15 text-[#00E676]'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      {sub.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
          <h3 className="text-base font-black text-white">All Platform Transactions Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-[#121922]">
                    <td className="py-2.5 font-mono font-bold text-slate-300">{t.id}</td>
                    <td className="py-2.5 font-bold text-white">{t.userName || 'Rafsan Ahmed'}</td>
                    <td className="py-2.5 capitalize">{t.type}</td>
                    <td className={`py-2.5 font-black font-sans ${t.amount > 0 ? 'text-[#00E676]' : 'text-slate-200'}`}>
                      {t.amount > 0 ? `+৳${t.amount}` : `-৳${Math.abs(t.amount)}`}
                    </td>
                    <td className="py-2.5 text-slate-400">{t.date}</td>
                    <td className="py-2.5 uppercase font-bold text-[10px] text-[#00E676]">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: WITHDRAWALS */}
      {activeTab === 'withdrawals' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-black text-white">
                MFS Withdrawal Disbursements (bKash & Nagad)
              </h3>
              <p className="text-xs text-slate-400">
                Approving simulates gateway payout and records reference token. Rejecting refunds user balance.
              </p>
            </div>

            <div className="flex gap-1.5 text-xs">
              {(['all', 'pending', 'completed', 'rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setWithdrawalFilter(filter)}
                  className={`px-3 py-1 rounded-xl capitalize font-black ${
                    withdrawalFilter === filter
                      ? 'bg-[#00E676] text-slate-950 shadow-neon-sm'
                      : 'bg-[#121922] text-slate-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Method</th>
                  <th className="py-2.5">Account</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredWithdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-[#121922]">
                    <td className="py-3 font-mono font-bold text-slate-300">{w.id}</td>
                    <td className="py-3 font-bold text-white">{w.userName}</td>
                    <td className="py-3 uppercase font-black text-[#00E676]">
                      {w.method}
                    </td>
                    <td className="py-3 font-mono">{w.accountNumber}</td>
                    <td className="py-3 font-black font-sans">
                      ৳{w.amount} <span className="text-[10px] text-slate-400 font-normal">(Net: ৳{w.netAmount})</span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black capitalize ${
                          w.status === 'completed'
                            ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 shadow-neon-sm'
                            : w.status === 'processing'
                            ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                            : w.status === 'pending'
                            ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {w.status === 'pending' || w.status === 'processing' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveWithdrawal(w.id)}
                            className="px-3 py-1 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black shadow-neon-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectWithdrawal(w.id)}
                            className="px-3 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {w.transactionRef || 'Settled'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS */}
      {activeTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs max-w-lg space-y-4 text-xs"
        >
          <h3 className="text-base font-black text-white">Platform Financial Settings</h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Minimum Withdrawal Limit (BDT ৳)
            </label>
            <input
              type="number"
              value={minWithdrawalInput}
              onChange={(e) => setMinWithdrawalInput(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white font-black"
            />
            <span className="text-[10px] text-slate-400">Default: ৳200</span>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              MFS Processing Fee (BDT ৳)
            </label>
            <input
              type="number"
              value={withdrawalFeeInput}
              onChange={(e) => setWithdrawalFeeInput(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white font-black"
            />
            <span className="text-[10px] text-slate-400">Default: ৳10 flat per transaction</span>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Referral Reward Amount (BDT ৳)
            </label>
            <input
              type="number"
              value={referralRewardInput}
              onChange={(e) => setReferralRewardInput(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white font-black"
            />
            <span className="text-[10px] text-slate-400">Default: ৳50 per qualified referral</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs shadow-neon"
          >
            Save Settings
          </button>
        </form>
      )}

      {/* Fallback for other tabs (reports, security logs, referrals) */}
      {(activeTab === 'reports' || activeTab === 'security_logs' || activeTab === 'referrals' || activeTab === 'notifications') && (
        <div className="p-6 rounded-3xl bg-[#0E141D] border border-slate-800 text-center text-xs space-y-2">
          <Activity className="w-8 h-8 text-[#00E676] mx-auto animate-pulse" />
          <p className="font-bold text-white capitalize">{activeTab.replace('_', ' ')} Active</p>
          <p className="text-slate-400">Zero security vulnerabilities detected. Anti-fraud filters active.</p>
        </div>
      )}

      {/* New Task Creator Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0F15] rounded-3xl max-w-md w-full p-6 border border-[#00E676]/35 shadow-neon space-y-3 text-xs text-white">
            <h3 className="text-base font-black text-white">Publish New Earning Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Title (English)</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Test Mobile Application"
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Title (Bangla)</label>
                <input
                  type="text"
                  value={newTaskTitleBn}
                  onChange={(e) => setNewTaskTitleBn(e.target.value)}
                  placeholder="e.g. মোবাইল অ্যাপ টেস্ট করুন"
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Task instructions and guidelines"
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Reward (৳)</label>
                  <input
                    type="number"
                    value={newTaskReward}
                    onChange={(e) => setNewTaskReward(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white font-black"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Estimated Time</label>
                  <input
                    type="text"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#121922] text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#121922] text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black shadow-neon-sm"
                >
                  Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
