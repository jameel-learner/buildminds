import React, { useState } from 'react';
import { BuildMindsLogo } from './BuildMindsLogo';
import {
  Calendar,
  FileText,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Home,
  Bot,
  Layers,
  Users,
  CreditCard,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { PageRoute } from '../types';
import { UPCOMING_COHORT } from '../data/buildMindsData';
import logoImg from '../assets/images/direct_white_logo_only.png';
import heroBgImg from '../assets/images/outskill_hero_bg_1789149819245.jpg';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 relative bg-[#0E1722]/95 border-b border-[#25374C]/80 transition-all">
      {/* Background Image from assets/images/outskill_hero_bg_1789149819245.jpg */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={heroBgImg}
          alt=""
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-[#0E1722]/85 backdrop-blur-md" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name: Round logo without padding, 2-color brand text, no tagline */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNav('home')}
          className="text-left group cursor-pointer focus:outline-none p-0 flex items-center gap-3"
          title="Build Minds Home"
        >
          <img
            src={logoImg}
            alt="Build Minds"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain select-none"
            style={{ aspectRatio: '583 / 461' }}
          />
          <div className="flex flex-col justify-center select-none py-0.5">
            <span className="font-black tracking-wider text-base sm:text-lg text-white uppercase leading-none">
              BUILD
            </span>
            <span className="font-black tracking-wider text-base sm:text-lg text-[#D98A1E] uppercase leading-none mt-1">
              MINDS
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
          <button
            id="nav-home-btn"
            onClick={() => handleNav('home')}
            className={`transition hover:text-white cursor-pointer ${
              currentPage === 'home' ? 'text-[#D98A1E] font-semibold' : ''
            }`}
          >
            Home
          </button>

          <button
            id="nav-weekly-event-btn"
            onClick={() => handleNav('weekly-event')}
            className={`transition hover:text-white cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'weekly-event' ? 'text-[#D98A1E] font-semibold' : ''
            }`}
          >
            <span>Build Your First Agent — Live</span>
            <span className="text-[10px] bg-[#D98A1E]/20 text-[#D98A1E] border border-[#D98A1E]/40 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
              Weekly
            </span>
          </button>

          <button
            id="nav-intensive-btn"
            onClick={() => handleNav('intensive')}
            className={`transition hover:text-white cursor-pointer ${
              currentPage === 'intensive' ? 'text-[#D98A1E] font-semibold' : ''
            }`}
          >
            The Agent Builder Intensive
          </button>

          <button
            id="nav-curriculum-btn"
            onClick={() => handleNav('curriculum')}
            className={`transition hover:text-white cursor-pointer ${
              currentPage === 'curriculum' ? 'text-[#D98A1E] font-semibold' : ''
            }`}
          >
            Curriculum Tracks
          </button>

          <button
            id="nav-mentors-btn"
            onClick={() => handleNav('mentors')}
            className={`transition hover:text-white cursor-pointer ${
              currentPage === 'mentors' ? 'text-[#D98A1E] font-semibold' : ''
            }`}
          >
            Mentors
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            id="nav-enroll-btn"
            onClick={() => handleNav('enrollment')}
            className="text-xs font-semibold text-slate-200 hover:text-white bg-[#182635] hover:bg-[#22354a] border border-[#25374C] px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            Enrollment & Fees
          </button>

          {/* Form Direct Register Page Button */}
          <button
            id="nav-apply-form-btn"
            onClick={() => handleNav('register')}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#D98A1E] hover:bg-[#e7992c] px-4 py-2.5 rounded-xl transition shadow-md shadow-[#D98A1E]/20 cursor-pointer"
            title={`Open Registration Page for ${UPCOMING_COHORT.startDateFormatted} Intensive`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Apply {UPCOMING_COHORT.shortDate} Form</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            id="mobile-apply-btn"
            onClick={() => handleNav('register')}
            className="bg-[#D98A1E] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            Apply
          </button>
          <button
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 p-2 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-50 bg-[#0B131B] border-t border-b border-[#25374C] px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center gap-3 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 text-[#D98A1E] shrink-0" />
            <span className="text-sm font-semibold">Home</span>
          </button>

          <button
            onClick={() => handleNav('weekly-event')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
              currentPage === 'weekly-event'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <div className="text-left">
                <span className="text-sm font-semibold block">Build Your First Agent — Live</span>
                <span className="text-[11px] text-slate-400 block">Every Saturday • 11:00 AM – 2:00 PM IST</span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold shrink-0">
              FREE
            </span>
          </button>

          <button
            onClick={() => handleNav('intensive')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
              currentPage === 'intensive'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <div className="text-left">
                <span className="text-sm font-semibold block">The Agent Builder Intensive</span>
                <span className="text-[11px] text-slate-400 block">{UPCOMING_COHORT.cohortLabel} • Starts {UPCOMING_COHORT.startDateFormatted}</span>
              </div>
            </div>
            <span className="text-[10px] bg-[#D98A1E]/20 text-[#D98A1E] px-2 py-0.5 rounded font-mono font-bold shrink-0">
              ₹6k
            </span>
          </button>

          <button
            onClick={() => handleNav('curriculum')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
              currentPage === 'curriculum'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <div className="text-left">
                <span className="text-sm font-semibold block">Curriculum Tracks</span>
                <span className="text-[11px] text-slate-400 block">6 Rigorous Sprints + Basecamp + Hackathon</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNav('mentors')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
              currentPage === 'mentors'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <div className="text-left">
                <span className="text-sm font-semibold block">Mentors</span>
                <span className="text-[11px] text-slate-400 block">Mohammed Jameel & Naveed KS</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNav('enrollment')}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
              currentPage === 'enrollment'
                ? 'bg-[#D98A1E]/15 text-[#D98A1E] font-bold border border-[#D98A1E]/30'
                : 'text-slate-200 hover:bg-[#162332] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <div className="text-left">
                <span className="text-sm font-semibold block">Enrollment & Secure Payment</span>
                <span className="text-[11px] text-slate-400 block">UPI QR Direct Transfer • Instant Seat Lock</span>
              </div>
            </div>
          </button>

          <div className="pt-3 border-t border-[#25374C] space-y-2">
            <button
              onClick={() => handleNav('register')}
              className="w-full py-3 bg-[#D98A1E] hover:bg-[#e7992c] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D98A1E]/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Fill {UPCOMING_COHORT.shortDate} Registration Form</span>
            </button>

            <a
              href="https://wa.me/919886558433?text=Hi%20Mohammed%20Jameel%2C%20I%20have%20a%20question%20regarding%20Build%20Minds%20AI%20programs."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#162332] hover:bg-[#203246] border border-[#25374C] text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Mentors: +91 9886558433</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
