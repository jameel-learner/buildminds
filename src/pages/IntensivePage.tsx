import React, { useState } from 'react';
import {
  ArrowLeft,
  Bot,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  Terminal,
  FileText,
  QrCode,
  Sparkles,
  TrendingDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AGENT_BUILDER_INTENSIVE, COURSE_PATHS, MENTORS, SPRINT_SCHEDULE } from '../data/buildMindsData';
import { PageRoute } from '../types';
import { UpiPaymentQr } from '../components/UpiPaymentQr';

interface IntensivePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const IntensivePage: React.FC<IntensivePageProps> = ({ onNavigate }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [expandedSprint, setExpandedSprint] = useState<number | null>(1);

  const { launchPrice, industryRate, savingsAmount } = AGENT_BUILDER_INTENSIVE.tuition;

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-[#162332] px-4 py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded-full border border-[#D98A1E]/20">
            FLAGSHIP COHORT • COMMENCES 16 SEP 2026
          </span>
        </div>

        {/* Hero Banner with Launch Pricing Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#162332] border border-[#25374C] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D98A1E]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-3 py-1 rounded-md">
                {AGENT_BUILDER_INTENSIVE.badge}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Price: ₹{launchPrice.toLocaleString()} INR (Save ₹{savingsAmount.toLocaleString()})</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              The Agent Builder Intensive
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed">
              14 Days, 6 Sprints: From Foundation to Production-Grade Autonomous Multi-Agent Systems. A hands-on, rigorous engineering program designed by Mohammed Jameel & Naveed KS.
            </p>

            {/* Program Logistics Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Calendar className="w-4 h-4 text-[#D98A1E]" />
                Commences: 16 Sep 2026
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Clock className="w-4 h-4 text-[#D98A1E]" />
                14 Days (6 Sprints) + Basecamp + Hackathon
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Users className="w-4 h-4 text-[#D98A1E]" />
                Strict 50-Fellow Limit
              </span>
            </div>

            {/* Launch Pricing Value Card */}
            <div className="p-5 rounded-2xl bg-[#0B131B] border border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">Limited-Time Launch Price</div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl font-black text-white font-mono">₹{launchPrice.toLocaleString()} INR</span>
                  <span className="text-sm line-through text-slate-500 font-mono">₹{industryRate.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    93% Launch Discount
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  *Similar agentic programs from industry providers are priced at ~₹95,000.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pay via UPI QR (₹{launchPrice.toLocaleString()})</span>
                </button>

                <button
                  onClick={() => onNavigate('enrollment')}
                  className="bg-[#162332] hover:bg-[#203144] border border-[#25374C] text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Step-by-Step Enroll</span>
                  <ArrowRight className="w-4 h-4 text-[#D98A1E]" />
                </button>
              </div>
            </div>

            {/* Form CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('register')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 underline"
              >
                <FileText className="w-3.5 h-3.5 text-[#D98A1E]" />
                <span>Or apply via Google Form first</span>
              </button>
            </div>
          </div>
        </div>

        {/* UPI QR Modal if toggled */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-md w-full bg-[#162332] border border-[#25374C] rounded-3xl p-6 relative my-8 shadow-2xl">
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-[#0B131B] border border-[#25374C] flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold text-white mb-2">Direct UPI Payment</h3>
              <p className="text-xs text-slate-300 mb-4">
                Scan using Google Pay, PhonePe, Paytm or any UPI app to transfer ₹{launchPrice.toLocaleString()} to instructor account.
              </p>
              <UpiPaymentQr
                amount={launchPrice}
                onPaymentSuccess={() => {
                  setTimeout(() => {
                    setShowQrModal(false);
                    onNavigate('enrollment');
                  }, 1500);
                }}
              />
            </div>
          </div>
        )}

        {/* Official PDF Schedule: 14 Days, 6 Sprints + Basecamp + Hackathon */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black text-white">
                Official 14-Day Cohort Schedule (6 Sprints)
              </h2>
              <p className="text-xs text-slate-300">
                Detailed schedule directly from the Build Minds syllabus document.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-[#162332] px-3 py-1.5 rounded-lg border border-[#25374C]">
              Evenings 7:00 PM – 11:00 PM IST + Weekend Labs
            </span>
          </div>

          <div className="space-y-4">
            {SPRINT_SCHEDULE.map((sprint) => {
              const isExpanded = expandedSprint === sprint.sprintNumber;
              return (
                <div
                  key={sprint.sprintNumber}
                  className="p-6 rounded-3xl bg-[#162332] border border-[#25374C] space-y-4 shadow-xl transition-all"
                >
                  <div
                    onClick={() => setExpandedSprint(isExpanded ? null : sprint.sprintNumber)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-3 py-1 rounded">
                        {sprint.sprintNumber === 0
                          ? 'Prep Sprint 0'
                          : sprint.sprintNumber === 7
                          ? 'Capstone Hackathon'
                          : `Sprint ${sprint.sprintNumber}`}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{sprint.title}</h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>{sprint.time}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Topics badge summary */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sprint.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-[#0B131B] border border-[#25374C] text-[#D98A1E] px-2 py-0.5 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sprint.description}</p>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#25374C] space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Detailed Topics Covered:
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs text-slate-300 font-mono">
                        {sprint.topics}
                      </div>

                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-1">
                        Key Sprint Outcomes:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sprint.outcomes.map((outcome, oIdx) => (
                          <div
                            key={oIdx}
                            className="p-3 rounded-xl bg-[#0B131B] border border-[#25374C] flex items-start gap-2.5 text-xs text-slate-200"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D98A1E] shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENT_BUILDER_INTENSIVE.highlights.map((h, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#162332] border border-[#25374C] flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D98A1E] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-200 leading-relaxed">{h}</span>
            </div>
          ))}
        </div>

        {/* Mentors Callout */}
        <div className="p-8 rounded-3xl bg-[#162332] border border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase text-[#D98A1E] font-bold">Direct Mentorship</span>
            <h3 className="text-xl font-bold text-white mt-1">
              Mentored by Mohammed Jameel & Naveed KS
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Every participant receives direct 1:1 architectural reviews, prompt evaluation scorecards, and live capstone defenses.
            </p>
          </div>

          <button
            onClick={() => onNavigate('mentors')}
            className="shrink-0 bg-[#0B131B] hover:bg-[#182635] text-white text-xs font-bold px-5 py-3 rounded-xl border border-[#25374C] transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Mentors Profiles</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D98A1E]" />
          </button>
        </div>

        {/* Bottom Action Footer with UPI QR Callout */}
        <div className="text-center py-8 space-y-5 rounded-3xl bg-[#162332] border border-[#25374C] p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D98A1E]/10 border border-[#D98A1E]/30 text-[#D98A1E] text-xs font-mono font-bold">
            STARTING 16 SEP 2026 • STRICT 50-FELLOW BATCH
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Secure Your Seat for ₹{launchPrice.toLocaleString()} INR
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Take advantage of the limited-time launch price before rates return to the industry benchmark of ₹{industryRate.toLocaleString()}.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('enrollment')}
              className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition shadow-lg shadow-[#D98A1E]/20 flex items-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Enroll Now & Scan UPI QR (₹{launchPrice.toLocaleString()})</span>
            </button>

            <button
              onClick={() => onNavigate('register')}
              className="bg-[#0B131B] hover:bg-[#182635] border border-[#25374C] text-slate-200 hover:text-white font-bold text-sm px-6 py-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Google Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
