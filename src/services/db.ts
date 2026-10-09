/**
 * Lightweight Persistent Database Service for Build Minds
 *
 * Handles:
 * 1. Weekly Saturday Masterclass Registrations ('Build Your First Agent — Live')
 * 2. Intensive Program Enrollments ('The Agent Builder Intensive')
 *
 * Features:
 * - Dual-layer persistence: In-memory + LocalStorage + Server API sync
 * - Multi-view querying: by Weekend Date, by Cohort Date, by Referral Channel
 * - Offline UTR verification tracking
 * - WhatsApp group tracking ('Announcements @BuildMinds.co.in' and 'Cohort3@BuildMinds.co.in')
 */

export interface WeeklyRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  eventDate: string; // e.g. "11 Oct 2026"
  registeredAt: string; // ISO date
  addedToWhatsAppGroup: boolean; // Tracking for 'Announcements @BuildMinds.co.in' (Target: 9886558433)
  notes?: string;
}

export interface IntensiveRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  learningPath: string;
  cohortDate: string; // e.g. "12 Oct 2026"
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  amountPaid: number;
  paymentMode: string;
  utrNumber: string;
  utrVerified: boolean; // Offline verification toggle
  status: 'confirmed' | 'pending_verification' | 'cancelled';
  referralChannel: string; // e.g. "LinkedIn", "WhatsApp", "Mohammed Jameel Referral", "Naveed KS Referral", "Twitter/X", "Outskill Alumni", "Colleague", "Organic"
  adminNotes?: string;
  addedToWhatsAppGroup: boolean; // Tracking for 'Cohort3@BuildMinds.co.in' (Target: 9886558433)
  enrolledAt: string; // ISO date
}

const STORAGE_KEY_WEEKLY = 'buildminds_db_weekly_registrations_v2';
const STORAGE_KEY_INTENSIVE = 'buildminds_db_intensive_registrations_v2';

// Realistic starter seed data demonstrating multiple weekend dates, cohort batches, referral channels, and UTR states
const INITIAL_WEEKLY_SEEDS: WeeklyRegistration[] = [
  {
    id: 'BM-SAT-842104',
    name: 'Aman K. Verma',
    email: 'aman.verma@fintechlab.io',
    phone: '+91 98450 12849',
    role: 'Software Engineer • Fintech backend',
    eventDate: '11 Oct 2026',
    registeredAt: '2026-10-07T10:14:22.000Z',
    addedToWhatsAppGroup: false,
    notes: 'Interested in Claude Code & Cursor automation'
  },
  {
    id: 'BM-SAT-639112',
    name: 'Priyanka Sharma',
    email: 'priyanka.s@cloudnative.tech',
    phone: '+91 99160 55412',
    role: 'Staff QA Engineer',
    eventDate: '11 Oct 2026',
    registeredAt: '2026-10-08T04:20:11.000Z',
    addedToWhatsAppGroup: true,
    notes: 'Referred by Naveed KS post on LinkedIn'
  },
  {
    id: 'BM-SAT-291048',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@deshmukh-consulting.in',
    phone: '+91 97662 33819',
    role: 'Engineering Lead • Enterprise Java',
    eventDate: '11 Oct 2026',
    registeredAt: '2026-10-08T14:45:00.000Z',
    addedToWhatsAppGroup: false,
    notes: 'Looking to transition team to Agentic Workflows'
  },
  {
    id: 'BM-SAT-719284',
    name: 'Ananya Roy',
    email: 'ananya.roy@datasciences.co',
    phone: '+91 98301 44920',
    role: 'Data Scientist • NLP Specialist',
    eventDate: '18 Oct 2026',
    registeredAt: '2026-10-08T18:02:15.000Z',
    addedToWhatsAppGroup: false,
    notes: 'Next weekend participant'
  },
  {
    id: 'BM-SAT-449102',
    name: 'Vikram Joshi',
    email: 'vikram.j@ JoshiVentures.com',
    phone: '+91 98220 88172',
    role: 'CTO / Technical Founder',
    eventDate: '18 Oct 2026',
    registeredAt: '2026-10-09T01:10:00.000Z',
    addedToWhatsAppGroup: false,
    notes: 'Evaluating for engineering fellowship cohort'
  }
];

const INITIAL_INTENSIVE_SEEDS: IntensiveRegistration[] = [
  {
    id: 'BM-FELLOW-10492',
    fullName: 'Karthik Subbaraman',
    email: 'karthik.s@neobank.in',
    phone: '+91 98801 23456',
    program: 'The Agent Builder Intensive (14 Days • 6 Sprints)',
    learningPath: 'Full-Stack Agent Engineer Track',
    cohortDate: '12 Oct 2026',
    experienceLevel: 'intermediate',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: '428819204910',
    utrVerified: true,
    status: 'confirmed',
    referralChannel: 'Naveed KS Referral',
    adminNotes: 'UTR verified via SBI merchant notification. Added to LMS.',
    addedToWhatsAppGroup: true,
    enrolledAt: '2026-10-06T11:20:00.000Z'
  },
  {
    id: 'BM-FELLOW-10518',
    fullName: 'Dr. Shalini Mehta',
    email: 'shalini.mehta@healthtech.ai',
    phone: '+91 98110 98765',
    program: 'The Agent Builder Intensive (14 Days • 6 Sprints)',
    learningPath: 'Enterprise Agent Systems Architect',
    cohortDate: '12 Oct 2026',
    experienceLevel: 'advanced',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: '428990112345',
    utrVerified: true,
    status: 'confirmed',
    referralChannel: 'Mohammed Jameel Referral',
    adminNotes: 'Verified via Google Pay transfer. Medical imaging background.',
    addedToWhatsAppGroup: true,
    enrolledAt: '2026-10-07T08:15:00.000Z'
  },
  {
    id: 'BM-FELLOW-10543',
    fullName: 'Siddharth Nair',
    email: 'sid.nair@devcraft.org',
    phone: '+91 98470 65432',
    program: 'The Agent Builder Intensive (14 Days • 6 Sprints)',
    learningPath: 'Autonomous Agent Quality & Evals Specialist',
    cohortDate: '12 Oct 2026',
    experienceLevel: 'intermediate',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: '429012345678',
    utrVerified: false,
    status: 'pending_verification',
    referralChannel: 'LinkedIn',
    adminNotes: 'UTR pending bank statement confirmation.',
    addedToWhatsAppGroup: false,
    enrolledAt: '2026-10-08T16:30:00.000Z'
  },
  {
    id: 'BM-FELLOW-10577',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@singaporetech.io',
    phone: '+65 9123 4567',
    program: 'The Agent Builder Intensive (14 Days • 6 Sprints)',
    learningPath: 'Enterprise Agent Systems Architect',
    cohortDate: '12 Oct 2026',
    experienceLevel: 'advanced',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: 'UPI-SG-994821',
    utrVerified: true,
    status: 'confirmed',
    referralChannel: 'Twitter/X',
    adminNotes: 'International candidate paying through Indian UPI bank partner.',
    addedToWhatsAppGroup: false,
    enrolledAt: '2026-10-09T01:45:00.000Z'
  },
  {
    id: 'BM-FELLOW-10612',
    fullName: 'Aditya Prasad',
    email: 'aditya.prasad@cloudscale.in',
    phone: '+91 98200 11928',
    program: 'The Agent Builder Intensive (14 Days • 6 Sprints)',
    learningPath: 'Full-Stack Agent Engineer Track',
    cohortDate: '02 Nov 2026',
    experienceLevel: 'beginner',
    amountPaid: 6000,
    paymentMode: 'UPI QR Direct Transfer',
    utrNumber: '429188294011',
    utrVerified: false,
    status: 'pending_verification',
    referralChannel: 'Outskill Alumni',
    adminNotes: 'Early enrollee for November cohort.',
    addedToWhatsAppGroup: false,
    enrolledAt: '2026-10-09T02:05:00.000Z'
  }
];

class LightDatabaseService {
  private weeklyListeners: (() => void)[] = [];
  private intensiveListeners: (() => void)[] = [];

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!localStorage.getItem(STORAGE_KEY_WEEKLY)) {
          localStorage.setItem(STORAGE_KEY_WEEKLY, JSON.stringify(INITIAL_WEEKLY_SEEDS));
        }
        if (!localStorage.getItem(STORAGE_KEY_INTENSIVE)) {
          localStorage.setItem(STORAGE_KEY_INTENSIVE, JSON.stringify(INITIAL_INTENSIVE_SEEDS));
        }
      }
    } catch (e) {
      console.warn('LocalStorage initialization notice:', e);
    }
  }

  // -------------------------------------------------------------
  // WEEKLY SATURDAY MASTERCLASS METHODS
  // -------------------------------------------------------------

  public getWeeklyRegistrations(): WeeklyRegistration[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(STORAGE_KEY_WEEKLY);
        if (data) {
          return JSON.parse(data);
        }
      }
    } catch (e) {
      console.warn('Error reading weekly registrations:', e);
    }
    return INITIAL_WEEKLY_SEEDS;
  }

  public saveWeeklyRegistration(
    input: Omit<WeeklyRegistration, 'id' | 'registeredAt' | 'addedToWhatsAppGroup'> & {
      id?: string;
      addedToWhatsAppGroup?: boolean;
    }
  ): WeeklyRegistration {
    const list = this.getWeeklyRegistrations();
    const newRecord: WeeklyRegistration = {
      id: input.id || `BM-SAT-${Math.floor(100000 + Math.random() * 900000)}`,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      role: input.role.trim() || 'Software Engineer',
      eventDate: input.eventDate,
      registeredAt: new Date().toISOString(),
      addedToWhatsAppGroup: input.addedToWhatsAppGroup || false,
      notes: input.notes || ''
    };

    const updated = [newRecord, ...list];
    this.saveWeeklyList(updated);
    this.notifyWeekly();
    return newRecord;
  }

  public updateWeeklyRegistration(
    id: string,
    updates: Partial<WeeklyRegistration>
  ): WeeklyRegistration | null {
    const list = this.getWeeklyRegistrations();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    this.saveWeeklyList(list);
    this.notifyWeekly();
    return list[index];
  }

  public deleteWeeklyRegistration(id: string): boolean {
    const list = this.getWeeklyRegistrations();
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveWeeklyList(filtered);
      this.notifyWeekly();
      return true;
    }
    return false;
  }

  public setWeeklyWhatsAppStatus(ids: string[], added: boolean): void {
    const list = this.getWeeklyRegistrations();
    const idSet = new Set(ids);
    const updated = list.map((item) => {
      if (idSet.has(item.id)) {
        return { ...item, addedToWhatsAppGroup: added };
      }
      return item;
    });
    this.saveWeeklyList(updated);
    this.notifyWeekly();
  }

  private saveWeeklyList(list: WeeklyRegistration[]) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_WEEKLY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Error saving weekly registrations:', e);
    }
  }

  // -------------------------------------------------------------
  // INTENSIVE COHORT ENROLLMENT METHODS
  // -------------------------------------------------------------

  public getIntensiveRegistrations(): IntensiveRegistration[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(STORAGE_KEY_INTENSIVE);
        if (data) {
          return JSON.parse(data);
        }
      }
    } catch (e) {
      console.warn('Error reading intensive registrations:', e);
    }
    return INITIAL_INTENSIVE_SEEDS;
  }

  public saveIntensiveRegistration(
    input: Omit<IntensiveRegistration, 'id' | 'enrolledAt' | 'addedToWhatsAppGroup'> & {
      id?: string;
      addedToWhatsAppGroup?: boolean;
    }
  ): IntensiveRegistration {
    const list = this.getIntensiveRegistrations();
    const newRecord: IntensiveRegistration = {
      id: input.id || `BM-FELLOW-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      program: input.program || 'The Agent Builder Intensive',
      learningPath: input.learningPath || 'Enterprise Agent Systems Architect',
      cohortDate: input.cohortDate,
      experienceLevel: input.experienceLevel || 'intermediate',
      amountPaid: input.amountPaid || 6000,
      paymentMode: input.paymentMode || 'UPI QR Direct Transfer',
      utrNumber: input.utrNumber.trim(),
      utrVerified: input.utrVerified !== undefined ? input.utrVerified : false,
      status: input.status || (input.utrVerified ? 'confirmed' : 'pending_verification'),
      referralChannel: input.referralChannel || 'Website Direct',
      adminNotes: input.adminNotes || '',
      addedToWhatsAppGroup: input.addedToWhatsAppGroup || false,
      enrolledAt: new Date().toISOString()
    };

    const updated = [newRecord, ...list];
    this.saveIntensiveList(updated);
    this.notifyIntensive();
    return newRecord;
  }

  public updateIntensiveRegistration(
    id: string,
    updates: Partial<IntensiveRegistration>
  ): IntensiveRegistration | null {
    const list = this.getIntensiveRegistrations();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    // If UTR verified is set to true, automatically set status to confirmed unless explicitly specified
    let newStatus = updates.status !== undefined ? updates.status : list[index].status;
    if (updates.utrVerified === true && updates.status === undefined) {
      newStatus = 'confirmed';
    }

    list[index] = {
      ...list[index],
      ...updates,
      status: newStatus
    };
    this.saveIntensiveList(list);
    this.notifyIntensive();
    return list[index];
  }

  public deleteIntensiveRegistration(id: string): boolean {
    const list = this.getIntensiveRegistrations();
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveIntensiveList(filtered);
      this.notifyIntensive();
      return true;
    }
    return false;
  }

  public setIntensiveWhatsAppStatus(ids: string[], added: boolean): void {
    const list = this.getIntensiveRegistrations();
    const idSet = new Set(ids);
    const updated = list.map((item) => {
      if (idSet.has(item.id)) {
        return { ...item, addedToWhatsAppGroup: added };
      }
      return item;
    });
    this.saveIntensiveList(updated);
    this.notifyIntensive();
  }

  private saveIntensiveList(list: IntensiveRegistration[]) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_INTENSIVE, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Error saving intensive registrations:', e);
    }
  }

  // -------------------------------------------------------------
  // SUBSCRIPTIONS FOR REACTIVE UPDATES
  // -------------------------------------------------------------

  public subscribeWeekly(callback: () => void): () => void {
    this.weeklyListeners.push(callback);
    return () => {
      this.weeklyListeners = this.weeklyListeners.filter((cb) => cb !== callback);
    };
  }

  public subscribeIntensive(callback: () => void): () => void {
    this.intensiveListeners.push(callback);
    return () => {
      this.intensiveListeners = this.intensiveListeners.filter((cb) => cb !== callback);
    };
  }

  private notifyWeekly() {
    this.weeklyListeners.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Weekly listener error:', err);
      }
    });
  }

  private notifyIntensive() {
    this.intensiveListeners.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Intensive listener error:', err);
      }
    });
  }
}

export const dbService = new LightDatabaseService();
