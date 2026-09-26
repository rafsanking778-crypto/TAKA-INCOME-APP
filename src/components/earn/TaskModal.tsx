import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Play,
  FileText,
  Send,
  ExternalLink,
  BookOpen,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TaskItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface TaskModalProps {
  task: TaskItem;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { language, completeTaskDirectly, submitTaskProof, showToast } = useApp();

  // Video & Social Watch Timer State
  const initialSeconds = task.socialData?.requiredWatchSeconds || 15;
  const [videoTimer, setVideoTimer] = useState(initialSeconds);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  // Social Question State
  const [socialAnswer, setSocialAnswer] = useState<number | null>(null);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Survey State
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});

  // General Proof State
  const [proofText, setProofText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown Timer
  useEffect(() => {
    let interval: any;
    if (isVideoPlaying && videoTimer > 0) {
      interval = setInterval(() => {
        setVideoTimer((prev) => prev - 1);
      }, 1000);
    } else if (videoTimer === 0 && !videoFinished) {
      setVideoFinished(true);
      setIsVideoPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, videoTimer, videoFinished]);

  // Video / Social Completion Handler
  const handleClaimSocialOrVideo = () => {
    // If social question exists, check answer
    if (task.socialData?.question) {
      if (socialAnswer === null) {
        showToast('Please answer the content question first', 'error');
        return;
      }
      if (socialAnswer !== (task.socialData.correctIndex || 0)) {
        showToast('Incorrect answer! Please review the content', 'error');
        return;
      }
    }

    completeTaskDirectly(task);
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  // Handle Quiz Option Select
  const handleSelectQuizOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuizIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  // Handle Quiz Next / Submit
  const handleQuizNext = () => {
    if (!task.quizData) return;
    if (currentQuizIndex < task.quizData.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      let correct = 0;
      task.quizData.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct += 1;
        }
      });
      setQuizScore(correct);

      if (correct >= 2) {
        completeTaskDirectly(task);
        try {
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        } catch {}
      } else {
        showToast(
          language === 'bn'
            ? 'আপনি কমপক্ষে ২টি সঠিক উত্তর দিতে পারেননি। পুনরায় চেষ্টা করুন।'
            : 'You scored less than 2/3. Please try again later.',
          'error'
        );
      }
    }
  };

  // Handle Survey Submission
  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const summary = Object.entries(surveyAnswers)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' | ');

    submitTaskProof(task, summary || 'Survey responses submitted by verified user');
    setIsSubmitting(false);
    onClose();
  };

  // Handle General Text Proof Submission
  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofText.trim()) {
      showToast(language === 'bn' ? 'প্রমাণ বা ফিডব্যাক লিখুন' : 'Please write your task feedback', 'error');
      return;
    }
    setIsSubmitting(true);
    submitTaskProof(task, proofText);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0E141D] rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-[#00E676]/30 shadow-2xl relative max-h-[90vh] flex flex-col my-auto text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 uppercase">
              {task.category}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {task.estimatedTime}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
              {task.difficulty}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            {language === 'bn' ? task.titleBn : task.title}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-baseline gap-1 px-3 py-1 rounded-xl bg-[#00E676] text-slate-950 font-black shadow-md shadow-[#00E676]/20">
              <span className="text-xs font-bold">Reward:</span>
              <span className="text-sm font-sans">৳{task.reward}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {task.type === 'video' || task.type === 'quiz' || task.type === 'social' || task.type === 'read'
                ? 'Instant Wallet Credit'
                : 'Pending Admin Verification'}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {/* Instructions Box */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#00E676]" />
              <span>{language === 'bn' ? 'কাজের নির্দেশনা' : 'Instructions & Rules'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {task.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#00E676]/20 text-[#00E676] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Content Tasks (YouTube, TikTok, Facebook) */}
          {(task.type === 'social' || task.type === 'video') && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              {task.socialData && (
                <div className="flex items-center justify-between text-xs px-2 text-slate-400">
                  <span className="capitalize font-bold text-teal-400">Platform: {task.socialData.platform}</span>
                  <a
                    href={task.socialData.contentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#00E676] hover:underline"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="relative aspect-video rounded-xl bg-black flex flex-col items-center justify-center border border-slate-800 overflow-hidden">
                {videoFinished ? (
                  <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
                    <CheckCircle2 className="w-12 h-12 text-[#00E676] animate-bounce" />
                    <p className="text-sm font-bold text-white">
                      {language === 'bn' ? 'কন্টেন্ট দেখা সম্পন্ন হয়েছে!' : 'Content Viewing Completed!'}
                    </p>
                    <p className="text-xs text-slate-400">
                      Answer the question below or claim your reward.
                    </p>
                  </div>
                ) : isVideoPlaying ? (
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full border-4 border-[#00E676] border-t-transparent animate-spin flex items-center justify-center" />
                    <span className="text-2xl font-black font-sans text-white">{videoTimer}s</span>
                    <p className="text-xs text-slate-400">Watching required duration...</p>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-14 h-14 rounded-full bg-[#00E676] hover:bg-[#00FF87] text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                      <Play className="w-6 h-6 ml-1 fill-slate-950" />
                    </button>
                    <p className="text-xs font-semibold text-slate-300">
                      Tap to start content timer ({initialSeconds}s)
                    </p>
                  </div>
                )}

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900">
                  <div
                    style={{ width: `${((initialSeconds - videoTimer) / initialSeconds) * 100}%` }}
                    className="h-full bg-[#00E676] transition-all duration-1000 shadow-[0_0_8px_#00E676]"
                  />
                </div>
              </div>

              {/* Comprehension Question for Social Task */}
              {videoFinished && task.socialData?.question && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs">
                  <p className="font-bold text-white">{task.socialData.question}</p>
                  <div className="space-y-1.5">
                    {task.socialData.options?.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setSocialAnswer(optIdx)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                          socialAnswer === optIdx
                            ? 'bg-[#00E676]/20 text-[#00E676] border-[#00E676] font-bold'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {videoFinished && (
                <button
                  onClick={handleClaimSocialOrVideo}
                  className="w-full py-3 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_15px_#00E676]"
                >
                  CLAIM ৳{task.reward} REWARD
                </button>
              )}
            </div>
          )}

          {/* Read Article Task */}
          {task.type === 'read' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
                <h5 className="font-bold text-white text-sm">Key Principles of Everyday Financial Security</h5>
                <p>
                  1. Maintain a separate emergency reserve equal to 3 months of expenses.
                </p>
                <p>
                  2. Never disclose verification codes or MFS PINs. Automated platforms will never call asking for PIN numbers.
                </p>
                <p>
                  3. Compound micro-earnings by setting systematic savings goals.
                </p>
              </div>

              <button
                onClick={() => {
                  completeTaskDirectly(task);
                  try { confetti({ particleCount: 70 }); } catch {}
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_15px_#00E676]"
              >
                I HAVE READ & CONFIRM (CLAIM ৳{task.reward})
              </button>
            </div>
          )}

          {/* Interactive Quiz Simulator */}
          {task.type === 'quiz' && task.quizData && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              {quizScore !== null ? (
                <div className="text-center py-4 space-y-2">
                  <div
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                      quizScore >= 2 ? 'bg-[#00E676]/20 text-[#00E676]' : 'bg-rose-500/20 text-rose-500'
                    }`}
                  >
                    {quizScore >= 2 ? <Award className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {language === 'bn'
                      ? `কুইজ স্কোর: ${quizScore}/${task.quizData.length}`
                      : `Quiz Score: ${quizScore}/${task.quizData.length}`}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {quizScore >= 2
                      ? language === 'bn'
                        ? 'অভিনন্দন! আপনার ওয়ালেটে ৳৩০ যোগ হয়েছে।'
                        : 'Success! ৳30 has been credited to your balance.'
                      : language === 'bn'
                      ? 'ন্যূনতম ২টি সঠিক উত্তর আবশ্যক ছিল।'
                      : 'You needed at least 2 correct answers to claim.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold">
                      Question {currentQuizIndex + 1} of {task.quizData.length}
                    </span>
                    <span className="text-[#00E676] font-semibold">Active</span>
                  </div>

                  <p className="text-sm font-bold text-white mb-3">
                    {task.quizData[currentQuizIndex].question}
                  </p>

                  <div className="space-y-2 mb-4">
                    {task.quizData[currentQuizIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuizIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#00E676]/15 text-[#00E676] border-[#00E676] shadow-sm'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="mr-2 opacity-60">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={selectedAnswers[currentQuizIndex] === undefined}
                    onClick={handleQuizNext}
                    className="w-full py-2.5 rounded-xl bg-[#00E676] disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-md shadow-[#00E676]/20"
                  >
                    {currentQuizIndex < task.quizData.length - 1
                      ? language === 'bn'
                        ? 'পরবর্তী প্রশ্ন'
                        : 'Next Question'
                      : language === 'bn'
                      ? 'কুইজ সাবমিট করুন'
                      : 'Submit Quiz'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Survey Questions */}
          {task.type === 'survey' && task.surveyQuestions && (
            <form onSubmit={handleSurveySubmit} className="space-y-3">
              {task.surveyQuestions.map((sq, i) => (
                <div
                  key={sq.id}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs"
                >
                  <p className="font-bold text-white mb-2">
                    {i + 1}. {sq.question}
                  </p>
                  {sq.type === 'choice' && sq.options ? (
                    <div className="grid grid-cols-2 gap-2">
                      {sq.options.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setSurveyAnswers({ ...surveyAnswers, [sq.id]: opt })}
                          className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                            surveyAnswers[sq.id] === opt
                              ? 'bg-[#00E676]/15 text-[#00E676] border-[#00E676] font-bold'
                              : 'bg-slate-950 text-slate-300 border-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      rows={2}
                      value={surveyAnswers[sq.id] || ''}
                      onChange={(e) => setSurveyAnswers({ ...surveyAnswers, [sq.id]: e.target.value })}
                      placeholder="Write your feedback..."
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{language === 'bn' ? 'সার্ভে সাবমিট করুন' : 'Submit Survey for Review'}</span>
              </button>
            </form>
          )}

          {/* Action / Feedback Submission */}
          {task.type === 'action' && (
            <form onSubmit={handleProofSubmit} className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <label className="block text-xs font-bold text-white mb-1.5">
                  {language === 'bn' ? 'কাজের প্রমাণ / ফিডব্যাক লিখুন' : 'Task Proof / Feedback'}
                </label>
                <textarea
                  rows={3}
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="e.g. Completed activity, observed terms and verified completion."
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-[#00E676]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{language === 'bn' ? 'প্রমাণ সাবমিট করুন' : 'Submit Proof to Admin'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
