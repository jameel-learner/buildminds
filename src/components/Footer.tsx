import React from 'react';
import { BuildMindsLogo } from './BuildMindsLogo';
import { PageRoute } from '../types';
import { AGENT_BUILDER_INTENSIVE, BRAND } from '../data/buildMindsData';
import { FileText, Calendar, ArrowUpRight, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B131B] text-white border-t border-[#25374C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#25374C]">
          {/* Brand Col (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <BuildMindsLogo showTagline={true} size="md" variant="light" />

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {BRAND.subTagline}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button
                id="footer-apply-form-btn"
                onClick={() => {
                  onNavigate('register');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#D98A1E] text-white hover:bg-[#e7992c] text-xs font-bold px-3.5 py-2 rounded-xl transition inline-flex items-center gap-1.5 shadow-md shadow-[#D98A1E]/20 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>16 Sep Google Form</span>
              </button>

              <button
                id="footer-weekly-event-btn"
                onClick={() => {
                  onNavigate('weekly-event');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#162332] text-slate-300 hover:text-white border border-[#25374C] text-xs font-medium px-3.5 py-2 rounded-xl transition cursor-pointer"
              >
                Weekly Live Build
              </button>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Programs & Cohorts
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onNavigate('register');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition flex items-center gap-1.5 text-left"
                >
                  <span>16 Sep 2026 Batch Form</span>
                  <span className="text-[9px] bg-[#D98A1E] text-white font-bold px-1.5 py-0.5 rounded">Live</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('intensive');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  The Agent Builder Intensive
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('weekly-event');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Build Your First Agent — Live (Weekly)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Autonomous Engineering Track
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Faculty */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Engineering Mentors
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onNavigate('mentors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Mohammed Jameel (Kernel VisionX / Ex-IBM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('mentors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Naveed KS (Ex-interface.ai / Cisco / Altisource)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('mentors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Book 1:1 Office Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('enrollment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D98A1E] transition text-left"
                >
                  Tuition Grants & Enrollment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Direct Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admissions & Contact
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href={AGENT_BUILDER_INTENSIVE.directFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D98A1E] transition flex items-center gap-1"
                >
                  <span>Direct Google Form</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D98A1E]" />
                </a>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#D98A1E]" />
                  jameel.learner@gmail.com
                </span>
              </li>
              <li>
                <span className="text-slate-400">Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Build Minds. Train Minds Build Products. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
