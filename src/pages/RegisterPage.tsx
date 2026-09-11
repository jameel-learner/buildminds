import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Sparkles, Copy, Mail, ArrowRight } from 'lucide-react';
import { AGENT_BUILDER_INTENSIVE, BRAND } from '../data/buildMindsData';
import { PageRoute } from '../types';

interface RegisterPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(AGENT_BUILDER_INTENSIVE.directFormLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="register-back-to-home-btn"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-[#162332] px-4 py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span>Back to Home</span>
          </button>

          <div className="text-xs text-slate-400 font-mono">
            BUILD MINDS • ADMISSIONS PORTAL
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D98A1E]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B131B] border border-[#25374C] text-xs font-semibold text-[#D98A1E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COHORT ADMISSIONS • 16 SEP 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Application for The Agent Builder Intensive
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Complete the admissions application below for the upcoming <strong>16 Sep 2026</strong> cohort. Each application is reviewed directly by our engineering mentors, <strong>Mohammed Jameel</strong> and <strong>Naveed KS</strong>.
            </p>

            {/* Key Batch Parameters & Discount Banner */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0B131B] border border-[#25374C]">
                <div className="text-slate-400">Cohort Commences</div>
                <div className="text-white font-bold text-sm mt-0.5">16 Sep 2026</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0B131B] border border-[#25374C]">
                <div className="text-slate-400">Batch Cap</div>
                <div className="text-white font-bold text-sm mt-0.5">50 Fellows Max</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0B131B] border border-[#25374C]">
                <div className="text-slate-400">Duration</div>
                <div className="text-white font-bold text-sm mt-0.5">14 Days (6 Sprints)</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0B131B] border border-emerald-500/30">
                <div className="text-emerald-400 font-semibold">Launch Tuition</div>
                <div className="text-white font-black text-sm mt-0.5">₹6,000 INR <span className="line-through text-slate-500 font-normal text-xs">₹95k</span></div>
              </div>
            </div>

            {/* Direct Instant Enrollment Option */}
            <div className="p-4 rounded-2xl bg-[#0B131B] border border-[#D98A1E]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white">Prefer instant seat confirmation with direct UPI QR?</span>
                <p className="text-[11px] text-slate-400">Transfer ₹6,000 directly to instructor account via GPay / PhonePe / Paytm / UPI QR.</p>
              </div>
              <button
                onClick={() => onNavigate('enrollment')}
                className="bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Instant UPI Enrollment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Action Toolbar for Google Form */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={AGENT_BUILDER_INTENSIVE.directFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-[#D98A1E]/20"
              >
                <span>Open in Fullscreen Window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyLink}
                className="bg-[#0B131B] hover:bg-[#1f2f42] text-slate-300 hover:text-white border border-[#25374C] text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Copied Direct URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Copy Google Form Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReload}
                className="bg-[#0B131B] hover:bg-[#1f2f42] text-slate-300 hover:text-white border border-[#25374C] text-xs font-semibold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                title="Reload embedded form"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Form</span>
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Google Form Container */}
        <div className="rounded-3xl bg-[#162332] border border-[#25374C] p-3 sm:p-6 shadow-2xl overflow-hidden relative">
          <div className="w-full bg-white rounded-2xl overflow-hidden flex flex-col items-center min-h-[900px]">
            {/* The Google Form iframe provided by the user */}
            <iframe
              key={iframeKey}
              src={AGENT_BUILDER_INTENSIVE.googleFormUrl}
              width="100%"
              height="2800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Build Minds - 16 Sep 2026 Registration Form"
              className="w-full max-w-2xl border-0"
              onLoad={() => setIsLoading(false)}
            >
              Loading application form…
            </iframe>
          </div>

          <div className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D98A1E]" />
            <span>Secure official Google Form for Build Minds 16 Sep 2026 Batch Admissions.</span>
          </div>
        </div>

        {/* Support & Assistance Card */}
        <div className="p-6 rounded-2xl bg-[#162332] border border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D98A1E]" />
              <span>Questions about cohort admission or prerequisites?</span>
            </div>
            <div className="text-slate-400">
              Reach out directly to admissions lead Mohammed Jameel at <strong className="text-slate-200">jameel.learner@gmail.com</strong>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-bold text-[#D98A1E] hover:underline shrink-0"
          >
            ← Return to Build Minds Overview
          </button>
        </div>
      </div>
    </div>
  );
};
