import React, { useState } from 'react';
import {
  User,
  Shield,
  KeyRound,
  Bell,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Edit3,
  Phone,
  Mail,
  ShieldCheck,
  FileCheck2,
  X,
  Upload,
  Image as ImageIcon,
  Film,
  FileText,
  Trash2,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    theme,
    toggleTheme,
    language,
    setLanguage,
    logout,
    setIsAdminMode,
    setCurrentScreen,
    setShowSplash,
    addUserUpload,
    deleteUserUpload,
    showToast,
  } = useApp();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Edit fields
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editEmail, setEditEmail] = useState(currentUser.email);

  // File Upload State
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState<'image' | 'video' | 'document'>('image');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('1.5 MB');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
    });
    setShowEditModal(false);
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) {
      showToast('Please enter a file name', 'error');
      return;
    }

    const defaultPreview =
      fileType === 'image'
        ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80'
        : fileType === 'video'
        ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&auto=format&fit=crop&q=80';

    addUserUpload({
      name: fileName,
      type: fileType,
      url: fileUrl || defaultPreview,
      size: fileSize,
    });

    setShowUploadModal(false);
    setFileName('');
  };

  const menuItems = [
    {
      id: 'edit_profile',
      labelEn: 'Edit Profile',
      labelBn: 'প্রোফাইল এডিট করুন',
      icon: Edit3,
      action: () => setShowEditModal(true),
    },
    {
      id: 'security',
      labelEn: 'Security & Two-Factor',
      labelBn: 'নিরাপত্তা ও ২-ফ্যাক্টর',
      icon: ShieldCheck,
      action: () => setShowSecurityModal(true),
    },
    {
      id: 'change_password',
      labelEn: 'Change Password',
      labelBn: 'পাসওয়ার্ড পরিবর্তন',
      icon: KeyRound,
      action: () => setShowPasswordModal(true),
    },
    {
      id: 'notifications',
      labelEn: 'Notification Settings',
      labelBn: 'নোটিফিকেশন সেটিংস',
      icon: Bell,
      action: () => setCurrentScreen('notifications'),
    },
    {
      id: 'theme',
      labelEn: 'Theme',
      labelBn: 'থিম পরিবর্তন',
      icon: Palette,
      value: theme === 'dark' ? 'Dark Mode' : 'Light Mode',
      action: toggleTheme,
    },
    {
      id: 'language',
      labelEn: 'Language',
      labelBn: 'ভাষা',
      icon: Globe,
      value: language === 'bn' ? 'বাংলা (BD)' : 'English',
      action: () => setLanguage(language === 'bn' ? 'en' : 'bn'),
    },
    {
      id: 'splash',
      labelEn: 'Replay Splash Screen',
      labelBn: 'স্প্ল্যাশ স্ক্রিন দেখুন',
      icon: Sparkles,
      action: () => setShowSplash(true),
    },
    {
      id: 'support',
      labelEn: 'Help & Support',
      labelBn: 'হেল্প ও নিয়মাবলী',
      icon: HelpCircle,
      action: () => setCurrentScreen('support'),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'bn' ? 'আমার প্রোফাইল' : 'My Profile'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'bn' ? 'ব্যক্তিগত তথ্য, ফাইল ভল্ট ও একাউন্ট সেটিংস' : 'Manage your verified account credentials, personal vault and preferences'}
        </p>
      </div>

      {/* User Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.3)]"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-[#00E676] text-slate-950 rounded-full font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white">
                {currentUser.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 self-center sm:self-auto">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentUser.email}</span>
            </p>

            <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentUser.phone}</span>
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-900 text-[#00E676] border border-slate-800">
                Account ID: {currentUser.accountId}
              </span>
              <span className="text-[11px] text-slate-400">
                Joined: {currentUser.joinedDate}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* User Content & Document Vault (Requested Feature #13) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#00E676]" />
              <span>{language === 'bn' ? 'ব্যক্তিগত ফাইল ও টাস্ক প্রুফ আপলোড' : 'Personal Documents & Media Vault'}</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Permitted profile images, personal ID documents, and task proof videos
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3 py-1.5 rounded-xl bg-[#00E676] text-slate-950 font-black text-xs flex items-center gap-1 shadow-[0_0_10px_#00E676] hover:bg-[#00FF87]"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {(currentUser.uploads || []).map((file) => (
            <div
              key={file.id}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-slate-950 text-slate-400">
                  {file.type === 'video' ? (
                    <Film className="w-4 h-4 text-[#00E676]" />
                  ) : file.type === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-teal-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-sky-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {file.size} • {file.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => deleteUserUpload(file.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Options List */}
      <div className="bg-[#0E141D] rounded-3xl border border-slate-800 shadow-xl divide-y divide-slate-800/80 overflow-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 group-hover:text-[#00E676] group-hover:border-[#00E676]/30 border border-slate-800 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {language === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-xs font-semibold text-[#00E676] px-2 py-0.5 rounded-lg bg-[#00E676]/10">
                    {item.value}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Admin Quick Switch & Logout */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => {
            setIsAdminMode(true);
            setCurrentScreen('admin');
          }}
          className="w-full py-3 px-4 rounded-2xl bg-[#00E676]/10 hover:bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Shield className="w-4 h-4" />
          <span>Switch to Admin Control Panel</span>
        </button>

        <button
          onClick={logout}
          className="w-full py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'bn' ? 'লগআউট করুন' : 'Logout Account'}</span>
        </button>
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 border border-[#00E676]/30 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#00E676]" />
                <span>Upload Permitted File</span>
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadFile} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. nid_verification_photo.jpg"
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">File Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                >
                  <option value="image">Image (JPG, PNG)</option>
                  <option value="video">Video (MP4 - max 20MB)</option>
                  <option value="document">Document (PDF)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">File Size</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                ✓ Permitted format check passed
                <br />
                ✓ Anti-malware scanning verified
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black shadow-md shadow-[#00E676]/20"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 border border-[#00E676]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black shadow-md shadow-[#00E676]/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 border border-[#00E676]/30 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                Security & Fraud Protection
              </h3>
              <button onClick={() => setShowSecurityModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-400">
              Hardware-backed protection, SMS withdrawal OTP validation, and anti-duplicate task prevention active.
            </p>
            <div className="p-3 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] font-medium space-y-1">
              <p>✓ Anti-Duplicate Reward Prevention: ACTIVE</p>
              <p>✓ Rate Limiting & Device Fingerprinting: ENABLED</p>
              <p>✓ Minimum Withdrawal Rule: ৳100 Enforced</p>
            </div>
            <button
              onClick={() => setShowSecurityModal(false)}
              className="w-full py-2.5 rounded-xl bg-white text-slate-950 font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E141D] rounded-3xl max-w-sm w-full p-6 border border-[#00E676]/30 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
              />
              <input
                type="password"
                placeholder="New Password (min 8 chars)"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Password updated successfully!', 'success');
                  setShowPasswordModal(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#00E676] text-slate-950 font-black"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
