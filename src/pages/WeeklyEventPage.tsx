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
  QrCode
} from 'lucide-react';
import { WEEKLY_EVENT, MENTORS, BRAND, AGENT_BUILDER_INTENSIVE } from '../data/buildMindsData';
import { PageRoute } from '../types';
import confetti from 'canvas-confetti';

interface WeeklyEventPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const WeeklyEventPage: React.FC<WeeklyEventPageProps> = ({ onNavigate }) => {
  const [activeSession, setActiveSession] = useState<'session1' | 'session2'>('session1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const passCode = `BM-WKLY-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(passCode);
    setIsRegistered(true);

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
PRODID:-//Build Minds//Free Sunday Agent Workshop//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Build Minds: Free Sunday Live Agentic AI Workshop
DESCRIPTION:Session 1 (10:00 AM-2:15 PM IST): LLMs, Prompt Engineering, Claude Code & Cursor. Lunch Break: 2:15-3:00 PM IST. Session 2 (3:00-6:00 PM IST): CrewAI Workflows & Agentic AI Usecases with Mohammed Jameel & Naveed KS.
STATUS:CONFIRMED
LOCATION:Build Minds Studio (Zoom)
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'BuildMinds-Free-Sunday-Workshop.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-[#162332] px-4 py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded-full border border-[#D98A1E]/20">
            FREE WORKSHOP • SUNDAY (2 SESSIONS)
          </span>
        </div>

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#162332] border border-[#25374C] relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#D98A1E]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D98A1E]">
              <Video className="w-4 h-4" />
              <span>Live Interactive Sunday Workshop</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Build Your First Agent — Live
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Step into the engineering arena across two intensive Sunday sessions. Explore LLMs, prompt engineering, AI-led coding with Cursor & Claude Code, and CrewAI multi-agent workflows guided live by Mohammed Jameel & Naveed KS.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Calendar className="w-4 h-4 text-[#D98A1E]" />
                Every Sunday
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-4 h-4 text-[#D98A1E]" />
                Session 1: 10:00 AM – 2:15 PM IST
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-4 h-4 text-[#D98A1E]" />
                Session 2: 3:00 PM – 6:00 PM IST
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
          {/* Left Column: Sunday 2-Session Schedule (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Session Selector Tabs */}
            <div className="flex rounded-2xl bg-[#162332] border border-[#25374C] p-1.5">
              <button
                onClick={() => setActiveSession('session1')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeSession === 'session1'
                    ? 'bg-[#D98A1E] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Session 1 — Morning (10:00 AM – 2:15 PM)</span>
              </button>

              <button
                onClick={() => setActiveSession('session2')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeSession === 'session2'
                    ? 'bg-[#D98A1E] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Session 2 — Afternoon (3:00 PM – 6:00 PM)</span>
              </button>
            </div>

            {/* Session 1 Detailed View */}
            {activeSession === 'session1' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-6 shadow-xl animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25374C] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                      Sunday Morning • 10:00 AM – 2:15 PM IST
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      {WEEKLY_EVENT.days[0].workshopName}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-slate-300 bg-[#0B131B] border border-[#25374C] px-3 py-1 rounded">
                    Tools: <span className="text-[#D98A1E] font-bold">{WEEKLY_EVENT.days[0].toolsUsed}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {WEEKLY_EVENT.days[0].description}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Topics & Concepts:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WEEKLY_EVENT.days[0].topics.map((t, idx) => (
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

                {/* Lunch Break Note */}
                <div className="p-3 rounded-2xl bg-[#0B131B] border border-[#25374C] text-center text-xs text-slate-400 font-mono">
                  🥪 Post-Session Lunch Break: 2:15 PM – 3:00 PM IST (Reconvene at 3:00 PM)
                </div>
              </div>
            )}

            {/* Session 2 Detailed View */}
            {activeSession === 'session2' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Lunch break */}
                <div className="p-3 rounded-2xl bg-[#0B131B] border border-[#25374C] text-center text-xs text-slate-400 font-mono">
                  🥪 Lunch Break: 2:15 PM – 3:00 PM IST • Afternoon Session Begins at 3:00 PM IST
                </div>

                {/* Afternoon Session */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-5 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25374C] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                        Sunday Afternoon • 3:00 PM – 6:00 PM IST
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">
                        {WEEKLY_EVENT.days[1].workshopName}
                      </h3>
                    </div>
                    <div className="text-xs font-mono text-slate-300 bg-[#0B131B] border border-[#25374C] px-3 py-1 rounded">
                      Tools: <span className="text-[#D98A1E] font-bold">{WEEKLY_EVENT.days[1].toolsUsed}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {WEEKLY_EVENT.days[1].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WEEKLY_EVENT.days[1].topics.map((t, idx) => (
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
            )}

            {/* Prerequisites */}
            <div className="p-6 rounded-2xl bg-[#162332] border border-[#25374C] space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                Workshop Prerequisites
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
                  <span>Interactive code repositories and live sandbox keys provided during sessions.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: RSVP Form & Paid Program Pathway (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border-2 border-[#D98A1E]/80 shadow-2xl sticky top-28 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                  Free Sunday Workshop Pass
                </span>
                <span className="text-xs text-slate-400">
                  {WEEKLY_EVENT.seatsRemaining} Seats Open
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Claim Your Free Sunday Pass
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Join live over Zoom for both Sunday sessions with Mohammed Jameel & Naveed KS.
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
                      Current Role / Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Software Engineer / Founder"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow-lg shadow-[#D98A1E]/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Confirm Free Sunday Pass (2 Sessions)</span>
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
                      Welcome, <strong className="text-white">{name}</strong>! Zoom links for this Sunday are on their way.
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
                    <span>Download Calendar Event (.ics)</span>
                  </button>
                </div>
              )}

              {/* Pathway to 16 Sep Intensive with ₹6,000 launch pricing */}
              <div className="pt-4 border-t border-[#25374C] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">14-Day Intensive (6 Sprints):</span>
                  <span className="text-emerald-400 font-bold font-mono">₹6,000 INR (Save ₹89,000)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Looking to master production LangGraph swarms, RAG, and MCP protocols? Lock your seat for ₹6,000 INR.
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
