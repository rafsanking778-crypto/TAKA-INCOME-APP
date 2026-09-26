import React, { useState } from 'react';
import {
  Video,
  ClipboardList,
  HelpCircle,
  Gift,
  Users,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Share2,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskCategory, TaskItem } from '../../types';
import { TaskModal } from './TaskModal';

export const EarnPage: React.FC = () => {
  const { tasks, language, taskSubmissions, currentUser } = useApp();
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('all');
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);

  // Exact categories specified by user prompt
  const categories: { id: TaskCategory; labelEn: string; labelBn: string; icon: any }[] = [
    { id: 'all', labelEn: 'All', labelBn: 'সবগুলো', icon: Sparkles },
    { id: 'video', labelEn: 'Watch Video', labelBn: 'ভিডিও দেখুন', icon: Video },
    { id: 'social', labelEn: 'Social Tasks', labelBn: 'সোশ্যাল কাজ', icon: Share2 },
    { id: 'read', labelEn: 'Read Content', labelBn: 'আর্টিকেল পড়ুন', icon: BookOpen },
    { id: 'education', labelEn: 'Educational', labelBn: 'শিক্ষণীয়', icon: GraduationCap },
    { id: 'quiz', labelEn: 'Quiz', labelBn: 'কুইজ', icon: HelpCircle },
    { id: 'survey', labelEn: 'Survey', labelBn: 'সার্ভে', icon: ClipboardList },
    { id: 'daily', labelEn: 'Daily Tasks', labelBn: 'দৈনিক কাজ', icon: Flame },
    { id: 'referral', labelEn: 'Referral', labelBn: 'রেফারেল', icon: Users },
    { id: 'bonus', labelEn: 'Bonus', labelBn: 'বোনাস', icon: Gift },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const getTaskIcon = (category: string, type: string) => {
    if (category === 'social' || type === 'social') return <Share2 className="w-5 h-5 text-[#00E676]" />;
    if (category === 'video' || type === 'video') return <Video className="w-5 h-5 text-[#00E676]" />;
    if (category === 'read' || type === 'read') return <BookOpen className="w-5 h-5 text-teal-400" />;
    if (category === 'education') return <GraduationCap className="w-5 h-5 text-indigo-400" />;
    if (category === 'survey') return <ClipboardList className="w-5 h-5 text-sky-400" />;
    if (category === 'quiz') return <HelpCircle className="w-5 h-5 text-[#F59E0B]" />;
    if (category === 'referral') return <Users className="w-5 h-5 text-rose-400" />;
    return <Gift className="w-5 h-5 text-amber-400" />;
  };

  const myPendingSubmissions = taskSubmissions.filter(
    (s) => s.userId === currentUser.id && s.status === 'pending'
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'bn' ? 'টাকা আয় করুন' : 'Earn Money'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn'
              ? 'ভিডিও দেখা, সোশ্যাল কন্টেন্ট, কুইজ ও শিক্ষণীয় কাজ সম্পন্ন করে আয় করুন'
              : 'Complete verified video, social, quiz, and educational tasks to earn BDT rewards'}
          </p>
        </div>

        {myPendingSubmissions.length > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <FileCheck className="w-4 h-4 text-amber-400" />
            <span>
              {myPendingSubmissions.length} {language === 'bn' ? 'টি কাজ পর্যালোচনায় আছে' : 'submissions under review'}
            </span>
          </div>
        )}
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#00E676] text-slate-950 shadow-[0_0_15px_rgba(0,230,118,0.4)]'
                  : 'bg-[#0E141D] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Task List / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>{language === 'bn' ? 'উপলব্ধ কাজসমূহ' : 'Available Tasks'} ({filteredTasks.length})</span>
          <span className="text-[#00E676] font-mono text-[11px]">Instant & Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 sm:p-5 rounded-3xl bg-[#0E141D] border border-slate-800 hover:border-[#00E676]/40 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Top Info */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                      {getTaskIcon(task.category, task.type)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E676] transition-colors line-clamp-1">
                        {language === 'bn' ? task.titleBn : task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {task.estimatedTime}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-300">
                          {task.difficulty}
                        </span>
                        {task.socialData && (
                          <span className="px-1.5 py-0.2 rounded-md bg-slate-900 text-teal-400 border border-slate-800 text-[10px] font-bold uppercase">
                            {task.socialData.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reward Badge */}
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 block leading-none">
                      {language === 'bn' ? 'রিওয়ার্ড' : 'Reward'}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#F59E0B] font-sans drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                      ৳ {task.reward}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {language === 'bn' ? task.descriptionBn : task.description}
                </p>
              </div>

              {/* Action Button: START TASK */}
              <button
                onClick={() => setActiveTask(task)}
                className="w-full py-2.5 px-4 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] active:scale-98 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,230,118,0.25)]"
              >
                <span>START TASK</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {activeTask && <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />}
    </div>
  );
};
