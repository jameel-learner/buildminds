import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle2,
  Download,
  Star,
  ShieldCheck,
  ArrowRight,
  Bot,
  Sparkles,
  QrCode,
  Terminal,
  Layers,
  Code2
} from 'lucide-react';
import {
  WEEKLY_EVENT,
  MENTORS,
  BRAND,
  AGENT_BUILDER_INTENSIVE,
  UPCOMING_COHORT,
  UPCOMING_SATURDAY
} from '../data/buildMindsData';
import { PageRoute } from '../types';
import confetti from 'canvas-confetti';

interface WeeklyEventPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const WeeklyEventPage: React.FC<WeeklyEventPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const passCode = `BM-SAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(passCode);
    setIsRegistered(true);

    const waMsg = `Hello Build Minds, I would like to claim my Free Saturday Pass for the Live Agentic AI Masterclass (11:00 AM – 2:00 PM IST).

Details:
• Name: ${name}
• Email: ${email}
• Role: ${role.trim() || 'Not specified'}
• Pass ID: ${passCode}`;

    const whatsappUrl = `https://wa.me/918892920286?text=${encodeURIComponent(waMsg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D98A1E', '#2B3B4E', '#FFFFFF', '#10B981'],
      });
    } catch {}
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Build Minds//Free Saturday Agent Masterclass//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Build Minds: Free Saturday Live Agentic AI Masterclass (11:00 AM - 2:00 PM IST)
DESCRIPTION:Build Your First Agent — Live. 3-Hour live masterclass covering AI-led coding with Cursor & Claude Code, tool-use, and CrewAI multi-agent swarms with Mohammed Jameel & Naveed KS.
STATUS:CONFIRMED
LOCATION:Build Minds Studio (Zoom)
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'BuildMinds-Free-Saturday-Masterclass.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const session = WEEKLY_EVENT.singleSession;

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Back to Home"
            title="Back to Home"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-[#162332] px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded-full border border-[#D98A1E]/20">
            FREE LIVE MASTERCLASS • EVERY SATURDAY
          </span>
        </div>

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#162332] border border-[#25374C] relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#D98A1E]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D98A1E]">
              <Video className="w-4 h-4" />
              <span>Free Saturday Live Masterclass (11:00 AM – 2:00 PM IST)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Build Your First Agent — Live
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Step into the engineering arena for a high-intensity 3-hour live Saturday masterclass. Master AI-led coding with Cursor & Claude Code, structured prompt engineering, and autonomous multi-agent orchestration with CrewAI & LangChain guided live by <strong>Mohammed Jameel</strong> & <strong>Naveed KS</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Calendar className="w-4 h-4 text-[#D98A1E]" />
                Every Saturday
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-4 h-4 text-[#D98A1E]" />
                11:00 AM – 2:00 PM IST (3 Hours)
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                100% Free Live Access
              </span>
            </div>
          </div>
        </div>

        {/* Two Column: Schedule & Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Saturday Single Masterclass Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Masterclass Detailed Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25374C] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                    Saturday • 11:00 AM – 2:00 PM IST
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {session.workshopName}
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-[#0B131B] border border-[#25374C] px-3 py-1 rounded">
                  Tools: <span className="text-[#D98A1E] font-bold">{session.toolsUsed}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {session.description}
              </p>

              {/* 4 Phased Milestones */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>3-Hour Session Schedule Breakdown:</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {session.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#0B131B] border border-[#25374C] space-y-1 hover:border-[#D98A1E]/40 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{phase.title}</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#D98A1E] font-semibold bg-[#162332] px-2 py-0.5 rounded">
                          {phase.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 pl-7 leading-relaxed">
                        {phase.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* High Impact Audience Topics */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Skills & Audience Takeaways:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {session.topics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D98A1E] shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="p-6 rounded-2xl bg-[#162332] border border-[#25374C] space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                Masterclass Prerequisites & Preparation
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D98A1E] shrink-0" />
                  <span>Basic familiarity with Python or programming syntax.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D98A1E]" />
                  <span>Laptop with code editor (VS Code, Cursor) and web browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D98A1E]" />
                  <span>Interactive starter GitHub repos & live sandbox keys provided at the start of the session.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: RSVP Form & Paid Program Pathway (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border-2 border-[#D98A1E]/80 shadow-2xl sticky top-28 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                  Free Saturday Workshop Pass
                </span>
                <span className="text-xs text-slate-400">
                  {WEEKLY_EVENT.seatsRemaining} Seats Open
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Claim Your Free Saturday Pass
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Join live over Zoom for the 3-hour masterclass with Mohammed Jameel & Naveed KS (11:00 AM – 2:00 PM IST).
                </p>
              </div>

              {!isRegistered ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Work / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Current Role / Focus *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Software Engineer / Founder / Student"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="claim-free-saturday-pass-btn"
                    className="w-full bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow-lg shadow-[#D98A1E]/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Claim Free Saturday Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#0B131B] border border-[#D98A1E]/60 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">Seat Confirmed!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Welcome, <strong className="text-white">{name}</strong> ({role})! Pass details dispatched to WhatsApp (+91 8892920286). Zoom links for this Saturday (11:00 AM – 2:00 PM IST) are on their way.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#162332] border border-[#25374C] font-mono text-xs text-[#D98A1E] font-bold">
                    Pass Serial: {ticketId}
                  </div>

                  <button
                    onClick={handleDownloadCalendar}
                    className="w-full bg-[#182635] hover:bg-[#22354a] text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 border border-[#25374C] cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D98A1E]" />
                    <span>Download Saturday Event (.ics)</span>
                  </button>
                </div>
              )}

              {/* Pathway to Dynamic Intensive with ₹6,000 launch pricing */}
              <div className="pt-4 border-t border-[#25374C] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">14-Day Intensive (Upcoming Cohort):</span>
                  <span className="text-emerald-400 font-bold font-mono">₹6,000 INR (Save ₹89,000)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Next batch starts <strong>{UPCOMING_COHORT.startDateFormatted}</strong>. Master production LangGraph swarms, RAG, and MCP protocols with direct mentor defenses.
                </p>
                <button
                  onClick={() => onNavigate('enrollment')}
                  className="w-full py-2.5 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan UPI QR & Enroll for ₹6,000</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
