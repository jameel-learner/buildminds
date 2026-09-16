import React, { useState } from 'react';
import { MENTORS } from '../data/buildMindsData';
import { Mentor, PageRoute } from '../types';
import { Award, Calendar, CheckCircle2, Star, Mail, MapPin, Briefcase, GraduationCap, ArrowRight, Clock } from 'lucide-react';

interface MentorsSectionProps {
  onNavigate: (page: PageRoute) => void;
}

export const MentorsSection: React.FC<MentorsSectionProps> = ({ onNavigate }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const getMentorWhatsAppUrl = (mentor: Mentor, slot?: string) => {
    const number = mentor.whatsappNumber || (mentor.id === 'mohammed-jameel' ? '9886558433' : '9620335582');
    const message = slot
      ? `Hello ${mentor.name}, I would like to book a 1:1 Office Hours session for ${slot} regarding Build Minds. Please let me know if this works.`
      : `Hello ${mentor.name}, I would like to book a 1:1 Office Hours session with you regarding Build Minds. Please share your available slots.`;
    return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
  };

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !userEmail || !userName) return;
    setBookingSuccess(true);
    if (selectedMentor) {
      window.open(getMentorWhatsAppUrl(selectedMentor, selectedSlot), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="mentors" className="py-20 bg-[#0B131B] border-t border-[#25374C] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162332] border border-[#25374C] text-xs font-semibold text-[#D98A1E] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>LEARN DIRECTLY FROM INDUSTRY PIONEERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Meet Your Engineering Mentors
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            No junior teaching assistants or academic theorists. You work 1:1 with veteran engineering leaders who have built and tested mission-critical systems in enterprise banking and software services.
          </p>
        </div>

        {/* The 2 Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-3xl bg-[#162332] border border-[#25374C] p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#D98A1E]/50 transition duration-300 group"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D98A1E] font-bold bg-[#D98A1E]/10 px-2.5 py-1 rounded">
                      {mentor.experience}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2 group-hover:text-[#D98A1E] transition">
                      {mentor.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                      {mentor.role}
                    </p>
                    <p className="text-xs text-[#D98A1E] mt-0.5 font-medium">
                      {mentor.company}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 text-sm font-bold text-white">
                      <Star className="w-4 h-4 text-[#D98A1E] fill-[#D98A1E]" />
                      <span>{mentor.rating}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {mentor.sessionsConducted}+ Reviews
                    </div>
                  </div>
                </div>

                {/* Location & Contact Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pb-4 mb-4 border-b border-[#25374C]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D98A1E]" />
                    {mentor.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D98A1E]" />
                    {mentor.email}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {mentor.bio}
                </p>

                {/* Career Milestones */}
                <div className="mb-5 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Key Achievements
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {mentor.careerHighlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D98A1E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Specialties Pills */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Core Technical Domains
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] bg-[#0B131B] border border-[#25374C] text-slate-300 px-2.5 py-1 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  id={`book-mentor-${mentor.id}-btn`}
                  href={getMentorWhatsAppUrl(mentor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  title={`Book 1:1 Office Hours with ${mentor.name} via WhatsApp`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1:1 Office Hours</span>
                </a>

                <button
                  id={`view-full-resume-${mentor.id}-btn`}
                  onClick={() => onNavigate('mentors')}
                  className="w-full sm:w-auto text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3 h-3 text-[#D98A1E]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In-Page 1:1 Booking Drawer / Card (No Popup!) */}
        {selectedMentor && (
          <div className="mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#162332] border-2 border-[#D98A1E] shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#25374C] pb-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#D98A1E] uppercase">
                  Schedule Direct 1:1 Consultation
                </span>
                <h3 className="text-xl font-bold text-white">
                  30-Minute Office Hours with {selectedMentor.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-xs text-slate-400 hover:text-white bg-[#0B131B] px-3 py-1.5 rounded-lg border border-[#25374C]"
              >
                Cancel
              </button>
            </div>

            {!bookingSuccess ? (
              <form onSubmit={handleBookSlot} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Available Office Hours Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedMentor.availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                          selectedSlot === slot
                            ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                            : 'bg-[#0B131B] text-slate-300 border-[#25374C] hover:border-slate-500'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Mehta"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priyanshu@company.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white text-sm focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="confirm-mentor-booking-btn"
                    className="w-full py-3.5 bg-[#D98A1E] hover:bg-[#e7992c] text-white text-sm font-bold rounded-xl transition shadow-lg shadow-[#D98A1E]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm 1:1 Architectural Defense Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0B131B] border border-[#D98A1E]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D98A1E]/20 text-[#D98A1E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Office Hours Reserved!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Confirmed with <strong className="text-white">{selectedMentor.name}</strong> for{' '}
                  <strong className="text-[#D98A1E]">{selectedSlot}</strong>. Calendar invite and private meeting link dispatched to <strong className="text-white">{userEmail}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSelectedMentor(null);
                    setBookingSuccess(false);
                  }}
                  className="mt-2 text-xs font-bold text-[#D98A1E] underline"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
