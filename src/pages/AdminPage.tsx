import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Share2,
  ArrowLeft,
  Copy,
  Check,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Tag,
  AlertCircle,
  X,
  Lock,
  Key,
  LogOut,
  Eye,
  EyeOff,
  UserCheck,
  Shield
} from 'lucide-react';
import {
  dbService,
  WeeklyRegistration,
  IntensiveRegistration
} from '../services/db';
import { adminAuthService, AdminUser } from '../services/auth';
import { BuildMindsLogo } from '../components/BuildMindsLogo';
import { PageRoute } from '../types';
import { UPCOMING_SATURDAY, UPCOMING_COHORT, AGENT_BUILDER_INTENSIVE } from '../data/buildMindsData';

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
}

const REFERRAL_OPTIONS = [
  'LinkedIn',
  'WhatsApp',
  'Mohammed Jameel Referral',
  'Naveed KS Referral',
  'Twitter/X',
  'Outskill Alumni',
  'Friend / Colleague',
  'Website Direct',
  'YouTube',
  'Other'
];

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Authentication & Session
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() =>
    adminAuthService.getCurrentSession()
  );
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Change Password Modal
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<string | null>(null);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [activeTab, setActiveTab] = useState<'weekly' | 'intensive'>('weekly');
  const [weeklyList, setWeeklyList] = useState<WeeklyRegistration[]>([]);
  const [intensiveList, setIntensiveList] = useState<IntensiveRegistration[]>([]);

  // Weekly Filters
  const [weeklySearch, setWeeklySearch] = useState('');
  const [weeklyDateFilter, setWeeklyDateFilter] = useState('all');
  const [weeklyWaFilter, setWeeklyWaFilter] = useState<'all' | 'added' | 'pending'>('all');
  const [selectedWeeklyIds, setSelectedWeeklyIds] = useState<string[]>([]);

  // Intensive Filters
  const [intensiveSearch, setIntensiveSearch] = useState('');
  const [cohortDateFilter, setCohortDateFilter] = useState('all');
  const [referralFilter, setReferralFilter] = useState('all');
  const [utrStatusFilter, setUtrStatusFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedIntensiveIds, setSelectedIntensiveIds] = useState<string[]>([]);

  // Modals & UI States
  const [editingIntensive, setEditingIntensive] = useState<IntensiveRegistration | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // New Participant Form State
  const [newParticipant, setNewParticipant] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: AGENT_BUILDER_INTENSIVE.title,
    learningPath: 'Enterprise Agent Systems Architect',
    cohortDate: AGENT_BUILDER_INTENSIVE.startDate,
    experienceLevel: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: '',
    utrVerified: false,
    referralChannel: 'LinkedIn',
    adminNotes: ''
  });

  const loadData = () => {
    setWeeklyList(dbService.getWeeklyRegistrations());
    setIntensiveList(dbService.getIntensiveRegistrations());
  };

  useEffect(() => {
    loadData();
    const unsubWeekly = dbService.subscribeWeekly(loadData);
    const unsubIntensive = dbService.subscribeIntensive(loadData);
    const unsubAuth = adminAuthService.subscribe(() => {
      setCurrentAdmin(adminAuthService.getCurrentSession());
    });
    return () => {
      unsubWeekly();
      unsubIntensive();
      unsubAuth();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = adminAuthService.login(loginEmail, loginPassword);
    if (res.success && res.user) {
      setCurrentAdmin(res.user);
      setLoginPassword('');
      showCopyToast(`Welcome back, ${res.user.name}`);
    } else {
      setLoginError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    setCurrentAdmin(null);
    showCopyToast('Signed out of Admin portal');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError(null);
    setChangePasswordSuccess(null);

    if (!currentAdmin) return;
    if (newPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordError('New password and confirm password do not match.');
      return;
    }

    const res = adminAuthService.changePassword(
      currentAdmin.email,
      oldPassword,
      newPassword
    );
    if (res.success) {
      setChangePasswordSuccess('Password updated successfully! Please keep it safe.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsChangePasswordOpen(false);
        setChangePasswordSuccess(null);
      }, 2200);
    } else {
      setChangePasswordError(res.error || 'Failed to update password.');
    }
  };

  const handleQuickFillLogin = (email: string) => {
    setLoginEmail(email);
    setLoginPassword('changed123$');
    setLoginError(null);
  };

  const showCopyToast = (text: string) => {
    setCopiedNotice(text);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  // -------------------------------------------------------------
  // WEEKLY SATURDAY MASTERCLASS LOGIC
  // -------------------------------------------------------------
  const uniqueWeeklyDates = Array.from(new Set(weeklyList.map((item) => item.eventDate))).filter(Boolean);

  const filteredWeekly = weeklyList.filter((item) => {
    const matchesSearch =
      weeklySearch === '' ||
      item.name.toLowerCase().includes(weeklySearch.toLowerCase()) ||
      item.email.toLowerCase().includes(weeklySearch.toLowerCase()) ||
      item.phone.includes(weeklySearch) ||
      item.id.toLowerCase().includes(weeklySearch.toLowerCase()) ||
      item.role.toLowerCase().includes(weeklySearch.toLowerCase());

    const matchesDate = weeklyDateFilter === 'all' || item.eventDate === weeklyDateFilter;

    const matchesWa =
      weeklyWaFilter === 'all' ||
      (weeklyWaFilter === 'added' && item.addedToWhatsAppGroup) ||
      (weeklyWaFilter === 'pending' && !item.addedToWhatsAppGroup);

    return matchesSearch && matchesDate && matchesWa;
  });

  const toggleSelectWeekly = (id: string) => {
    setSelectedWeeklyIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllWeekly = () => {
    if (selectedWeeklyIds.length === filteredWeekly.length) {
      setSelectedWeeklyIds([]);
    } else {
      setSelectedWeeklyIds(filteredWeekly.map((item) => item.id));
    }
  };

  const handleCopyWeeklyPhones = () => {
    const selectedItems = weeklyList.filter((item) => selectedWeeklyIds.includes(item.id));
    if (selectedItems.length === 0) return;
    const phoneList = selectedItems.map((item) => item.phone.trim()).join(', ');
    navigator.clipboard.writeText(phoneList);
    showCopyToast(`Copied ${selectedItems.length} phone numbers`);
  };

  // 1.4: Admin option to add selected phone numbers to 'Announcements @BuildMinds.co.in' on 9886558433
  const handleAddToAnnouncementsWhatsApp = () => {
    const selectedItems = weeklyList.filter((item) => selectedWeeklyIds.includes(item.id));
    if (selectedItems.length === 0) return;

    const formattedList = selectedItems
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.phone}) — ${item.eventDate}`)
      .join('\n');

    const message = `*Action: Add to WhatsApp Group 'Announcements @BuildMinds.co.in'* 📢\n\n*Target Group Admin:* Mohammed Jameel (+91 9886558433)\n*Batch Date:* ${weeklyDateFilter === 'all' ? 'Weekend Masterclasses' : weeklyDateFilter}\n*Total Candidates:* ${selectedItems.length}\n\n*Selected Candidates:*\n${formattedList}\n\n_Auto-compiled from Build Minds Admin Command Center_`;

    const waUrl = `https://wa.me/919886558433?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Mark as added in light database
    dbService.setWeeklyWhatsAppStatus(selectedWeeklyIds, true);
    showCopyToast(`Opening WhatsApp for ${selectedItems.length} contacts & marked added!`);
  };

  const handleDeleteWeekly = (id: string) => {
    if (window.confirm('Delete this registration from the database?')) {
      dbService.deleteWeeklyRegistration(id);
      setSelectedWeeklyIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // -------------------------------------------------------------
  // INTENSIVE PROGRAM LOGIC
  // -------------------------------------------------------------
  const uniqueCohortDates = Array.from(new Set(intensiveList.map((item) => item.cohortDate))).filter(Boolean);
  const uniqueReferralChannels = Array.from(new Set(intensiveList.map((item) => item.referralChannel))).filter(Boolean);

  const filteredIntensive = intensiveList.filter((item) => {
    const matchesSearch =
      intensiveSearch === '' ||
      item.fullName.toLowerCase().includes(intensiveSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(intensiveSearch.toLowerCase()) ||
      item.phone.includes(intensiveSearch) ||
      item.utrNumber.toLowerCase().includes(intensiveSearch.toLowerCase()) ||
      item.id.toLowerCase().includes(intensiveSearch.toLowerCase());

    const matchesCohort = cohortDateFilter === 'all' || item.cohortDate === cohortDateFilter;
    const matchesReferral = referralFilter === 'all' || item.referralChannel === referralFilter;

    const matchesUtr =
      utrStatusFilter === 'all' ||
      (utrStatusFilter === 'verified' && item.utrVerified) ||
      (utrStatusFilter === 'pending' && !item.utrVerified);

    return matchesSearch && matchesCohort && matchesReferral && matchesUtr;
  });

  const toggleSelectIntensive = (id: string) => {
    setSelectedIntensiveIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllIntensive = () => {
    if (selectedIntensiveIds.length === filteredIntensive.length) {
      setSelectedIntensiveIds([]);
    } else {
      setSelectedIntensiveIds(filteredIntensive.map((item) => item.id));
    }
  };

  const handleCopyIntensivePhones = () => {
    const selectedItems = intensiveList.filter((item) => selectedIntensiveIds.includes(item.id));
    if (selectedItems.length === 0) return;
    const phoneList = selectedItems.map((item) => item.phone.trim()).join(', ');
    navigator.clipboard.writeText(phoneList);
    showCopyToast(`Copied ${selectedItems.length} phone numbers`);
  };

  // 1.4: Admin option to add selected phone numbers to 'Cohort3@BuildMinds.co.in' on 9886558433
  const handleAddToCohortWhatsApp = () => {
    const selectedItems = intensiveList.filter((item) => selectedIntensiveIds.includes(item.id));
    if (selectedItems.length === 0) return;

    const formattedList = selectedItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.fullName} (${item.phone}) — UTR: ${item.utrNumber} [${item.utrVerified ? 'VERIFIED' : 'PENDING'}] — ${item.referralChannel}`
      )
      .join('\n');

    const message = `*Action: Add to WhatsApp Group 'Cohort3@BuildMinds.co.in'* 🚀\n\n*Target Group Admin:* Mohammed Jameel (+91 9886558433)\n*Cohort Commencing:* ${cohortDateFilter === 'all' ? AGENT_BUILDER_INTENSIVE.startDate : cohortDateFilter}\n*Total Fellows:* ${selectedItems.length}\n\n*Fellow Details:*\n${formattedList}\n\n_Auto-compiled from Build Minds Admin Command Center_`;

    const waUrl = `https://wa.me/919886558433?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Mark as added in light database
    dbService.setIntensiveWhatsAppStatus(selectedIntensiveIds, true);
    showCopyToast(`Opening WhatsApp for ${selectedItems.length} fellows & marked added!`);
  };

  const handleQuickVerifyUtr = (item: IntensiveRegistration) => {
    const newStatus = !item.utrVerified;
    dbService.updateIntensiveRegistration(item.id, {
      utrVerified: newStatus,
      status: newStatus ? 'confirmed' : 'pending_verification'
    });
    showCopyToast(`UTR ${newStatus ? 'Confirmed' : 'Marked Pending'} for ${item.fullName}`);
  };

  const handleDeleteIntensive = (id: string) => {
    if (window.confirm('Delete this intensive enrollment from the database?')) {
      dbService.deleteIntensiveRegistration(id);
      setSelectedIntensiveIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIntensive) return;

    dbService.updateIntensiveRegistration(editingIntensive.id, {
      fullName: editingIntensive.fullName,
      email: editingIntensive.email,
      phone: editingIntensive.phone,
      learningPath: editingIntensive.learningPath,
      cohortDate: editingIntensive.cohortDate,
      utrNumber: editingIntensive.utrNumber,
      utrVerified: editingIntensive.utrVerified,
      status: editingIntensive.utrVerified ? 'confirmed' : editingIntensive.status,
      referralChannel: editingIntensive.referralChannel,
      adminNotes: editingIntensive.adminNotes
    });

    setEditingIntensive(null);
    showCopyToast('Participant updated and saved to database!');
  };

  const handleCreateParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParticipant.fullName || !newParticipant.email || !newParticipant.phone) {
      alert('Please enter Name, Email, and Phone');
      return;
    }

    dbService.saveIntensiveRegistration({
      fullName: newParticipant.fullName,
      email: newParticipant.email,
      phone: newParticipant.phone,
      program: newParticipant.program,
      learningPath: newParticipant.learningPath,
      cohortDate: newParticipant.cohortDate,
      experienceLevel: newParticipant.experienceLevel,
      amountPaid: Number(newParticipant.amountPaid),
      paymentMode: newParticipant.paymentMode,
      utrNumber: newParticipant.utrNumber || 'MANUAL-ENTRY',
      utrVerified: newParticipant.utrVerified,
      status: newParticipant.utrVerified ? 'confirmed' : 'pending_verification',
      referralChannel: newParticipant.referralChannel,
      adminNotes: newParticipant.adminNotes
    });

    setIsAddModalOpen(false);
    setNewParticipant({
      fullName: '',
      email: '',
      phone: '',
      program: AGENT_BUILDER_INTENSIVE.title,
      learningPath: 'Enterprise Agent Systems Architect',
      cohortDate: AGENT_BUILDER_INTENSIVE.startDate,
      experienceLevel: 'intermediate',
      amountPaid: 6000,
      paymentMode: 'UPI QR Direct Transfer',
      utrNumber: '',
      utrVerified: false,
      referralChannel: 'LinkedIn',
      adminNotes: ''
    });
    showCopyToast('New participant added to database!');
  };

  // Referral breakdown count
  const referralCounts = uniqueReferralChannels.map((channel) => ({
    channel,
    count: intensiveList.filter((item) => item.referralChannel === channel).length
  }));

  const totalRevenue = intensiveList
    .filter((i) => i.utrVerified)
    .reduce((acc, curr) => acc + (curr.amountPaid || 6000), 0);

  const pendingUtrs = intensiveList.filter((i) => !i.utrVerified).length;

  // 1.1 & 1.2: If not logged in, display the dedicated Admin Login Portal
  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-[#0B131B] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
        {/* Top Bar with Back to Public Website */}
        <div className="max-w-md w-full mx-auto flex items-center justify-between pb-2">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-[#162332] px-3.5 py-2 rounded-xl border border-[#25374C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A1E]" />
            <span>Back to Public Website</span>
          </button>

          <span className="text-[10px] font-mono text-[#D98A1E] font-bold bg-[#D98A1E]/10 border border-[#D98A1E]/30 px-3 py-1 rounded-full uppercase tracking-wider">
            RESTRICTED ADMIN URL
          </span>
        </div>

        {/* Central Sign-In Card */}
        <div className="max-w-md w-full mx-auto bg-[#162332] border border-[#25374C] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0B131B] border border-[#25374C] text-[#D98A1E] shadow-inner mx-auto mb-1">
              <Lock className="w-7 h-7 text-[#D98A1E]" />
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#D98A1E]/15 border border-[#D98A1E]/30 text-[#D98A1E] text-[10px] font-mono font-bold uppercase tracking-wider">
              Build Minds Command Center
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal Sign-In</h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Sign in with your authorized administrator credentials to manage masterclass registrations, cohort fellows, offline UTR verification, and WhatsApp groups.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{loginError}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Administrator Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="jameel.outskill@gmail.com or naveed.ks@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D98A1E]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  Default: changed123$
                </span>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D98A1E]"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-sm rounded-xl transition shadow-lg shadow-[#D98A1E]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In to Admin Console</span>
            </button>
          </form>

          {/* Quick Credential Presets */}
          <div className="pt-4 border-t border-[#25374C] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">
                1.2: Authorized Admin Logins
              </span>
              <span className="font-mono text-[#D98A1E]">Default: changed123$</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFillLogin('jameel.outskill@gmail.com')}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B131B] hover:bg-[#142232] border border-[#25374C] hover:border-[#D98A1E]/50 transition flex items-center justify-between text-xs cursor-pointer group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-[#D98A1E] transition">
                    Mohammed Jameel
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    jameel.outskill@gmail.com
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2 py-1 rounded">
                  Quick Fill
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFillLogin('naveed.ks@gmail.com')}
                className="w-full text-left p-2.5 rounded-xl bg-[#0B131B] hover:bg-[#142232] border border-[#25374C] hover:border-[#D98A1E]/50 transition flex items-center justify-between text-xs cursor-pointer group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-[#D98A1E] transition">
                    Naveed KS
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    naveed.ks@gmail.com
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#D98A1E] bg-[#D98A1E]/10 px-2 py-1 rounded">
                  Quick Fill
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 pt-4">
          Build Minds AI Agent Engineering Fellowship • Internal System Portal
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B131B] text-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {copiedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#D98A1E] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" />
          <span>{copiedNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#162332] border border-[#25374C] shadow-2xl">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B131B] border border-[#25374C] text-[11px] font-mono font-bold text-[#D98A1E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>BUILD MINDS • ADMIN COMMAND CENTER</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
                <UserCheck className="w-3 h-3" />
                <span>Logged in: {currentAdmin.name}</span>
                <span className="font-mono text-slate-400 text-[10px]">({currentAdmin.email})</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Admissions, Registrations & Offline Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage Weekend Live Builds, 14-Day Cohorts, Referral Channels, UTR Confirmations & WhatsApp Groups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                const url = `${window.location.origin}/admin`;
                navigator.clipboard.writeText(url);
                showCopyToast('Admin Portal URL Copied!');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0B131B] hover:bg-[#1a293b] border border-[#25374C] text-slate-300 px-3.5 py-2.5 rounded-xl transition cursor-pointer"
              title="Copy direct Admin URL"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D98A1E]" />
              <span>Share Admin URL</span>
            </button>

            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0B131B] hover:bg-[#1a293b] border border-[#25374C] text-slate-300 px-3 py-2.5 rounded-xl transition cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D98A1E]" />
              <span>Sync</span>
            </button>

            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0B131B] hover:bg-[#1a293b] border border-[#25374C] text-[#D98A1E] px-3.5 py-2.5 rounded-xl transition cursor-pointer"
              title="1.3: Change password for currently logged-in admin"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3.5 py-2.5 rounded-xl transition cursor-pointer"
              title="Sign out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#D98A1E] hover:bg-[#e7992c] text-white px-4 py-2.5 rounded-xl transition cursor-pointer shadow-md shadow-[#D98A1E]/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Saturday Masterclass
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">{weeklyList.length}</div>
            <span className="text-[11px] text-[#D98A1E] font-medium block">
              Free 3-Hour live attendees
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Intensive Fellows
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">{intensiveList.length}</div>
            <span className="text-[11px] text-slate-400 block">
              Across all dynamic cohorts
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Confirmed Fees (UTR Verified)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              ₹{totalRevenue.toLocaleString()} INR
            </div>
            <span className="text-[11px] text-emerald-400/80 block">
              {intensiveList.filter((i) => i.utrVerified).length} verified payments
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pending UTR Verifications
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{pendingUtrs}</div>
            <span className="text-[11px] text-amber-400/80 block">
              Requires offline bank check
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#25374C] gap-3">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`pb-3.5 px-4 text-sm font-bold flex items-center gap-2 cursor-pointer transition border-b-2 ${
              activeTab === 'weekly'
                ? 'border-[#D98A1E] text-[#D98A1E]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>1. Build Your First Agent — Live (Saturday Masterclasses)</span>
            <span className="text-xs bg-[#0B131B] px-2 py-0.5 rounded-full font-mono">
              {weeklyList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('intensive')}
            className={`pb-3.5 px-4 text-sm font-bold flex items-center gap-2 cursor-pointer transition border-b-2 ${
              activeTab === 'intensive'
                ? 'border-[#D98A1E] text-[#D98A1E]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. The Agent Builder Intensive (14-Day Cohorts)</span>
            <span className="text-xs bg-[#0B131B] px-2 py-0.5 rounded-full font-mono">
              {intensiveList.length}
            </span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: WEEKLY SATURDAY MASTERCLASS WORKSPACE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'weekly' && (
          <div className="space-y-5 animate-in fade-in">
            {/* Control Bar: Filters & Search */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative min-w-[220px] max-w-xs flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, phone, email, pass ID…"
                    value={weeklySearch}
                    onChange={(e) => setWeeklySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                {/* 1.5: VIEW by Weekend Date */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Weekend Date:</span>
                  </span>
                  <select
                    value={weeklyDateFilter}
                    onChange={(e) => setWeeklyDateFilter(e.target.value)}
                    className="bg-[#0B131B] border border-[#25374C] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D98A1E]"
                  >
                    <option value="all">All Dates ({weeklyList.length})</option>
                    {uniqueWeeklyDates.map((date) => (
                      <option key={date} value={date}>
                        {date} ({weeklyList.filter((i) => i.eventDate === date).length})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by WhatsApp Group Status */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Group Status:</span>
                  <select
                    value={weeklyWaFilter}
                    onChange={(e) => setWeeklyWaFilter(e.target.value as any)}
                    className="bg-[#0B131B] border border-[#25374C] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D98A1E]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending Add</option>
                    <option value="added">Added to Group</option>
                  </select>
                </div>
              </div>

              {/* 1.4: Bulk WhatsApp Group Action */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyWeeklyPhones}
                  disabled={selectedWeeklyIds.length === 0}
                  className="px-3 py-2 rounded-xl bg-[#0B131B] hover:bg-[#1c2c3d] disabled:opacity-40 disabled:cursor-not-allowed border border-[#25374C] text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                  title="Copy comma-separated phone numbers"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>Copy Phones ({selectedWeeklyIds.length})</span>
                </button>

                <button
                  onClick={handleAddToAnnouncementsWhatsApp}
                  disabled={selectedWeeklyIds.length === 0}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-[#25D366]/20"
                  title="Opens WhatsApp chat to Mohammed Jameel (+91 9886558433) with compiled list to add to 'Announcements @BuildMinds.co.in'"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Add Selected to 'Announcements @BuildMinds.co.in' Group</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-[#162332] border border-[#25374C] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0B131B] text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-[#25374C]">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            filteredWeekly.length > 0 &&
                            selectedWeeklyIds.length === filteredWeekly.length
                          }
                          onChange={selectAllWeekly}
                          className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                        />
                      </th>
                      <th className="p-3.5">Pass Serial</th>
                      <th className="p-3.5">Participant Details</th>
                      <th className="p-3.5">WhatsApp / Phone</th>
                      <th className="p-3.5">Role / Focus</th>
                      <th className="p-3.5">Weekend Date</th>
                      <th className="p-3.5">Group Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25374C]/60">
                    {filteredWeekly.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          No registrations found for this filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredWeekly.map((item) => {
                        const isSelected = selectedWeeklyIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-[#1a2b3d]/60 transition ${
                              isSelected ? 'bg-[#D98A1E]/5' : ''
                            }`}
                          >
                            <td className="p-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectWeekly(item.id)}
                                className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                              />
                            </td>
                            <td className="p-3.5 font-mono font-bold text-[#D98A1E]">
                              {item.id}
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-white text-sm">{item.name}</div>
                              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span>{item.email}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:underline"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="w-3 h-3 text-emerald-400" />
                                <span>{item.phone}</span>
                              </a>
                            </td>
                            <td className="p-3.5 text-slate-300">{item.role}</td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-md bg-[#0B131B] border border-[#25374C] font-mono text-slate-200">
                                {item.eventDate}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {item.addedToWhatsAppGroup ? (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Added</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-amber-500/15 border border-amber-500/30 text-amber-400 font-medium px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  <span>Pending Add</span>
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleDeleteWeekly(item.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#0B131B] transition cursor-pointer"
                                title="Delete record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: THE AGENT BUILDER INTENSIVE WORKSPACE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'intensive' && (
          <div className="space-y-5 animate-in fade-in">
            {/* Control Bar: Filters & Actions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#162332] border border-[#25374C] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative min-w-[200px] max-w-xs flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, phone, UTR, Fellow ID…"
                    value={intensiveSearch}
                    onChange={(e) => setIntensiveSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                {/* 1.5: VIEW by Cohort Date */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Cohort Date:</span>
                  </span>
                  <select
                    value={cohortDateFilter}
                    onChange={(e) => setCohortDateFilter(e.target.value)}
                    className="bg-[#0B131B] border border-[#25374C] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D98A1E]"
                  >
                    <option value="all">All Cohorts ({intensiveList.length})</option>
                    {uniqueCohortDates.map((date) => (
                      <option key={date} value={date}>
                        {date} ({intensiveList.filter((i) => i.cohortDate === date).length})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 1.8: VIEW Candidates per Referral Channel */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#D98A1E]" />
                    <span>Referral Channel:</span>
                  </span>
                  <select
                    value={referralFilter}
                    onChange={(e) => setReferralFilter(e.target.value)}
                    className="bg-[#0B131B] border border-[#25374C] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D98A1E]"
                  >
                    <option value="all">All Channels ({intensiveList.length})</option>
                    {uniqueReferralChannels.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel} ({intensiveList.filter((i) => i.referralChannel === channel).length})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by UTR Verification Status */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">UTR Status:</span>
                  <select
                    value={utrStatusFilter}
                    onChange={(e) => setUtrStatusFilter(e.target.value as any)}
                    className="bg-[#0B131B] border border-[#25374C] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D98A1E]"
                  >
                    <option value="all">All UTRs</option>
                    <option value="verified">Verified / Confirmed</option>
                    <option value="pending">Pending Offline Verification</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-[#D98A1E]/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Participant</span>
                </button>

                <button
                  onClick={handleCopyIntensivePhones}
                  disabled={selectedIntensiveIds.length === 0}
                  className="px-3 py-2 rounded-xl bg-[#0B131B] hover:bg-[#1c2c3d] disabled:opacity-40 disabled:cursor-not-allowed border border-[#25374C] text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                  title="Copy comma-separated phones"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D98A1E]" />
                  <span>Copy Phones ({selectedIntensiveIds.length})</span>
                </button>

                {/* 1.4: Add selected phone numbers to 'Cohort3@BuildMinds.co.in' on 9886558433 */}
                <button
                  onClick={handleAddToCohortWhatsApp}
                  disabled={selectedIntensiveIds.length === 0}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-[#25D366]/20"
                  title="Opens WhatsApp chat to Mohammed Jameel (+91 9886558433) with compiled list to add to 'Cohort3@BuildMinds.co.in'"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Add Selected to 'Cohort3@BuildMinds.co.in' Group</span>
                </button>
              </div>
            </div>

            {/* 1.8: Quick Referral Distribution Summary Strip */}
            <div className="p-3.5 rounded-2xl bg-[#162332] border border-[#25374C] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5 text-[#D98A1E]" />
                <span>Referral Breakdown:</span>
              </span>
              {referralCounts.map((ref) => (
                <button
                  key={ref.channel}
                  onClick={() => setReferralFilter(ref.channel)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer ${
                    referralFilter === ref.channel
                      ? 'bg-[#D98A1E] text-white border-[#D98A1E]'
                      : 'bg-[#0B131B] text-slate-300 border-[#25374C] hover:border-[#D98A1E]/50'
                  }`}
                >
                  <span>{ref.channel}:</span> <strong className="text-white ml-0.5">{ref.count}</strong>
                </button>
              ))}
              {referralFilter !== 'all' && (
                <button
                  onClick={() => setReferralFilter('all')}
                  className="text-[11px] text-[#D98A1E] underline ml-2 cursor-pointer font-bold"
                >
                  Clear Channel Filter
                </button>
              )}
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-[#162332] border border-[#25374C] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0B131B] text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-[#25374C]">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            filteredIntensive.length > 0 &&
                            selectedIntensiveIds.length === filteredIntensive.length
                          }
                          onChange={selectAllIntensive}
                          className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                        />
                      </th>
                      <th className="p-3.5">Fellow ID</th>
                      <th className="p-3.5">Candidate Details</th>
                      <th className="p-3.5">Track & Cohort</th>
                      <th className="p-3.5">UTR Number & Offline Verification</th>
                      <th className="p-3.5">Referral Channel</th>
                      <th className="p-3.5">WhatsApp Group</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25374C]/60">
                    {filteredIntensive.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          No cohort registrations found matching current filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredIntensive.map((item) => {
                        const isSelected = selectedIntensiveIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-[#1a2b3d]/60 transition ${
                              isSelected ? 'bg-[#D98A1E]/5' : ''
                            }`}
                          >
                            <td className="p-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectIntensive(item.id)}
                                className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                              />
                            </td>
                            <td className="p-3.5 font-mono font-bold text-[#D98A1E]">
                              {item.id}
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold text-white text-sm">{item.fullName}</div>
                              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span>{item.email}</span>
                              </div>
                              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-emerald-400" />
                                <a
                                  href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline font-mono"
                                >
                                  {item.phone}
                                </a>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <div className="font-medium text-slate-200">{item.learningPath}</div>
                              <div className="text-[#D98A1E] font-mono text-[11px] mt-0.5">
                                {item.cohortDate}
                              </div>
                            </td>
                            {/* 1.6: UTR Number & Offline Verification */}
                            <td className="p-3.5">
                              <div className="font-mono text-white text-xs font-bold">
                                {item.utrNumber}
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                {item.utrVerified ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>UTR Confirmed</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] bg-amber-500/15 border border-amber-500/40 text-amber-400 font-bold px-2 py-0.5 rounded-md">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Pending Verification</span>
                                  </span>
                                )}
                                <button
                                  onClick={() => handleQuickVerifyUtr(item)}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer border ${
                                    item.utrVerified
                                      ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600'
                                  }`}
                                  title="Toggle offline UTR verification"
                                >
                                  {item.utrVerified ? 'Revoke' : 'Confirm Offline'}
                                </button>
                              </div>
                            </td>
                            {/* 1.7: Referral De-markation */}
                            <td className="p-3.5">
                              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0B131B] border border-[#25374C] text-[#D98A1E]">
                                {item.referralChannel || 'Website Direct'}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {item.addedToWhatsAppGroup ? (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>In Group</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-amber-500/15 border border-amber-500/30 text-amber-400 font-medium px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  <span>Pending</span>
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingIntensive({ ...item })}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B131B] transition cursor-pointer"
                                  title="Edit candidate data and referral channel"
                                >
                                  <Edit2 className="w-4 h-4 text-[#D98A1E]" />
                                </button>
                                <button
                                  onClick={() => handleDeleteIntensive(item.id)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#0B131B] transition cursor-pointer"
                                  title="Delete enrollment"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: ADD PARTICIPANT MANUALLY */}
        {/* ------------------------------------------------------------- */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-[#162332] border border-[#25374C] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#25374C] pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D98A1E]" />
                  <span>Add Intensive Participant Manually</span>
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B131B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateParticipant} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate full name"
                    value={newParticipant.fullName}
                    onChange={(e) =>
                      setNewParticipant({ ...newParticipant, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={newParticipant.email}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98865 58433"
                      value={newParticipant.phone}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cohort Start Date</label>
                    <select
                      value={newParticipant.cohortDate}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, cohortDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    >
                      <option value={AGENT_BUILDER_INTENSIVE.startDate}>
                        {AGENT_BUILDER_INTENSIVE.startDate} (Upcoming)
                      </option>
                      <option value="02 Nov 2026">02 Nov 2026</option>
                      <option value="23 Nov 2026">23 Nov 2026</option>
                      <option value="14 Dec 2026">14 Dec 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      1.7: Referral Channel
                    </label>
                    <select
                      value={newParticipant.referralChannel}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, referralChannel: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    >
                      {REFERRAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      1.6: UPI Reference / UTR Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 428990112345"
                      value={newParticipant.utrNumber}
                      onChange={(e) =>
                        setNewParticipant({ ...newParticipant, utrNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E] font-mono"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newParticipant.utrVerified}
                        onChange={(e) =>
                          setNewParticipant({
                            ...newParticipant,
                            utrVerified: e.target.checked
                          })
                        }
                        className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                      />
                      <span className="font-bold text-white">UTR Confirmed (Offline Verified)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Admin Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Offline verification notes, merchant account details…"
                    value={newParticipant.adminNotes}
                    onChange={(e) =>
                      setNewParticipant({ ...newParticipant, adminNotes: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#25374C]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#0B131B] hover:bg-[#1f2d3d] text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold cursor-pointer shadow-lg shadow-[#D98A1E]/20"
                  >
                    Save to Database
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: 1.6 EDIT PARTICIPANT & OFFLINE UTR VERIFICATION */}
        {/* ------------------------------------------------------------- */}
        {editingIntensive && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-[#162332] border border-[#25374C] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#25374C] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-[#D98A1E]" />
                    <span>Edit Participant & UTR Verification</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Fellow ID: {editingIntensive.id}
                  </span>
                </div>
                <button
                  onClick={() => setEditingIntensive(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B131B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={editingIntensive.fullName}
                    onChange={(e) =>
                      setEditingIntensive({
                        ...editingIntensive,
                        fullName: e.target.value
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={editingIntensive.email}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          email: e.target.value
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={editingIntensive.phone}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          phone: e.target.value
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cohort Start Date</label>
                    <input
                      type="text"
                      value={editingIntensive.cohortDate}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          cohortDate: e.target.value
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      1.7: Referral Channel De-markation
                    </label>
                    <select
                      value={editingIntensive.referralChannel}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          referralChannel: e.target.value
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    >
                      {REFERRAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 1.6: Offline UTR Verification Panel */}
                <div className="p-4 rounded-2xl bg-[#0B131B] border-2 border-[#D98A1E]/40 space-y-3">
                  <span className="text-[11px] font-bold text-[#D98A1E] uppercase tracking-wider block">
                    1.6: Offline UTR Verification Check
                  </span>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      UPI Reference / UTR Number
                    </label>
                    <input
                      type="text"
                      value={editingIntensive.utrNumber}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          utrNumber: e.target.value
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#162332] border border-[#25374C] text-white font-mono font-bold"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#162332] border border-[#25374C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingIntensive.utrVerified}
                      onChange={(e) =>
                        setEditingIntensive({
                          ...editingIntensive,
                          utrVerified: e.target.checked
                        })
                      }
                      className="rounded border-slate-700 text-[#D98A1E] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">
                        Confirm & Verify UTR Offline
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Check bank statement / SBI merchant app for reference match.
                      </span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Admin Notes</label>
                  <textarea
                    rows={2}
                    value={editingIntensive.adminNotes || ''}
                    onChange={(e) =>
                      setEditingIntensive({
                        ...editingIntensive,
                        adminNotes: e.target.value
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#25374C]">
                  <button
                    type="button"
                    onClick={() => setEditingIntensive(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#0B131B] hover:bg-[#1f2d3d] text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold cursor-pointer shadow-lg shadow-[#D98A1E]/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ------------------------------------------------------------- */}
        {/* MODAL: 1.3 CHANGE PASSWORD */}
        {/* ------------------------------------------------------------- */}
        {isChangePasswordOpen && currentAdmin && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-[#162332] border border-[#25374C] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#25374C] pb-4">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#D98A1E]" />
                  <h3 className="text-xl font-bold text-white">Change Admin Password</h3>
                </div>
                <button
                  onClick={() => {
                    setIsChangePasswordOpen(false);
                    setChangePasswordError(null);
                    setChangePasswordSuccess(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B131B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#0B131B] border border-[#25374C] text-xs space-y-1">
                <div className="text-slate-400">Account:</div>
                <div className="font-bold text-white text-sm">{currentAdmin.name}</div>
                <div className="font-mono text-[#D98A1E] text-xs">{currentAdmin.email}</div>
              </div>

              {changePasswordError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{changePasswordError}</span>
                </div>
              )}

              {changePasswordSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{changePasswordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPass ? 'text' : 'password'}
                      required
                      placeholder="Enter current password (e.g. changed123$)"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    New Password * (Min 6 characters)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      placeholder="Enter new strong password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] text-white focus:outline-none focus:border-[#D98A1E]"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#25374C]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangePasswordOpen(false);
                      setChangePasswordError(null);
                      setChangePasswordSuccess(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0B131B] hover:bg-[#1f2d3d] text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-white font-bold cursor-pointer shadow-lg shadow-[#D98A1E]/20"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
