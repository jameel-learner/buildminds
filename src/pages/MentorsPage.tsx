import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Mail, CheckCircle2, Calendar, Clock, Award, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { MENTORS } from '../data/buildMindsData';
import { PageRoute, Mentor } from '../types';

interface MentorsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MentorsPage: React.FC<MentorsPageProps> = ({ onNavigate }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !selectedSlot || !name || !email) return;
    setBooked(true);
  };

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
            ENGINEERING FACULTY
          </span>
        </div>

        {/* Page Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#162332] border border-[#25374C] relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#D98A1E]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D98A1E]">
              <Award className="w-4 h-4" />
              <span>Direct 1:1 Engineering Mentorship</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Meet Your Instructors & Mentors
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              At Build Minds, every live build and capstone defense is personally conducted by Mohammed Jameel and Naveed KS. Below are their full professional backgrounds, career milestones, and office hour availabilities.
            </p>
          </div>
        </div>

        {/* Mentor 1: Mohammed Jameel */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#162332] border border-[#25374C] space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#25374C] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded">
                24+ Years Engineering & Delivery Leadership
              </span>
              <h2 className="text-3xl font-black text-white">Mohammed Jameel</h2>
              <p className="text-sm font-semibold text-slate-300">
                Founding Member, Kernel VisionX Technologies | AI Native Engineer
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D98A1E]" />
                  Bengaluru, India
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D98A1E]" />
                  jameel.learner@gmail.com
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedMentor(MENTORS[0]);
                  setSelectedSlot(MENTORS[0].availableSlots[0]);
                  setBooked(false);
                }}
                className="bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md shadow-[#D98A1E]/20 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1:1 Office Hours</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D98A1E]" />
                Professional Experience
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Founding Member, Kernel VisionX Technologies, Bengaluru
                  </div>
                  <div className="text-[#D98A1E] font-mono">Nov 2019 — Present</div>
                  <p className="text-slate-400 mt-1">
                    Optimized operational strategies by analyzing performance metrics and implementing improvements. Championed CSR initiatives and built extensive industry partnerships.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Entrepreneur, HNA Values (Non IT), Bengaluru
                  </div>
                  <div className="text-[#D98A1E] font-mono">Aug 2013 — Aug 2019</div>
                  <p className="text-slate-400 mt-1">
                    Built strong brand recognition and customer loyalty. Managed financial aspects of business including budgeting, forecasting, cash flow, and financial reporting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Senior Software Engineer, IBM (GBS) & Accenture Services, Bengaluru
                  </div>
                  <div className="text-[#D98A1E] font-mono">Feb 2004 — Feb 2013</div>
                  <p className="text-slate-400 mt-1">
                    Enhanced software functionality by resolving complex technical issues, developing scalable applications using agile methodologies, and delivering enterprise client support.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Software Engineer, Genie Interactive + 2 others, Bengaluru
                  </div>
                  <div className="text-[#D98A1E] font-mono">Aug 2000 — Jan 2004</div>
                  <p className="text-slate-400 mt-1">
                    Integrated new technologies into existing enterprise systems and developed reusable components that significantly reduced development effort.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Skills */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D98A1E]" />
                  Education & Credentials
                </h3>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-[#0B131B] border border-[#25374C]">
                    <div className="font-bold text-white">BE in Computer Science</div>
                    <div className="text-slate-400">BMS College of Engineering, Bengaluru (1996 — 2000)</div>
                    <div className="text-[#D98A1E] font-medium mt-0.5">Graduated with First Class Honors</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B131B] border border-[#25374C]">
                    <div className="font-bold text-white">AI Native Engineer</div>
                    <div className="text-slate-400">Growth School / Outskill (2026)</div>
                    <div className="text-[#D98A1E] font-medium mt-0.5">Advanced projects in AI optimization techniques</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B131B] border border-[#25374C]">
                    <div className="font-bold text-white">Diploma in Advance Java</div>
                    <div className="text-slate-400">Radiant Softwares, Bengaluru (2000)</div>
                    <div className="text-[#D98A1E] font-medium mt-0.5">Achieved top 10% in class</div>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Engineering & Leadership Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'AI Native Engineer',
                    'Software Services Delivery',
                    'Agile Project Management',
                    'Product Development',
                    'API Integration',
                    'Software Support',
                    'Python, Java & C',
                    'AI Optimization'
                  ].map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#0B131B] border border-[#25374C] text-slate-200 px-3 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor 2: Naveed KS */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#162332] border border-[#25374C] space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#25374C] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded">
                22+ Years Building Quality-First Engineering Orgs
              </span>
              <h2 className="text-3xl font-black text-white">Naveed KS</h2>
              <p className="text-sm font-semibold text-slate-300">
                Engineering & QE Leader | AI / Agentic Systems Testing | Ex-Group Manager QE/Engineering at interface.ai
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D98A1E]" />
                  Bengaluru, India
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D98A1E]" />
                  naveed.ks@gmail.com
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedMentor(MENTORS[1]);
                  setSelectedSlot(MENTORS[1].availableSlots[0]);
                  setBooked(false);
                }}
                className="bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md shadow-[#D98A1E]/20 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1:1 Office Hours</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D98A1E]" />
                Professional Experience
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Group Manager, QE / Engineering | interface.ai
                  </div>
                  <div className="text-[#D98A1E] font-mono">Nov 2022 — May 2026 (Promoted twice)</div>
                  <p className="text-slate-400 mt-1">
                    Agentic Voice, Chat & Document AI for 100+ banks and credit unions. Built QE function from zero. Shifted from deterministic pass/fail to probabilistic scored evaluations of LLMs. Led teams of 10–30 spanning QA, automation, dev, and PM.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Sr. Quality Assurance Manager | Altisource Business Solutions Pvt. Ltd.
                  </div>
                  <div className="text-[#D98A1E] font-mono">Apr 2012 — Nov 2022</div>
                  <p className="text-slate-400 mt-1">
                    Real estate & mortgage-tech products: LendersOne, Equator.com, Rentrange.com. Built REST API and UI automation from scratch. Scaled platform to 95% model coverage and saved $350K+/yr across 100K+ daily transactions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-1">
                  <div className="font-bold text-white text-sm">
                    Earlier Career: Cisco Systems, Pivotal, Hewlett-Packard
                  </div>
                  <div className="text-[#D98A1E] font-mono">2003 — 2012</div>
                  <p className="text-slate-400 mt-1">
                    Software Engineer Grade VIII at Cisco Systems India (2007–2012); Senior QA Engineer at Pivotal Bangalore (2004–2007); Support Engineer at HP (2003–2004).
                  </p>
                </div>
              </div>
            </div>

            {/* Skills & AI Tooling */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D98A1E]" />
                  Education & Core Skills
                </h3>

                <div className="p-3.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs">
                  <div className="font-bold text-white">Bachelor of Engineering, Computer Science & Engineering</div>
                  <div className="text-slate-400">Bangalore University</div>
                </div>
              </div>

              {/* Technical skills from resume */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AI & Agentic Systems Mastery
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Groq (Llama 3.3)',
                    'Anthropic Claude',
                    'Gemini',
                    'Multi-Provider LLM Orchestration',
                    'Function Calling / Tool-Use',
                    'ChromaDB Vector Search',
                    'PyMuPDF Parsing',
                    'Pinecone',
                    'Probabilistic Testing',
                    'Scored LLM Evaluation',
                    'Streamlit',
                    'Python, Java, SQL'
                  ].map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#0B131B] border border-[#25374C] text-slate-200 px-3 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Page Booking Confirmation Drawer (No popup!) */}
        {selectedMentor && (
          <div className="p-8 rounded-3xl bg-[#162332] border-2 border-[#D98A1E] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#25374C] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#D98A1E] uppercase">
                  Schedule Direct 1:1 Session
                </span>
                <h3 className="text-2xl font-bold text-white">
                  30-Minute Architectural Defense with {selectedMentor.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-xs text-slate-400 hover:text-white bg-[#0B131B] px-3 py-1.5 rounded-lg border border-[#25374C]"
              >
                Close
              </button>
            </div>

            {!booked ? (
              <form onSubmit={handleBooking} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Available Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedMentor.availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                          selectedSlot === slot
                            ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                            : 'bg-[#0B131B] text-slate-300 border-[#25374C]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="anand@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D98A1E] hover:bg-[#e7992c] text-white text-sm font-bold rounded-xl transition"
                >
                  Confirm 1:1 Mentorship Session
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0B131B] border border-[#D98A1E]/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Office Hours Reserved!</h4>
                <p className="text-xs text-slate-300">
                  Confirmed with <strong className="text-white">{selectedMentor.name}</strong> for{' '}
                  <strong className="text-[#D98A1E]">{selectedSlot}</strong>. Private Google Meet invitation sent to <strong className="text-white">{email}</strong>.
                </p>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-xs font-bold text-[#D98A1E] underline"
                >
                  Return
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
