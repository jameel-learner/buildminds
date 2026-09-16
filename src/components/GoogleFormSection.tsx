import React, { useState } from 'react';
import { FileText, ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { AGENT_BUILDER_INTENSIVE } from '../data/buildMindsData';
import { PageRoute } from '../types';

interface GoogleFormSectionProps {
  onNavigate?: (page: PageRoute) => void;
}

export const GoogleFormSection: React.FC<GoogleFormSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(AGENT_BUILDER_INTENSIVE.directFormLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section id="accelerator" className="py-20 bg-[#0B131B] text-white relative border-t border-[#25374C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162332] border border-[#25374C] text-[#D98A1E] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Cohort Application</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Register for The Agent Builder Intensive
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Submit your application for the upcoming <strong>21 Sep 2026</strong> fellowship batch. Reviewed directly by Mohammed Jameel and Naveed KS.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#162332] border border-[#25374C] rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="bg-[#162332] border-b border-[#25374C] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D98A1E]/15 border border-[#D98A1E]/30 flex items-center justify-center text-[#D98A1E]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>The Agent Builder Intensive Registration</span>
                  <span className="text-[10px] bg-[#D98A1E]/20 text-[#D98A1E] px-2 py-0.5 rounded-full border border-[#D98A1E]/30 font-semibold">
                    Accepting Responses
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Batch Commences: <span className="text-white font-semibold">{AGENT_BUILDER_INTENSIVE.startDate}</span> • {AGENT_BUILDER_INTENSIVE.batchSize}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                id="copy-form-link-btn"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-[#0B131B] hover:bg-[#182635] px-3 py-2 rounded-xl transition border border-[#25374C] cursor-pointer"
                title="Copy Google Form Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#D98A1E]" /> : <Copy className="w-3.5 h-3.5 text-[#D98A1E]" />}
                <span>{copied ? 'Copied' : 'Share Link'}</span>
              </button>

              <button
                id="reload-form-btn"
                onClick={handleReload}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-[#0B131B] hover:bg-[#182635] px-3 py-2 rounded-xl transition border border-[#25374C] cursor-pointer"
                title="Reload Form"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>

              {onNavigate && (
                <button
                  id="open-dedicated-register-page-btn"
                  onClick={() => onNavigate('register')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#D98A1E] hover:bg-[#e7992c] px-3.5 py-2 rounded-xl transition cursor-pointer"
                >
                  <span>Open Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Guidance Alert */}
          <div className="bg-[#0B131B]/60 px-4 sm:px-6 py-2.5 border-b border-[#25374C] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D98A1E] shrink-0" />
              <span>
                Please complete all required questions. Your submission is recorded directly in the Build Minds admissions roster.
              </span>
            </div>
            <span className="hidden md:inline-block text-slate-500">256-Bit SSL Encrypted</span>
          </div>

          {/* Embedded Google Form Iframe Container */}
          <div className="p-3 sm:p-6 bg-white flex justify-center">
            <iframe
              key={iframeKey}
              src={AGENT_BUILDER_INTENSIVE.googleFormUrl}
              width="100%"
              height="4000"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              scrolling="no"
              title="Build Minds Registration Form 21 Sep 2026"
              className="w-full max-w-2xl border-0"
              style={{ height: '4000px', minHeight: '4000px' }}
            >
              Loading application form…
            </iframe>
          </div>

          {/* Bottom Security Footer */}
          <div className="bg-[#162332] px-6 py-4 border-t border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D98A1E]" />
              <span>
                Cohort starts 21 Sep 2026. Fellows receive repo invites & setup guide 48 hours prior.
              </span>
            </div>

            <a
              href={AGENT_BUILDER_INTENSIVE.directFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D98A1E] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Having issues with embedded view? Open Google Form directly</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
