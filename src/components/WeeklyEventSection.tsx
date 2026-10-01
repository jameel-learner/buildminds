import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Download,
  Users,
  Video,
  Code2,
  Layers,
  Terminal,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { WEEKLY_EVENT, AGENT_BUILDER_INTENSIVE, UPCOMING_COHORT, UPCOMING_SATURDAY } from '../data/buildMindsData';
import { PageRoute } from '../types';
import confetti from 'canvas-confetti';

interface WeeklyEventSectionProps {
  onNavigate: (page: PageRoute) => void;
}

export const WeeklyEventSection: React.FC<WeeklyEventSectionProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    const randomTicket = `BM-SAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(randomTicket);
    setIsRegistered(true);

    const waMsg = `Hello Build Minds, I would like to claim my Free Saturday Pass for the Live Agentic AI Masterclass (11:00 AM – 2:00 PM IST).

Details:
• Name: ${name}
• Email: ${email}
• Role: ${role.trim() || 'Not specified'}
• Pass ID: ${randomTicket}`;

    const whatsappUrl = `https://wa.me/918892920286?text=${encodeURIComponent(waMsg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
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
DESCRIPTION:Build Your First Agent — Live. Master prompt engineering, AI-led coding with Cursor & Claude Code, tool-use, and CrewAI multi-agent workflows with Mohammed Jameel & Naveed KS.
STATUS:CONFIRMED
LOCATION:Build Minds Live Broadcast Studio (Zoom)
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
    <section id="weekly-event" className="py-20 bg-[#0E1722] border-t border-b border-[#25374C] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D98A1E]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#162332]/50 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162332] border border-[#25374C] text-xs font-semibold text-[#D98A1E] mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#D98A1E] animate-ping" />
            <span>FREE SATURDAY LIVE MASTERCLASS • 11:00 AM – 2:00 PM IST</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {WEEKLY_EVENT.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {WEEKLY_EVENT.tagline} Guided live by veteran engineering leaders <strong>Mohammed Jameel</strong> and <strong>Naveed KS</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Saturday Single Masterclass 11:00 AM – 2:00 PM Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Masterclass Overview Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] shadow-2xl space-y-6">
              {/* Header inside card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#25374C] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 border border-[#D98A1E]/20 px-2.5 py-1 rounded-md">
                      Every Saturday • 11:00 AM – 2:00 PM IST
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Single 3-Hour Intensive
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
                    {session.workshopName}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {session.description}
              </p>

              {/* Tools Stack Strip */}
              <div className="p-3.5 rounded-2xl bg-[#0B131B] border border-[#25374C] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>Hands-on Tech Stack:</span>
                </span>
                <span className="font-mono text-[#D98A1E] font-bold">
                  {session.toolsUsed}
                </span>
              </div>

              {/* 4 Phased Milestones Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>3-Hour Masterclass Agenda (11:00 AM – 2:00 PM IST):</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {session.phases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-2xl bg-[#0B131B] border border-[#25374C] hover:border-[#D98A1E]/40 transition space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {pIdx + 1}
                          </span>
                          <span>{phase.title}</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#D98A1E] font-semibold bg-[#162332] px-2 py-0.5 rounded shrink-0">
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

              {/* Key Takeaways & Audience Pullers */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>High-Impact Topics & Practical Takeaways:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {session.topics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] flex items-center gap-2 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D98A1E] shrink-0" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors Ribbon */}
              <div className="p-3.5 rounded-2xl bg-[#0B131B]/70 border border-[#25374C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-300">
                  <span className="text-slate-400">Co-Hosted Live by: </span>
                  <strong className="text-white">Mohammed Jameel</strong> (24+ yrs) & <strong className="text-white">Naveed KS</strong> (Ex-interface.ai)
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                  Live Coding Sandbox Included
                </span>
              </div>
            </div>

            {/* In-page navigation to full event details */}
            <div className="p-4 rounded-2xl bg-[#162332] border border-[#25374C] flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Looking for the full Saturday syllabus, live links, and prerequisites?
              </span>
              <button
                id="weekly-event-view-details-btn"
                onClick={() => onNavigate('weekly-event')}
                className="font-bold text-[#D98A1E] hover:text-[#f5a623] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Dedicated Saturday Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: RSVP / Pass Generator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] shadow-2xl relative space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  100% Free Live Pass
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D98A1E]" />
                  {WEEKLY_EVENT.seatsRemaining} Seats Open
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Reserve Your Free Saturday Pass
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Join the single live 3-hour masterclass over Zoom (11:00 AM – 2:00 PM IST). Direct code-along repository and mentor Q&A included.
                </p>
              </div>

              {!isRegistered ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Work / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Current Role / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Software Engineer / Tech Lead / Student"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-weekly-event-pass-btn"
                    className="w-full bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow-lg shadow-[#D98A1E]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Claim Free Saturday Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Instant WhatsApp pass delivery to 8892920286. No credit card required.</span>
                  </div>
                </form>
              ) : (
                <div className="p-5 rounded-xl bg-[#0B131B] border border-[#D98A1E]/50 space-y-4 text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">VIP Pass Confirmed!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Welcome, <strong className="text-white">{name}</strong> ({role || 'Participant'})! Details dispatched to WhatsApp (+91 8892920286). Your seat is reserved for this upcoming Saturday (11:00 AM – 2:00 PM IST).
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#162332] border border-[#25374C] font-mono text-xs text-[#D98A1E] font-bold">
                    Ticket ID: {ticketNumber}
                  </div>

                  <button
                    onClick={handleDownloadCalendar}
                    className="w-full bg-[#182635] hover:bg-[#22354a] text-slate-200 hover:text-white border border-[#25374C] font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D98A1E]" />
                    <span>Add Saturday Event to Calendar (.ics)</span>
                  </button>
                </div>
              )}

              {/* Pathway to Dynamic Agent Builder Intensive with Launch Price Callout */}
              <div className="mt-4 pt-5 border-t border-[#25374C] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Full 14-Day Intensive (Upcoming Cohort):</span>
                  <span className="text-emerald-400 font-bold font-mono">₹6,000 INR (Save ₹89,000)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Ready for 6 comprehensive engineering sprints + capstone hackathon starting {UPCOMING_COHORT.startDateFormatted}?
                </p>
                <button
                  id="weekly-event-to-intensive-btn"
                  onClick={() => onNavigate('enrollment')}
                  className="w-full py-2.5 rounded-xl bg-[#0B131B] hover:bg-[#182635] border border-[#25374C] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Enroll for ₹6,000 via UPI QR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D98A1E]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
