import React, { useState } from 'react';
import {
  MessageSquare,
  ChevronDown,
  Send,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HelpSupportModal: React.FC = () => {
  const { language, showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      qEn: 'How do I withdraw money to bKash or Nagad?',
      qBn: 'বিকাশ অথবা নগদে কীভাবে টাকা উইথড্র করব?',
      aEn: 'Navigate to the Withdraw page, select your preferred MFS provider (bKash or Nagad), enter your personal 11-digit mobile number, and enter an amount of at least ৳200. Requests are verified and processed within 24 hours.',
      aBn: 'উইথড্র পেইজে যান, বিকাশ বা নগদ নির্বাচন করুন, আপনার ১১ ডিজিটের পার্সোনাল নম্বর দিন এবং সর্বনিম্ন ২০০৳ লিখে সাবমিট করুন। যাচাই শেষে টাকা সরাসরি আপনার অ্যাকাউন্টে যাবে।',
    },
    {
      qEn: 'Why is my task in Pending status?',
      qBn: 'আমার টাস্ক পেন্ডিং অবস্থায় দেখাচ্ছে কেন?',
      aEn: 'Quizzes and video tasks are auto-credited instantly. Subjective tasks such as market research surveys and app testing reviews require quick manual validation by the admin to prevent fraudulent submissions before funds are released.',
      aBn: 'কুইজ ও ভিডিও দেখার কাজ সাথে সাথে ক্রেডিট হয়। কিন্তু সার্ভে ও অ্যাপ টেস্টিং কাজের সঠিকতা নিশ্চিত করতে অ্যাডমিন যাচাই করেন, যা সর্বোচ্চ ২-১২ ঘণ্টার মধ্যে শেষ হয়।',
    },
    {
      qEn: 'How does the 7-day Daily Streak bonus work?',
      qBn: '৭ দিনের ডেইলি স্ট্রিক কীভাবে কাজ করে?',
      aEn: 'Login once every calendar day to maintain your streak. Bonuses escalate from ৳10 on Day 1 to a mega ৳100 golden gift on Day 7. If you miss a day, the streak resets to Day 1.',
      aBn: 'প্রতিদিন একবার লগইন করে চেক-ইন বাটনে চাপুন। ১ম দিনে ১০৳ থেকে শুরু হয়ে ৭ম দিনে ১০০৳ পর্যন্ত বোনাস পাওয়া যাবে। একদিন মিস হলে পুনরায় দিন ১ থেকে শুরু হবে।',
    },
    {
      qEn: 'What are the rules for qualified referrals?',
      qBn: 'ভেরিফায়েড বা কোয়ালিফাইড রেফারেল পাওয়ার নিয়ম কী?',
      aEn: 'Your referred contact must register using your code or link and successfully complete at least 1 verified earning task. Once validated, ৳50 is automatically added to your wallet.',
      aBn: 'আপনার রেফারেল কোড দিয়ে জয়েন করা বন্ধু অন্তত ১টি কাজ সম্পূর্ণ করলে সাথে সাথে আপনার অ্যাকাউন্টে ৫০৳ বোনাস জমা হবে।',
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setTicketSubmitted(true);
    showToast(
      language === 'bn' ? 'সাপোর্ট টিকিট সফলভাবে পাঠানো হয়েছে!' : 'Support ticket submitted successfully!',
      'success'
    );
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-8 text-white">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'bn' ? 'সহায়তা ও নিয়মাবলী' : 'Help & Support'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'bn'
            ? 'সাধারণ জিজ্ঞাসা, পেমেন্ট গাইডলাইন এবং প্রোডাকশন ইন্টিগ্রেশন নির্দেশিকা'
            : 'Frequently asked questions, official rules, and production deployment documentation'}
        </p>
      </div>

      {/* Production Readiness Roadmap Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border-2 border-[#00E676]/30 shadow-neon-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <Building className="w-5 h-5 text-[#00E676]" />
          <h3 className="text-sm sm:text-base font-black text-white">
            Real Production Deployment & MFS Gateway Integration
          </h3>
        </div>

        <p className="text-xs text-slate-300">
          To transition this platform from Demo Mode to a fully live commercial earning application in Bangladesh:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-2xl bg-[#07090D] border border-slate-800">
            <span className="font-black text-[#E2136E] block mb-0.5">1. bKash B2C Payout Gateway</span>
            <p className="text-[11px] text-slate-400">
              Apply for bKash Merchant Account with Trade License, TIN, and Bank Statement. Connect to bKash B2C API for instant disbursements.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#07090D] border border-slate-800">
            <span className="font-black text-[#F7941D] block mb-0.5">2. Nagad Corporate API</span>
            <p className="text-[11px] text-slate-400">
              Register corporate wallet with Nagad Bangladesh. Use PGW or Corporate Disburse API with HMAC signature verification.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#07090D] border border-slate-800">
            <span className="font-black text-[#00E676] block mb-0.5">3. Regulatory & Anti-Fraud</span>
            <p className="text-[11px] text-slate-400">
              Implement National ID / Phone KYC, rate-limiting, Bangladesh Bank AML compliance, and strict anti-bot captcha controls.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#07090D] border border-slate-800">
            <span className="font-black text-amber-400 block mb-0.5">4. SMS OTP Verification</span>
            <p className="text-[11px] text-slate-400">
              Integrate local SMS gateways (Greenweb, Banglalink, GP) for 2-factor OTP on registration and withdrawal confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          {language === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-[#0E141D] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left font-black text-xs sm:text-sm text-white flex items-center justify-between gap-3 hover:text-[#00E676] transition-colors"
              >
                <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#00E676] transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === i && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-800 leading-relaxed">
                  {language === 'bn' ? faq.aBn : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Ticket Form */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E141D] border border-[#00E676]/20 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#00E676]" />
          <h3 className="text-base font-black text-white">
            {language === 'bn' ? 'সাপোর্টে বার্তা পাঠান' : 'Contact Support Team'}
          </h3>
        </div>

        {ticketSubmitted ? (
          <div className="p-4 rounded-2xl bg-[#07090D] border border-[#00E676]/30 text-center text-xs space-y-1 shadow-neon-sm">
            <CheckCircle2 className="w-8 h-8 text-[#00E676] mx-auto" />
            <p className="font-bold text-[#00E676]">
              {language === 'bn' ? 'আপনার টিকিট গৃহীত হয়েছে!' : 'Your support ticket has been received!'}
            </p>
            <p className="text-slate-400">
              Our Dhaka support desk will contact you via email/SMS within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {language === 'bn' ? 'বিষয়ের শিরোনাম' : 'Subject'}
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Withdrawal query or task assistance"
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#07090D] text-white focus:border-[#00E676]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {language === 'bn' ? 'সমস্যার বিস্তারিত বিবরণ' : 'Description of issue'}
              </label>
              <textarea
                rows={3}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Provide transaction ID or task title if relevant..."
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-[#07090D] text-white focus:border-[#00E676]"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#00E676] hover:bg-[#00FF87] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'টিকিট জমা দিন' : 'Submit Ticket'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
