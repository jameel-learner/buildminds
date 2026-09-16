import React, { useState } from 'react';
import { COURSE_PATHS, AGENT_BUILDER_INTENSIVE } from '../data/buildMindsData';
import { CoursePath, PageRoute } from '../types';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles, Terminal, FileText } from 'lucide-react';

interface PersonalizedPathsProps {
  onNavigate: (page: PageRoute) => void;
  onSelectPathForEnrollment: (path: CoursePath) => void;
}

export const PersonalizedPaths: React.FC<PersonalizedPathsProps> = ({
  onNavigate,
  onSelectPathForEnrollment,
}) => {
  const [activePathId, setActivePathId] = useState(COURSE_PATHS[0].id);
  const activePath = COURSE_PATHS.find((p) => p.id === activePathId) || COURSE_PATHS[0];

  return (
    <section id="curriculum" className="py-20 bg-[#0B131B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162332] border border-[#25374C] text-xs font-semibold text-[#D98A1E] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>SPECIALIZED INDUSTRY TRACKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            The Agent Builder Intensive Syllabus
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Choose your learning track. Both tracks include live weekend coding sessions, 1:1 mentorship from Mohammed Jameel & Naveed KS, and private architectural code defense.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          {COURSE_PATHS.map((path) => (
            <button
              key={path.id}
              id={`path-tab-${path.id}`}
              onClick={() => setActivePathId(path.id)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2.5 border cursor-pointer ${
                activePathId === path.id
                  ? 'bg-[#D98A1E] text-white border-[#D98A1E] shadow-lg shadow-[#D98A1E]/20'
                  : 'bg-[#162332] text-slate-300 border-[#25374C] hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>{path.title}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded uppercase ${
                  activePathId === path.id
                    ? 'bg-black/20 text-white'
                    : 'bg-[#0B131B] text-[#D98A1E] border border-[#25374C]'
                }`}
              >
                {path.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Path Showcase Box */}
        <div className="rounded-3xl bg-[#162332] border border-[#25374C] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-3 py-1 rounded-md">
                  {activePath.duration}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                  {activePath.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activePath.tagline}
                </p>
              </div>

              {/* Target audience & tools */}
              <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-3">
                <div className="text-xs">
                  <span className="text-slate-400 font-medium">Ideal For: </span>
                  <span className="text-white font-semibold">{activePath.targetRole}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 font-medium">Prerequisites: </span>
                  <span className="text-slate-200">{activePath.prerequisites}</span>
                </div>
                <div className="pt-2 border-t border-[#25374C] flex flex-wrap gap-1.5">
                  {activePath.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono bg-[#162332] text-slate-300 px-2 py-0.5 rounded border border-[#25374C]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What You Will Build & Deliver
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {activePath.outcomes.map((outcome, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D98A1E] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  id={`enroll-path-${activePath.id}-btn`}
                  onClick={() => {
                    onSelectPathForEnrollment(activePath);
                    onNavigate('enrollment');
                  }}
                  className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#D98A1E]/20 cursor-pointer"
                >
                  <span>Enroll in this Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id={`apply-form-from-path-btn`}
                  onClick={() => onNavigate('register')}
                  className="bg-[#0B131B] hover:bg-[#1f2f42] text-slate-200 hover:text-white border border-[#25374C] font-semibold text-xs px-5 py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>21 Sep Google Form</span>
                </button>
              </div>
            </div>

            {/* Right Col: 6 Sprints List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                6 Engineering Sprints (14 Days) & Milestone Deliverables
              </div>

              {activePath.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-5 rounded-2xl bg-[#0B131B] border border-[#25374C] hover:border-[#D98A1E]/40 transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                      Sprint {mod.week}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {mod.lessons.length} Core Sessions
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{mod.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{mod.summary}</p>

                  {/* Hands-on project deliverable */}
                  <div className="p-3 rounded-xl bg-[#162332] border border-[#25374C]/80 text-xs flex items-start gap-2.5">
                    <Terminal className="w-4 h-4 text-[#D98A1E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Deliverable: </span>
                      <span className="text-slate-300">{mod.projectTitle}</span>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {mod.projectDescription}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
