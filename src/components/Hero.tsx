import React from 'react';
import { ArrowRight, Calendar, Clock, Star, Users, ShieldCheck, FileSpreadsheet, Bot, Cpu, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';
import { WEEKLY_EVENT, AGENT_BUILDER_INTENSIVE, BRAND } from '../data/buildMindsData';
import heroBgImg from '../assets/images/outskill_hero_bg_1789149819245.jpg';

interface HeroProps {
  onNavigate: (page: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B131B] text-white">
      {/* Background Image: outskill_hero_bg_1789149819245.jpg */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={heroBgImg}
          alt="Build Minds AI Background"
          className="w-full h-full object-cover object-center opacity-45"
        />
        {/* Navy and atmospheric gradient overlays for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B131B]/70 via-[#0B131B]/80 to-[#0B131B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B131B]/90 via-[#0B131B]/40 to-[#0B131B]/85" />
        
        {/* Golden ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#D98A1E]/12 blur-[140px] rounded-full" />
        <div className="absolute -top-10 left-10 w-96 h-96 bg-[#25374C]/35 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#162332]/50 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        {/* Top Tagline Badge */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162332]/90 border border-[#25374C] backdrop-blur-md text-xs sm:text-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#D98A1E] animate-ping" />
          <span className="font-bold text-[#D98A1E] uppercase tracking-wider">{BRAND.tagline}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Upcoming Intensive: 21 Sep 2026</span>
          <button
            id="hero-banner-register-btn"
            onClick={() => onNavigate('register')}
            className="text-white hover:text-[#D98A1E] font-medium inline-flex items-center gap-1 ml-1 cursor-pointer transition"
          >
            Apply Now <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Hero Title with Build Minds Theme */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Architect Real AI Agents.
            <span className="block text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#D98A1E] mt-3 sm:mt-4 tracking-tight">
              Train Minds. Build Products.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed mb-10">
            Learn directly from veteran engineering leaders who built interface.ai's agentic testing for 100+ enterprise banks and delivered mission-critical software for over 24 years.
          </p>

          {/* Call to Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
            {/* Primary Action Button - Build Your First Agent — Live (Weekly Event) */}
            <button
              id="hero-weekly-event-btn"
              onClick={() => onNavigate('weekly-event')}
              className="inline-flex items-center justify-center gap-2 bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl transition duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#D98A1E]/25 cursor-pointer"
            >
              <span>Build Your First Agent — Live</span>
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </button>

            {/* Weekly Event Schedule Details */}
            <div className="flex items-center gap-6 text-slate-300 border-l border-[#25374C] pl-4 sm:pl-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#D98A1E]" />
                  Weekly Event
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  Every Sunday
                </div>
              </div>

              <div className="h-8 w-px bg-[#25374C]" />

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#D98A1E]" />
                  2 Live Sessions
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  10 AM & 3 PM IST
                </div>
              </div>
            </div>
          </div>

          {/* The Agent Builder Intensive (21 Sep 2026) Callout Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#162332]/90 border border-[#25374C] backdrop-blur-md max-w-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#D98A1E]/15 border border-[#D98A1E]/30 text-[#D98A1E]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>The Agent Builder Intensive</span>
                  <span className="text-[10px] bg-[#D98A1E]/20 text-[#D98A1E] border border-[#D98A1E]/40 px-2 py-0.5 rounded-full font-semibold">
                    21 Sep 2026 Batch
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    Launch Price: ₹6,000 INR
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  14 Days (6 Sprints) • Industry Benchmark: <span className="line-through">₹95,000</span> (Save ₹89,000)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="hero-enroll-upi-btn"
                onClick={() => onNavigate('enrollment')}
                className="w-full sm:w-auto shrink-0 bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <span>Pay ₹6,000</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                id="hero-register-intensive-btn"
                onClick={() => onNavigate('register')}
                className="w-full sm:w-auto shrink-0 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white border border-[#25374C] font-semibold text-xs px-3 py-2.5 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Form</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-10 border-t border-[#25374C]/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              24+ Yrs
            </div>
            <div className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#D98A1E]" />
              Engineering Mastery
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              100+
            </div>
            <div className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D98A1E]" />
              Banks in Production
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Weekly
            </div>
            <div className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D98A1E]" />
              Live Hands-on Builds
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              4.98/5
            </div>
            <div className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#D98A1E] fill-[#D98A1E]" />
              Mentor Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
