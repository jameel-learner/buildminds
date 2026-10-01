import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  Award,
  QrCode,
  Building2,
  TrendingDown,
  Calendar,
  Users,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { COURSE_PATHS, AGENT_BUILDER_INTENSIVE, BRAND } from '../data/buildMindsData';
import { PageRoute, CoursePath } from '../types';
import { UpiPaymentQr } from '../components/UpiPaymentQr';
import confetti from 'canvas-confetti';

interface EnrollmentPageProps {
  onNavigate: (page: PageRoute) => void;
  selectedPath?: CoursePath | null;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNavigate, selectedPath }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activePath, setActivePath] = useState<CoursePath>(selectedPath || COURSE_PATHS[0]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'invoice'>('upi');
  const [studentId, setStudentId] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [waUrl, setWaUrl] = useState('');

  const launchPrice = AGENT_BUILDER_INTENSIVE.tuition.launchPrice;
  const industryRate = AGENT_BUILDER_INTENSIVE.tuition.industryRate;
  const savings = AGENT_BUILDER_INTENSIVE.tuition.savingsAmount;

  const handleCompletePayment = (transactionRef?: string) => {
    const newId = `BM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalUtr = transactionRef?.trim() || 'DIRECT-UPI';
    setStudentId(newId);
    setUtrNumber(finalUtr);
    setStep(4);

    const expMap: Record<string, string> = {
      beginner: 'Beginner / Transitioning',
      intermediate: 'Intermediate Engineer',
      advanced: 'Senior / Lead Architect',
    };
    const expLabel = expMap[experienceLevel] || experienceLevel;

    // Compile comprehensive enrollment payload for Mohammed Jameel (WhatsApp: 9886558433)
    const waMsg = `*Build Minds — New Enrollment & Payment Confirmation* 🎓

Hello Mohammed Jameel, I have completed the tuition payment for The Agent Builder Intensive.

*Fellow / Student Details:*
• *Fellow ID:* ${newId}
• *Full Legal Name:* ${fullName}
• *Email Address:* ${email}
• *Phone / WhatsApp:* ${phone.trim() || 'Not specified'}
• *Technical Proficiency:* ${expLabel}

*Program & Track Details:*
• *Program:* The Agent Builder Intensive (14 Days • 6 Sprints)
• *Track:* ${activePath.title}
• *Cohort Batch:* ${AGENT_BUILDER_INTENSIVE.startDate} (${AGENT_BUILDER_INTENSIVE.cohortLabel})
• *Lead Mentors:* Mohammed Jameel & Naveed KS

*Payment Verification Details:*
• *Tuition Amount Paid:* ₹${launchPrice.toLocaleString()} INR
• *Payment Mode:* Direct UPI QR / Transfer (jameel.learner@oksbi)
• *UPI Reference / UTR Number:* ${finalUtr}
• *Status:* Payment Submitted for Seat Confirmation`;

    const whatsappUrl = `https://wa.me/919886558433?text=${encodeURIComponent(waMsg)}`;
    setWaUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D98A1E', '#2B3B4E', '#FFFFFF', '#10B981'],
      });
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Back to Home"
            title="Back to Home"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-[#162332] px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-3 py-1 rounded-full border border-[#D98A1E]/20">
            ENROLLMENT & SECURE ONBOARDING
          </span>
        </div>

        {/* Progress Bar (Clutter-free & responsive on mobile) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#162332] border border-[#25374C]">
          <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:justify-between text-xs font-semibold">
            {[
              { num: 1, shortLabel: 'Track', fullLabel: 'Select Track' },
              { num: 2, shortLabel: 'Profile', fullLabel: 'Profile' },
              { num: 3, shortLabel: 'Payment', fullLabel: 'Payment & QR' },
              { num: 4, shortLabel: 'Confirmed', fullLabel: 'Confirmed' },
            ].map((s, idx) => {
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;
              const isActiveOrPast = step >= s.num;
              return (
                <React.Fragment key={s.num}>
                  <div
                    className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-center sm:text-left transition ${
                      isActiveOrPast ? 'text-[#D98A1E]' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition ${
                        isCurrent
                          ? 'bg-[#D98A1E] text-black ring-2 ring-[#D98A1E]/40 font-black'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-[#0B131B] border border-slate-700 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : s.num}
                    </span>
                    <span className="leading-tight">
                      <span className="sm:hidden text-[10px] font-bold block">{s.shortLabel}</span>
                      <span className="hidden sm:inline">{s.fullLabel}</span>
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className="hidden sm:block flex-1 mx-2 h-px bg-[#25374C]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step 1: Select Track */}
        {step === 1 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-6 shadow-2xl animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#D98A1E] font-bold">Step 1 of 3</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Choose Your Cohort Track
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Flagship 14-Day Intensive (6 Sprints + Python Basecamp + Hackathon) starting <strong>{AGENT_BUILDER_INTENSIVE.startDate}</strong>.
                </p>
              </div>

              {/* Price comparison chip */}
              <div className="p-3 rounded-xl bg-[#0B131B] border border-[#D98A1E]/40 text-right shrink-0">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Limited Launch Price
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  ₹{launchPrice.toLocaleString()} INR
                </div>
                <div className="text-[11px] text-slate-400 line-through">
                  Industry rate: ₹{industryRate.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {COURSE_PATHS.map((path) => (
                <div
                  key={path.id}
                  onClick={() => setActivePath(path)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    activePath.id === path.id
                      ? 'bg-[#0B131B] border-[#D98A1E] shadow-md shadow-[#D98A1E]/10'
                      : 'bg-[#0B131B]/50 border-[#25374C] hover:border-slate-500'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{path.title}</span>
                      <span className="text-[10px] bg-[#D98A1E]/20 text-[#D98A1E] px-2 py-0.5 rounded font-mono uppercase">
                        {path.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{path.tagline}</p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Prerequisites: {path.prerequisites}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#D98A1E]">
                      {activePath.id === path.id ? 'Selected' : 'Select Track'}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        activePath.id === path.id
                          ? 'border-[#D98A1E] bg-[#D98A1E] text-black'
                          : 'border-slate-600'
                      }`}
                    >
                      {activePath.id === path.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#25374C] flex items-center justify-between">
              <button
                onClick={() => onNavigate('register')}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#D98A1E]" />
                <span>Prefer applying via official Google Form instead?</span>
              </button>

              <button
                onClick={() => setStep(2)}
                className="bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Profile & Background */}
        {step === 2 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-6 shadow-2xl animate-in fade-in">
            <div>
              <span className="text-xs font-mono uppercase text-[#D98A1E] font-bold">Step 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Student Profile & Onboarding
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Selected Track: <strong className="text-white">{activePath.title}</strong> (14 Days • 6 Sprints)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen / Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Current Technical Proficiency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'beginner', label: 'Beginner / Transitioning' },
                    { id: 'intermediate', label: 'Intermediate Engineer' },
                    { id: 'advanced', label: 'Senior / Lead Architect' }
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setExperienceLevel(lvl.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                        experienceLevel === lvl.id
                          ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                          : 'bg-[#0B131B] text-slate-300 border-[#25374C]'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#25374C] flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                ← Back
              </button>

              <button
                onClick={() => {
                  if (!fullName || !email) return;
                  setStep(3);
                }}
                disabled={!fullName || !email}
                className="bg-[#D98A1E] disabled:opacity-50 hover:bg-[#e7992c] text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Checkout & UPI Payment */}
        {step === 3 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#162332] border border-[#25374C] space-y-6 shadow-2xl animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#D98A1E] font-bold">Step 3 of 3</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Tuition & Direct Payment
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Enrolling: <strong className="text-white">{fullName}</strong> ({email})
                </p>
              </div>

              {/* Limited time badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>Save ₹{savings.toLocaleString()} (93% Discount)</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'upi'
                    ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                    : 'bg-[#0B131B] text-slate-300 border-[#25374C]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI QR (Recommended)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                    : 'bg-[#0B131B] text-slate-300 border-[#25374C]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('invoice')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'invoice'
                    ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                    : 'bg-[#0B131B] text-slate-300 border-[#25374C]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Corporate Sponsor</span>
              </button>
            </div>

            {/* UPI QR Payment View (Default) */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <UpiPaymentQr
                  amount={launchPrice}
                  onPaymentSuccess={(utr) => {
                    handleCompletePayment(utr);
                  }}
                />
              </div>
            )}

            {/* Card Payment View */}
            {paymentMethod === 'card' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCompletePayment('CARD-ONLINE');
                }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-[#0B131B] border border-[#25374C] space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Discounted Launch Tuition:</span>
                    <span className="font-mono font-bold text-white text-base">₹{launchPrice.toLocaleString()} INR</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      defaultValue={fullName}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#162332] border border-[#25374C] text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#162332] border border-[#25374C] text-white text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="09/28"
                        required
                        className="w-full px-3 py-2 rounded-lg bg-[#162332] border border-[#25374C] text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        required
                        className="w-full px-3 py-2 rounded-lg bg-[#162332] border border-[#25374C] text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D98A1E] hover:bg-[#e7992c] text-white font-extrabold text-sm rounded-xl transition shadow-xl shadow-[#D98A1E]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{launchPrice.toLocaleString()} & Confirm Seat</span>
                </button>
              </form>
            )}

            {/* Corporate Invoice View */}
            {paymentMethod === 'invoice' && (
              <div className="p-5 rounded-2xl bg-[#0B131B] border border-[#25374C] space-y-4 text-xs">
                <div className="font-bold text-white text-sm">Corporate Sponsorship & GST Invoicing</div>
                <p className="text-slate-300 leading-relaxed">
                  If your company is reimbursing this program (e.g. L&D / Upskilling budget), we provide a formal GST invoice and vendor registration forms for ₹6,000 INR.
                </p>
                <div className="space-y-2">
                  <div className="text-slate-400">Direct Invoicing Contact:</div>
                  <div className="font-mono text-[#D98A1E] font-bold">jameel.learner@gmail.com</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCompletePayment('CORP-INVOICE')}
                  className="w-full py-3 rounded-xl bg-[#25374C] hover:bg-[#344b66] text-white font-bold transition cursor-pointer"
                >
                  Request Corporate Invoice & Reserve Seat
                </button>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => setStep(2)}
                className="text-slate-400 hover:text-white"
              >
                ← Back to Profile
              </button>

              <div className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed Admission */}
        {step === 4 && (
          <div className="p-8 rounded-3xl bg-[#162332] border-2 border-[#D98A1E] shadow-2xl text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D98A1E] bg-[#D98A1E]/10 px-3 py-1 rounded">
                Official Admission Confirmed
              </span>
              <h2 className="text-3xl font-black text-white mt-3">
                Welcome to Build Minds, {fullName || 'Fellow'}!
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Your seat in <strong>{activePath.title}</strong> for the <strong>{AGENT_BUILDER_INTENSIVE.startDate}</strong> fellowship batch is locked at the special launch rate of <strong>₹{launchPrice.toLocaleString()} INR</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B131B] border border-[#25374C] max-w-md mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Fellow ID:</span>
                <span className="text-white font-mono font-bold">{studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Track:</span>
                <span className="text-white font-semibold">{activePath.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cohort Start Date:</span>
                <span className="text-white font-semibold">{AGENT_BUILDER_INTENSIVE.startDate} (14 Days • 6 Sprints)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tuition Paid:</span>
                <span className="text-emerald-400 font-mono font-bold">₹{launchPrice.toLocaleString()} INR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UPI Ref / UTR:</span>
                <span className="text-[#D98A1E] font-mono font-bold">{utrNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone / WhatsApp:</span>
                <span className="text-white font-mono">{phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email Confirmation:</span>
                <span className="text-slate-200 font-mono">{email || 'your registered email'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Instructors:</span>
                <span className="text-white font-semibold">Mohammed Jameel & Naveed KS</span>
              </div>
            </div>

            {/* WhatsApp Dispatch Notice */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 max-w-md mx-auto text-xs flex items-start gap-2.5 text-left">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div>
                <div className="font-bold text-white">Enrollment Details Sent to WhatsApp (9886558433)</div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  All details from previous steps along with your UTR <strong className="font-mono text-emerald-300">{utrNumber}</strong> have been compiled and sent to mentor Mohammed Jameel for fast-track verification.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs px-6 py-3 rounded-xl transition inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp (+91 9886558433)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto bg-[#162332] hover:bg-[#22354a] border border-[#25374C] text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Return to Build Minds Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
