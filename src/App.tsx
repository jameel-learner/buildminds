import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeeklyEventSection } from './components/WeeklyEventSection';
import { GoogleFormSection } from './components/GoogleFormSection';
import { PersonalizedPaths } from './components/PersonalizedPaths';
import { MentorsSection } from './components/MentorsSection';
import { Footer } from './components/Footer';
import { RegisterPage } from './pages/RegisterPage';
import { WeeklyEventPage } from './pages/WeeklyEventPage';
import { IntensivePage } from './pages/IntensivePage';
import { MentorsPage } from './pages/MentorsPage';
import { EnrollmentPage } from './pages/EnrollmentPage';
import { AdminPage } from './pages/AdminPage';
import { PageRoute, CoursePath } from './types';
import { BRAND, AGENT_BUILDER_INTENSIVE, UPCOMING_COHORT } from './data/buildMindsData';
import { FileText, ArrowRight, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

const parseRouteFromUrl = (): PageRoute => {
  if (typeof window === 'undefined') return 'home';

  // Check if restored from SPA 404 fallback
  let restoredPath = '';
  try {
    const saved = sessionStorage.getItem('spa_redirect_path');
    if (saved) {
      sessionStorage.removeItem('spa_redirect_path');
      restoredPath = saved;
      window.history.replaceState(null, '', saved);
    }
  } catch {
    // ignore
  }

  const rawPath = (restoredPath || window.location.pathname)
    .split('?')[0]
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
  const rawHash = window.location.hash
    .replace(/^#\/?/, '')
    .replace(/\/+$/, '')
    .toLowerCase();

  const checkMatch = (str: string): PageRoute | null => {
    const clean = str.replace(/^\/+|\/+$/g, '');
    if (clean === 'admin' || clean === 'admin/login' || clean === 'login' || clean === 'command-center') return 'admin';
    if (clean === 'weekly-event' || clean === 'weekly' || clean === 'saturday') return 'weekly-event';
    if (clean === 'enrollment' || clean === 'step-by-step' || clean === 'onboarding' || clean === 'enroll') return 'enrollment';
    if (clean === 'intensive') return 'intensive';
    if (clean === 'register' || clean === 'apply') return 'register';
    if (clean === 'curriculum') return 'curriculum';
    if (clean === 'mentors') return 'mentors';
    if (clean === 'home' || clean === '') return 'home';
    return null;
  };

  return checkMatch(rawPath) || checkMatch(rawHash) || 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseRouteFromUrl);
  const [selectedPath, setSelectedPath] = useState<CoursePath | null>(null);
  const [recentNotification, setRecentNotification] = useState<{
    id: number;
    text: string;
    subtext: string;
  } | null>(null);

  // Sync URL popstate & hash changes for direct unique URLs
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPage(parseRouteFromUrl());
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Social proof ticker
  useEffect(() => {
    const notifications = [
      { text: 'Aman K. from Bengaluru', subtext: 'Registered for Build Your First Agent — Live' },
      { text: 'Elena R. from Singapore', subtext: `Applied for The Agent Builder Intensive (${UPCOMING_COHORT.shortDate})` },
      { text: 'Karthik S. from Hyderabad', subtext: 'Booked 1:1 Office Hours with Naveed KS' },
      { text: 'David M. from San Francisco', subtext: 'Enrolled in Autonomous Engineering Track' },
    ];

    let index = 0;
    const interval = setInterval(() => {
      setRecentNotification({
        id: Date.now(),
        text: notifications[index].text,
        subtext: notifications[index].subtext,
      });
      index = (index + 1) % notifications.length;

      setTimeout(() => {
        setRecentNotification(null);
      }, 4500);
    }, 16000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    try {
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ page }, '', targetUrl);
      }
    } catch {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPathForEnrollment = (path: CoursePath) => {
    setSelectedPath(path);
    handleNavigate('enrollment');
  };

  return (
    <div className="min-h-screen bg-[#0B131B] text-slate-100 font-sans selection:bg-[#D98A1E] selection:text-white flex flex-col">
      {/* Top Persistent Announcement Bar */}
      <div className="bg-[#162332] border-b border-[#25374C] text-xs py-2 px-4 text-center flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span className="inline-flex items-center gap-1.5 font-bold text-[#D98A1E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Agent Builder Intensive Starts {UPCOMING_COHORT.startDateFormatted}</span>
        </span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="text-slate-300">
          Official Google Form applications are open for the upcoming cohort
        </span>
        <button
          id="top-bar-apply-btn"
          onClick={() => handleNavigate('register')}
          className="underline font-bold text-white hover:text-[#D98A1E] transition inline-flex items-center gap-1 ml-1 cursor-pointer"
        >
          <span>Open Application Form</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Navigation Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Router (In-theme full-page navigation, NO POPUPS!) */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onNavigate={handleNavigate} />

            {/* Weekly Event Section (Build Your First Agent — Live) */}
            <WeeklyEventSection onNavigate={handleNavigate} />

            {/* Embedded Google Form Section for Upcoming Cohort */}
            <GoogleFormSection onNavigate={handleNavigate} />

            {/* Specialized Industry Tracks */}
            <PersonalizedPaths
              onNavigate={handleNavigate}
              onSelectPathForEnrollment={handleSelectPathForEnrollment}
            />

            {/* Mentors Showcase (Mohammed Jameel & Naveed KS) */}
            <MentorsSection onNavigate={handleNavigate} />

            {/* Bottom Cohort Callout Banner */}
            <section className="py-16 bg-[#0E1722] border-t border-[#25374C] relative">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#162332] border border-[#25374C] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                  <div className="space-y-3 text-center md:text-left">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-3 py-1 rounded-md inline-block">
                      Next Fellowship Batch: {UPCOMING_COHORT.startDateFormatted}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Ready to Build Autonomous AI Agents?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                      Join 50 fellows learning directly from Mohammed Jameel & Naveed KS with private code reviews, live hands-on builds, and 1:1 architectural defenses.
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      id="bottom-banner-register-btn"
                      onClick={() => handleNavigate('register')}
                      className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#D98A1E]/20 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Fill {UPCOMING_COHORT.shortDate} Google Form</span>
                    </button>

                    <button
                      id="bottom-banner-weekly-btn"
                      onClick={() => handleNavigate('weekly-event')}
                      className="bg-[#0B131B] hover:bg-[#1f2f42] text-white font-bold text-xs px-5 py-3.5 rounded-xl transition border border-[#25374C] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#D98A1E]" />
                      <span>Saturday Free Masterclass</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'weekly-event' && (
          <WeeklyEventPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'intensive' && (
          <IntensivePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'curriculum' && (
          <div className="py-12 bg-[#0B131B]">
            <PersonalizedPaths
              onNavigate={handleNavigate}
              onSelectPathForEnrollment={handleSelectPathForEnrollment}
            />
          </div>
        )}

        {currentPage === 'mentors' && (
          <MentorsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'enrollment' && (
          <EnrollmentPage onNavigate={handleNavigate} selectedPath={selectedPath} />
        )}

        {currentPage === 'admin' && (
          <AdminPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Button (Apply Form) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        {/* Live Social Proof Badge */}
        {recentNotification && (
          <div className="bg-[#162332]/95 border border-[#25374C] rounded-xl p-3 shadow-2xl backdrop-blur-md max-w-xs animate-in slide-in-from-bottom-2 fade-in duration-300 text-xs">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-[#D98A1E] animate-ping" />
              <span>{recentNotification.text}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{recentNotification.subtext}</div>
          </div>
        )}

        {/* Floating Quick Action Pill */}
        {currentPage !== 'register' && (
          <button
            id="floating-apply-form-btn"
            onClick={() => handleNavigate('register')}
            className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full shadow-2xl shadow-[#D98A1E]/30 flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            title={`Open ${UPCOMING_COHORT.startDateFormatted} Registration Form`}
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Apply {UPCOMING_COHORT.shortDate} Form</span>
          </button>
        )}
      </div>
    </div>
  );
}
