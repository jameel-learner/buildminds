import React, { useState } from 'react';
import { BuildMindsLogo } from './BuildMindsLogo';
import { Calendar, FileText, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';
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
    <header className="sticky top-0 z-40 relative overflow-hidden bg-[#0E1722]/95 border-b border-[#25374C]/80 transition-all">
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
            title="Open Registration Page for 21 Sep 2026 Intensive"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Apply 21 Sep Form</span>
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
        <div className="lg:hidden bg-[#0B131B] border-b border-[#25374C] px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('weekly-event')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium flex items-center justify-between"
          >
            <span>Build Your First Agent — Live</span>
            <span className="text-xs bg-[#D98A1E]/20 text-[#D98A1E] px-2 py-0.5 rounded font-mono font-bold">
              Weekly Event
            </span>
          </button>
          <button
            onClick={() => handleNav('intensive')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium"
          >
            The Agent Builder Intensive (21 Sep 2026)
          </button>
          <button
            onClick={() => handleNav('curriculum')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium"
          >
            Curriculum Tracks
          </button>
          <button
            onClick={() => handleNav('mentors')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium"
          >
            Mentors (Mohammed Jameel & Naveed KS)
          </button>
          <button
            onClick={() => handleNav('enrollment')}
            className="w-full text-left py-2.5 text-slate-200 hover:text-[#D98A1E] font-medium"
          >
            Enrollment & Secure Payment
          </button>
          <div className="pt-3 border-t border-[#25374C]">
            <button
              onClick={() => handleNav('register')}
              className="w-full py-3 bg-[#D98A1E] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D98A1E]/20"
            >
              <FileText className="w-4 h-4" />
              <span>Fill 21 Sep Registration Form</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
