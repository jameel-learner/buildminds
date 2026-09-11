export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  type: 'live' | 'workshop' | 'build' | 'mentorship';
  description: string;
}

export interface CurriculumModule {
  id: string;
  week: number;
  title: string;
  summary: string;
  skills: string[];
  lessons: CurriculumLesson[];
  projectTitle: string;
  projectDescription: string;
}

export interface CoursePath {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  targetRole: string;
  prerequisites: string;
  duration: string;
  outcomes: string[];
  tools: string[];
  modules: CurriculumModule[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  location: string;
  experience: string;
  avatar: string;
  bio: string;
  careerHighlights: string[];
  specialties: string[];
  skills: string[];
  rating: number;
  sessionsConducted: number;
  availableSlots: string[];
}

export interface WeeklyEventSession {
  time: string;
  title: string;
  speaker: string;
  speakerRole: string;
  takeaways: string[];
}

export interface StudentEnrollment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  cohortDate: string;
  learningPath: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  primaryGoal: string;
  paymentStatus: 'completed' | 'pending';
  amountPaid: number;
  enrolledAt: string;
}

export type PageRoute =
  | 'home'
  | 'register'
  | 'intensive'
  | 'weekly-event'
  | 'curriculum'
  | 'mentors'
  | 'enrollment';
