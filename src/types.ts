export type PaymentMethod = 'bkash' | 'nagad';

export type TransactionType = 'task_reward' | 'video_reward' | 'withdrawal' | 'referral_bonus' | 'daily_bonus' | 'deposit';

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'rejected';

export type TaskCategory =
  | 'all'
  | 'video'
  | 'read'
  | 'education'
  | 'quiz'
  | 'survey'
  | 'daily'
  | 'social'
  | 'referral'
  | 'bonus';

export type TaskDifficulty = 'Easy' | 'Medium' | 'Hard';

export type TaskSubmissionStatus = 'pending' | 'verified' | 'rejected' | 'completed';

export type SocialPlatform = 'youtube' | 'tiktok' | 'facebook' | 'web';

export interface UserUploadedContent {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'image' | 'video' | 'document';
  uploadedAt: string;
}

export interface UserProfile {
  id: string;
  accountId: string; // e.g. "TK-78421"
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  status: 'active' | 'suspended';
  joinedDate: string;
  referralCode: string;
  referredBy?: string;
  totalReferrals: number;
  qualifiedReferrals: number;
  referralEarnings: number;
  currentStreak: number;
  lastClaimDate?: string;
  uploads?: UserUploadedContent[];
}

export interface WalletState {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  todayEarnings: number;
}

export interface TaskItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: TaskCategory;
  reward: number; // in BDT (৳)
  estimatedTime: string;
  difficulty: TaskDifficulty;
  requirements: string[];
  instructions: string[];
  type: 'quiz' | 'video' | 'survey' | 'action' | 'social' | 'read';
  iconType: string;
  isDaily?: boolean;
  socialData?: {
    platform: SocialPlatform;
    contentUrl: string;
    thumbnail?: string;
    requiredWatchSeconds: number;
    question?: string;
    options?: string[];
    correctIndex?: number;
  };
  quizData?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  surveyQuestions?: {
    id: string;
    question: string;
    type: 'choice' | 'text';
    options?: string[];
  }[];
  active: boolean;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  userId: string;
  userName: string;
  reward: number;
  submittedAt: string;
  status: TaskSubmissionStatus;
  proofData?: string;
  reviewedAt?: string;
  adminNote?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName?: string;
  type: TransactionType;
  title: string;
  titleBn: string;
  amount: number;
  method?: PaymentMethod;
  accountNumber?: string;
  date: string;
  time: string;
  timestamp: number;
  status: TransactionStatus;
  description?: string;
  referenceId?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  method: PaymentMethod;
  accountNumber: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: TransactionStatus;
  requestedAt: string;
  processedAt?: string;
  transactionRef?: string;
  adminNote?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  type: 'earning' | 'task' | 'withdrawal' | 'referral' | 'system';
  date: string;
  time: string;
  read: boolean;
  link?: string;
}

export interface DailyRewardStep {
  day: number;
  reward: number;
  isMysteryBox?: boolean;
}

export interface SystemSettings {
  minWithdrawal: number;
  withdrawalFee: number;
  referralReward: number;
  dailyBonusRewards: number[];
  demoModeNotice: boolean;
  maintenanceMode: boolean;
}
