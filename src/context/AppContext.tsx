import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  WalletState,
  TaskItem,
  Transaction,
  WithdrawalRequest,
  NotificationItem,
  TaskSubmission,
  SystemSettings,
  PaymentMethod,
  UserUploadedContent,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_WALLET,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
  INITIAL_TASK_SUBMISSIONS,
  MOCK_ADMIN_USERS,
  DAILY_BONUS_STEPS,
} from '../data/initialData';

export type ScreenId =
  | 'home'
  | 'earn'
  | 'wallet'
  | 'withdraw'
  | 'transactions'
  | 'referral'
  | 'daily_bonus'
  | 'notifications'
  | 'profile'
  | 'admin'
  | 'support';

export type DeviceMode = 'responsive' | 'mobile_frame' | 'desktop';

export type Language = 'en' | 'bn';

interface AppContextType {
  // Navigation & UI
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;

  // User & Auth
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  isLoggedIn: boolean;
  login: (phoneOrEmail: string, pass: string) => boolean;
  loginWithGoogle: () => boolean;
  register: (name: string, phone: string, email: string, pass: string, refCode?: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addUserUpload: (upload: Omit<UserUploadedContent, 'id' | 'uploadedAt'>) => void;
  deleteUserUpload: (id: string) => void;

  // Wallet & Finance
  wallet: WalletState;
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  requestWithdrawal: (method: PaymentMethod, accountNumber: string, amount: number) => { success: boolean; message: string };
  depositDemoMoney: (amount: number) => void;
  resetBalanceToZero: () => void;

  // Tasks & Earning
  tasks: TaskItem[];
  taskSubmissions: TaskSubmission[];
  selectedTask: TaskItem | null;
  setSelectedTask: (task: TaskItem | null) => void;
  completeTaskDirectly: (task: TaskItem) => void;
  submitTaskProof: (task: TaskItem, proof: string) => void;

  // Daily Bonus
  dailyRewards: typeof DAILY_BONUS_STEPS;
  hasClaimedToday: boolean;
  claimDailyBonus: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Admin Actions
  usersList: UserProfile[];
  toggleUserStatus: (userId: string) => void;
  approveWithdrawal: (withdrawalId: string, refNumber?: string) => void;
  rejectWithdrawal: (withdrawalId: string, reason?: string) => void;
  approveTaskSubmission: (submissionId: string) => void;
  rejectTaskSubmission: (submissionId: string, reason?: string) => void;
  addNewTask: (task: Omit<TaskItem, 'id'>) => void;
  deleteTask: (taskId: string) => void;

  // Settings
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;

  // Toast / Feedback
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('responsive');
  const [language, setLanguage] = useState<Language>('bn');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(false);

  // Core Data
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('taka_user_v2');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('taka_wallet_v2');
    return saved ? JSON.parse(saved) : INITIAL_WALLET;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('taka_tasks_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('taka_txns_v2');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('taka_withdrawals_v2');
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('taka_notifications_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [taskSubmissions, setTaskSubmissions] = useState<TaskSubmission[]>(() => {
    const saved = localStorage.getItem('taka_task_subs_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASK_SUBMISSIONS;
  });

  const [usersList, setUsersList] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('taka_admin_users_v2');
    return saved ? JSON.parse(saved) : MOCK_ADMIN_USERS;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('taka_settings_v2');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('taka_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('taka_wallet_v2', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('taka_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taka_txns_v2', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('taka_withdrawals_v2', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('taka_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('taka_task_subs_v2', JSON.stringify(taskSubmissions));
  }, [taskSubmissions]);

  useEffect(() => {
    localStorage.setItem('taka_admin_users_v2', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('taka_settings_v2', JSON.stringify(settings));
  }, [settings]);

  // Show Toast
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Methods
  const login = (phoneOrEmail: string) => {
    if (!phoneOrEmail) {
      showToast('Please enter your phone or email', 'error');
      return false;
    }
    setIsLoggedIn(true);
    showToast(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Logged in successfully!', 'success');
    return true;
  };

  const loginWithGoogle = () => {
    const googleUser: UserProfile = {
      id: `usr_g_${Date.now()}`,
      accountId: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
      name: 'Rafsan Ahmed',
      phone: '01712345678',
      email: 'rafsanking778@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'user',
      isVerified: true,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      referralCode: 'RAFSAN' + Math.floor(100 + Math.random() * 900),
      totalReferrals: 0,
      qualifiedReferrals: 0,
      referralEarnings: 0,
      currentStreak: 1,
      uploads: [],
    };

    setCurrentUser(googleUser);
    setIsLoggedIn(true);
    showToast(
      language === 'bn'
        ? 'গুগল দিয়ে সফলভাবে সাইন ইন হয়েছে! অ্যাকাউন্ট আইডি: ' + googleUser.accountId
        : 'Signed in with Google! Account: ' + googleUser.accountId,
      'success'
    );
    return true;
  };

  const register = (name: string, phone: string, email: string, _pass: string, refCode?: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      accountId: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
      name: name || 'New Earner',
      phone: phone || '01XXXXXXXXX',
      email: email || 'user@taka.app',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'user',
      isVerified: true,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      referralCode: (name || 'USER').toUpperCase().slice(0, 4) + Math.floor(100 + Math.random() * 900),
      referredBy: refCode,
      totalReferrals: 0,
      qualifiedReferrals: 0,
      referralEarnings: 0,
      currentStreak: 1,
      uploads: [],
    };

    // User prompt rule: starting balance ৳0
    setWallet({
      availableBalance: 0,
      pendingBalance: 0,
      totalEarnings: 0,
      totalWithdrawn: 0,
      todayEarnings: 0,
    });

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    showToast(language === 'bn' ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! শুরু ব্যালেন্স: ৳০' : 'Account created! Starting balance: ৳0', 'success');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast(language === 'bn' ? 'লগআউট করা হয়েছে' : 'Logged out', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
    showToast(language === 'bn' ? 'প্রোফাইল আপডেট হয়েছে!' : 'Profile updated!', 'success');
  };

  const addUserUpload = (upload: Omit<UserUploadedContent, 'id' | 'uploadedAt'>) => {
    const newUpload: UserUploadedContent = {
      ...upload,
      id: `up_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser((prev) => ({
      ...prev,
      uploads: [newUpload, ...(prev.uploads || [])],
    }));
    showToast('File uploaded successfully!', 'success');
  };

  const deleteUserUpload = (id: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      uploads: (prev.uploads || []).filter((u) => u.id !== id),
    }));
    showToast('File removed', 'info');
  };

  // Reset Wallet to ৳0 (Starting Fresh for testing)
  const resetBalanceToZero = () => {
    setWallet({
      availableBalance: 0,
      pendingBalance: 0,
      totalEarnings: 0,
      totalWithdrawn: 0,
      todayEarnings: 0,
    });
    showToast(
      language === 'bn' ? 'ব্যালেন্স ৳০-এ রিসেট করা হয়েছে (শুরুর মোড)' : 'Balance reset to ৳0 (Fresh Starting Mode)',
      'info'
    );
  };

  // Daily Bonus Check
  const todayStr = new Date().toISOString().split('T')[0];
  const hasClaimedToday = currentUser.lastClaimDate === todayStr;

  const claimDailyBonus = () => {
    if (hasClaimedToday) {
      showToast(language === 'bn' ? 'আজকের বোনাস আপনি ইতিমধ্যে গ্রহণ করেছেন!' : "You have already claimed today's reward!", 'info');
      return;
    }

    const nextStreak = (currentUser.currentStreak % 7) + 1;
    const rewardAmount = DAILY_BONUS_STEPS[nextStreak - 1].reward;

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E676', '#00FF87', '#F59E0B', '#E2136E', '#F7941D'],
      });
    } catch {}

    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + rewardAmount,
      totalEarnings: prev.totalEarnings + rewardAmount,
      todayEarnings: prev.todayEarnings + rewardAmount,
    }));

    setCurrentUser((prev) => ({
      ...prev,
      currentStreak: nextStreak,
      lastClaimDate: todayStr,
    }));

    const newTx: Transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'daily_bonus',
      title: `Daily Bonus (Day ${nextStreak})`,
      titleBn: `দৈনিক বোনাস (দিন ${nextStreak})`,
      amount: rewardAmount,
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      status: 'completed',
      description: `Claimed Day ${nextStreak} streak bonus`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Daily Bonus Claimed!',
      titleBn: 'দৈনিক বোনাস গ্রহণ করা হয়েছে!',
      message: `You received ৳${rewardAmount} for Day ${nextStreak} streak check-in.`,
      messageBn: `দিন ${nextStreak} চেক-ইনের জন্য আপনি ৳${rewardAmount} পেয়েছেন।`,
      type: 'earning',
      date: todayStr,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      language === 'bn'
        ? `অভিনন্দন! ৳${rewardAmount} আপনার ওয়ালেটে যোগ হয়েছে!`
        : `Congratulations! ৳${rewardAmount} added to your wallet!`,
      'success'
    );
  };

  // Withdrawals (Enforces minimum ৳100 rule)
  const requestWithdrawal = (method: PaymentMethod, accountNumber: string, amount: number) => {
    if (amount < settings.minWithdrawal) {
      const msg =
        language === 'bn'
          ? `সর্বনিম্ন উইথড্র পরিমাণ ৳${settings.minWithdrawal}`
          : `Minimum withdrawal is ৳${settings.minWithdrawal}`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    if (amount > wallet.availableBalance) {
      const msg = language === 'bn' ? 'পর্যাপ্ত ব্যালেন্স নেই!' : 'Insufficient available balance!';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    if (!accountNumber || accountNumber.length < 11) {
      const msg =
        language === 'bn' ? 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন' : 'Enter valid 11-digit mobile number';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    const fee = settings.withdrawalFee;
    const netAmount = amount - fee;
    const newWithdrawalId = `WTH-${Math.floor(1000 + Math.random() * 9000)}`;

    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      pendingBalance: prev.pendingBalance + amount,
    }));

    const newReq: WithdrawalRequest = {
      id: newWithdrawalId,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: accountNumber,
      method,
      accountNumber,
      amount,
      fee,
      netAmount,
      status: 'pending',
      requestedAt: `${todayStr} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      adminNote: 'Awaiting admin verification or automated bKash/Nagad gateway processing',
    };
    setWithdrawals((prev) => [newReq, ...prev]);

    const newTx: Transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'withdrawal',
      title: `Withdrawal (${method === 'bkash' ? 'bKash' : 'Nagad'})`,
      titleBn: `উইথড্র (${method === 'bkash' ? 'বিকাশ' : 'নগদ'})`,
      amount: -amount,
      method,
      accountNumber,
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      status: 'pending',
      description: `${method.toUpperCase()} Payout Request to ${accountNumber} (Fee: ৳${fee})`,
      referenceId: newWithdrawalId,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Withdrawal Request Submitted',
      titleBn: 'উইথড্র আবেদন গৃহীত হয়েছে',
      message: `Your withdrawal of ৳${amount} via ${method.toUpperCase()} is pending verification.`,
      messageBn: `আপনার ৳${amount} ${method === 'bkash' ? 'বিকাশ' : 'নগদ'} উইথড্র আবেদন পর্যালোচনায় রয়েছে।`,
      type: 'withdrawal',
      date: todayStr,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      language === 'bn'
        ? `উইথড্র রিকোয়েস্ট সফল হয়েছে! অ্যাডমিন পর্যালোচনায় রয়েছে।`
        : `Withdrawal submitted! Pending admin review.`,
      'success'
    );

    return { success: true, message: 'Withdrawal requested' };
  };

  const depositDemoMoney = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + amount,
      totalEarnings: prev.totalEarnings + amount,
    }));
    const newTx: Transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'deposit',
      title: 'Demo Test Top-up',
      titleBn: 'ডেমো টেস্ট টপ-আপ',
      amount: amount,
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      status: 'completed',
      description: 'Simulated balance credit for testing',
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Added ৳${amount} demo test balance`, 'success');
  };

  // Direct Task Completion (Quiz / Video / Read)
  const completeTaskDirectly = (task: TaskItem) => {
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + task.reward,
      totalEarnings: prev.totalEarnings + task.reward,
      todayEarnings: prev.todayEarnings + task.reward,
    }));

    const newTx: Transaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: task.type === 'video' || task.type === 'social' ? 'video_reward' : 'task_reward',
      title: task.title,
      titleBn: task.titleBn,
      amount: task.reward,
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      status: 'completed',
      description: `Completed task: ${task.title}`,
      referenceId: task.id,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Task Reward Credited!',
      titleBn: 'টাস্ক রিওয়ার্ড যুক্ত হয়েছে!',
      message: `You earned ৳${task.reward} for completing "${task.title}".`,
      messageBn: `"${task.titleBn}" সমাপ্ত করায় আপনার ব্যালেন্সে ৳${task.reward} যুক্ত হয়েছে।`,
      type: 'task',
      date: todayStr,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      language === 'bn'
        ? `টাস্ক সম্পন্ন! ৳${task.reward} ব্যালেন্সে যুক্ত হয়েছে!`
        : `Task completed! ৳${task.reward} added to balance!`,
      'success'
    );
  };

  // Submit Task with proof (Survey / Social Proof / App test)
  const submitTaskProof = (task: TaskItem, proof: string) => {
    const newSub: TaskSubmission = {
      id: `sub_${Date.now()}`,
      taskId: task.id,
      taskTitle: task.title,
      userId: currentUser.id,
      userName: currentUser.name,
      reward: task.reward,
      submittedAt: `${todayStr} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: 'pending',
      proofData: proof,
    };

    setTaskSubmissions((prev) => [newSub, ...prev]);

    setWallet((prev) => ({
      ...prev,
      pendingBalance: prev.pendingBalance + task.reward,
    }));

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Task Submitted for Review',
      titleBn: 'টাস্ক রিভিউয়ের জন্য জমা হয়েছে',
      message: `Your submission for "${task.title}" is under admin verification.`,
      messageBn: `"${task.titleBn}" টাস্ক অ্যাডমিন পর্যালোচনায় রয়েছে।`,
      type: 'task',
      date: todayStr,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      language === 'bn'
        ? 'টাস্ক প্রুফ জমা হয়েছে! অ্যাডমিন অ্যাপ্রুভ করলে ব্যালেন্সে যোগ হবে।'
        : 'Task proof submitted! Pending admin approval.',
      'info'
    );
  };

  // Notification methods
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast(language === 'bn' ? 'সব নোটিফিকেশন পড়া হয়েছে' : 'All notifications marked as read', 'info');
  };
  const clearNotifications = () => {
    setNotifications([]);
    showToast(language === 'bn' ? 'নোটিফিকেশন ক্লিয়ার করা হয়েছে' : 'Notifications cleared', 'info');
  };

  // Admin Actions
  const toggleUserStatus = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
    );
    showToast(`User status updated`, 'info');
  };

  const approveWithdrawal = (withdrawalId: string, refNumber = `MFS-${Math.floor(100000 + Math.random() * 900000)}`) => {
    const req = withdrawals.find((w) => w.id === withdrawalId);
    if (!req) return;

    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === withdrawalId
          ? {
              ...w,
              status: 'completed',
              processedAt: `${todayStr} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              transactionRef: refNumber,
              adminNote: `Disbursed via ${w.method.toUpperCase()} Corporate Gateway`,
            }
          : w
      )
    );

    setTransactions((prev) =>
      prev.map((t) =>
        t.referenceId === withdrawalId
          ? { ...t, status: 'completed', description: `${t.description} [Ref: ${refNumber}]` }
          : t
      )
    );

    if (req.userId === currentUser.id) {
      setWallet((prev) => ({
        ...prev,
        pendingBalance: Math.max(0, prev.pendingBalance - req.amount),
        totalWithdrawn: prev.totalWithdrawn + req.amount,
      }));

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Withdrawal Completed & Disbursed!',
        titleBn: 'উইথড্র সম্পন্ন হয়েছে!',
        message: `৳${req.netAmount} successfully sent to your ${req.method.toUpperCase()} account (${req.accountNumber}). Ref: ${refNumber}`,
        messageBn: `আপনার ${req.method === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বরে ৳${req.netAmount} সফলভাবে পাঠানো হয়েছে। রেফারেন্স: ${refNumber}`,
        type: 'withdrawal',
        date: todayStr,
        time: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(`Withdrawal #${withdrawalId} approved & disbursed!`, 'success');
  };

  const rejectWithdrawal = (withdrawalId: string, reason = 'Account details verification failed') => {
    const req = withdrawals.find((w) => w.id === withdrawalId);
    if (!req) return;

    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === withdrawalId
          ? {
              ...w,
              status: 'rejected',
              adminNote: reason,
            }
          : w
      )
    );

    setTransactions((prev) =>
      prev.map((t) => (t.referenceId === withdrawalId ? { ...t, status: 'rejected', description: `Rejected: ${reason}` } : t))
    );

    if (req.userId === currentUser.id) {
      setWallet((prev) => ({
        ...prev,
        pendingBalance: Math.max(0, prev.pendingBalance - req.amount),
        availableBalance: prev.availableBalance + req.amount,
      }));

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Withdrawal Rejected (Refunded)',
        titleBn: 'উইথড্র বাতিল (রিফান্ড প্রদান)',
        message: `Your withdrawal of ৳${req.amount} was rejected (${reason}). Balance restored.`,
        messageBn: `আপনার ৳${req.amount} উইথড্র আবেদন বাতিল হয়েছে (${reason})। টাকা ফেরত দেওয়া হয়েছে।`,
        type: 'withdrawal',
        date: todayStr,
        time: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(`Withdrawal #${withdrawalId} rejected & refunded`, 'info');
  };

  const approveTaskSubmission = (submissionId: string) => {
    const sub = taskSubmissions.find((s) => s.id === submissionId);
    if (!sub) return;

    setTaskSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'completed', reviewedAt: todayStr } : s))
    );

    if (sub.userId === currentUser.id) {
      setWallet((prev) => ({
        ...prev,
        pendingBalance: Math.max(0, prev.pendingBalance - sub.reward),
        availableBalance: prev.availableBalance + sub.reward,
        totalEarnings: prev.totalEarnings + sub.reward,
        todayEarnings: prev.todayEarnings + sub.reward,
      }));

      const newTx: Transaction = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        type: 'task_reward',
        title: `Task Verified: ${sub.taskTitle}`,
        titleBn: `টাস্ক অনুমোদিত: ${sub.taskTitle}`,
        amount: sub.reward,
        date: todayStr,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        status: 'completed',
        description: `Admin approved submission #${sub.id}`,
      };
      setTransactions((prev) => [newTx, ...prev]);

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Task Submission Approved!',
        titleBn: 'টাস্ক সাবমিশন অনুমোদিত!',
        message: `Your proof for "${sub.taskTitle}" was approved. ৳${sub.reward} moved to available balance.`,
        messageBn: `"${sub.taskTitle}" এর প্রমাণ অনুমোদিত হয়েছে। ৳${sub.reward} আপনার ব্যালেন্সে যোগ হয়েছে।`,
        type: 'earning',
        date: todayStr,
        time: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(`Task submission #${submissionId} approved!`, 'success');
  };

  const rejectTaskSubmission = (submissionId: string, reason = 'Incomplete requirements') => {
    const sub = taskSubmissions.find((s) => s.id === submissionId);
    if (!sub) return;

    setTaskSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'rejected', adminNote: reason } : s))
    );

    if (sub.userId === currentUser.id) {
      setWallet((prev) => ({
        ...prev,
        pendingBalance: Math.max(0, prev.pendingBalance - sub.reward),
      }));

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Task Submission Rejected',
        titleBn: 'টাস্ক সাবমিশন বাতিল',
        message: `Your submission for "${sub.taskTitle}" was rejected: ${reason}`,
        messageBn: `"${sub.taskTitle}" এর সাবমিশন বাতিল করা হয়েছে: ${reason}`,
        type: 'task',
        date: todayStr,
        time: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(`Task submission #${submissionId} rejected`, 'info');
  };

  const addNewTask = (newTaskData: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      ...newTaskData,
      id: `task_${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('New task added successfully!', 'success');
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task removed', 'info');
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('System settings updated', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        deviceMode,
        setDeviceMode,
        language,
        setLanguage,
        theme,
        toggleTheme,
        showBalance,
        setShowBalance,
        showSplash,
        setShowSplash,
        currentUser,
        setCurrentUser,
        isAdminMode,
        setIsAdminMode,
        isLoggedIn,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        addUserUpload,
        deleteUserUpload,
        wallet,
        transactions,
        withdrawals,
        requestWithdrawal,
        depositDemoMoney,
        resetBalanceToZero,
        tasks,
        taskSubmissions,
        selectedTask,
        setSelectedTask,
        completeTaskDirectly,
        submitTaskProof,
        dailyRewards: DAILY_BONUS_STEPS,
        hasClaimedToday,
        claimDailyBonus,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsRead,
        clearNotifications,
        usersList,
        toggleUserStatus,
        approveWithdrawal,
        rejectWithdrawal,
        approveTaskSubmission,
        rejectTaskSubmission,
        addNewTask,
        deleteTask,
        settings,
        updateSettings,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
