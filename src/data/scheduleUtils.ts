/**
 * Schedule & Cohort Automation Utilities for Build Minds
 *
 * Rules:
 * 1. The paid program 'The Agent Builder Intensive' start dates cascade after 3 Mondays
 *    (i.e. on the 4th Monday / every 28 days) calculated from a given reference Cohort start Monday.
 *    Reference cohort: Cohort 2 in progress starting 21 Sep 2026.
 * 2. If today's date is past the scheduled cohort start date, the next upcoming batch launch
 *    dates are automatically calculated and reflected everywhere on the website.
 * 3. The free program 'Build Your First Agent — Live' has one combined session every Saturday (11:00 AM – 2:00 PM IST).
 */

export interface CohortScheduleConfig {
  /** The reference cohort number (e.g. 2 for the 21 Sep 2026 cohort) */
  referenceCohortNumber: number;
  /** ISO date string of reference Monday: 'YYYY-MM-DD' */
  referenceCohortMonday: string;
  /** Cadence in weeks: 4 weeks (cascade after 3 Mondays = on the 4th Monday = 28 days) */
  cycleWeeks: number;
}

export const COHORT_SCHEDULE_CONFIG: CohortScheduleConfig = {
  referenceCohortNumber: 2,
  referenceCohortMonday: '2026-09-21', // Cohort 2 reference start Monday
  cycleWeeks: 4, // 28 days
};

export interface CohortDetails {
  cohortNumber: number;
  cohortLabel: string;
  startDate: Date;
  startDateFormatted: string; // e.g. "19 Oct 2026"
  shortDate: string; // e.g. "19 Oct"
  fullBatchLabel: string; // e.g. "Cohort 3 • 19 Oct 2026"
  badgeText: string; // e.g. "Cohort 3 Batch"
}

export interface CohortScheduleResult {
  /** The next upcoming cohort accepting admissions */
  upcomingCohort: CohortDetails;
  /** The cohort currently in progress */
  inProgressCohort: CohortDetails;
  /** The cohort following the upcoming one (for preview) */
  subsequentCohort: CohortDetails;
  /** Next upcoming Saturday workshop date */
  upcomingSaturday: {
    date: Date;
    formatted: string;
    shortFormatted: string;
    timeSlot: string;
  };
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formats a Date object to "DD Mon YYYY" (e.g. "19 Oct 2026")
 */
export function formatCohortDate(date: Date): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Formats a Date object to "DD Mon" (e.g. "19 Oct")
 */
export function formatShortDate(date: Date): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  return `${day} ${month}`;
}

/**
 * Adds a specified number of days to a Date, normalizing time to midnight
 */
export function addDays(baseDate: Date, days: number): Date {
  const result = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + days, 0, 0, 0, 0);
  return result;
}

/**
 * Parse 'YYYY-MM-DD' safely without UTC timezone shift
 */
export function parseIsoDate(isoStr: string): Date {
  const parts = isoStr.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
}

/**
 * Calculates current cohort schedules dynamically.
 * If today's date is past the scheduled cohort start date, advances automatically to the next batch.
 */
export function getCohortSchedule(
  currentDateInput?: Date | string,
  config: CohortScheduleConfig = COHORT_SCHEDULE_CONFIG
): CohortScheduleResult {
  const now = currentDateInput
    ? typeof currentDateInput === 'string'
      ? parseIsoDate(currentDateInput)
      : new Date(currentDateInput)
    : new Date();

  // Normalize today to start of day (midnight)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const cycleDays = config.cycleWeeks * 7; // 28 days
  const referenceDate = parseIsoDate(config.referenceCohortMonday);

  let cohortNum = config.referenceCohortNumber;
  let cohortDate = referenceDate;
  let lastStartedCohort = {
    cohortNumber: cohortNum,
    startDate: cohortDate,
  };

  // If today's date is strictly past the scheduled cohort start date, advance to the next upcoming batch
  while (todayStart.getTime() > cohortDate.getTime()) {
    lastStartedCohort = {
      cohortNumber: cohortNum,
      startDate: cohortDate,
    };
    cohortNum += 1;
    cohortDate = addDays(cohortDate, cycleDays);
  }

  const upcomingDate = cohortDate;
  const subsequentDate = addDays(upcomingDate, cycleDays);

  const formatCohortObj = (num: number, date: Date): CohortDetails => {
    const formatted = formatCohortDate(date);
    const short = formatShortDate(date);
    return {
      cohortNumber: num,
      cohortLabel: `Cohort ${num}`,
      startDate: date,
      startDateFormatted: formatted,
      shortDate: short,
      fullBatchLabel: `Cohort ${num} • ${formatted}`,
      badgeText: `${formatted} Batch`,
    };
  };

  const upcomingCohort = formatCohortObj(cohortNum, upcomingDate);
  const inProgressCohort = formatCohortObj(lastStartedCohort.cohortNumber, lastStartedCohort.startDate);
  const subsequentCohort = formatCohortObj(cohortNum + 1, subsequentDate);

  // Compute next upcoming Saturday
  const dayOfWeek = todayStart.getDay(); // 0: Sun, ..., 6: Sat
  let daysUntilSat = (6 - dayOfWeek + 7) % 7;
  // If today is Saturday and past 2:00 PM (14:00), push to next Saturday
  if (daysUntilSat === 0 && now.getHours() >= 14) {
    daysUntilSat = 7;
  }
  const nextSaturdayDate = addDays(todayStart, daysUntilSat);
  const upcomingSaturday = {
    date: nextSaturdayDate,
    formatted: formatCohortDate(nextSaturdayDate),
    shortFormatted: formatShortDate(nextSaturdayDate),
    timeSlot: '11:00 AM – 2:00 PM IST',
  };

  return {
    upcomingCohort,
    inProgressCohort,
    subsequentCohort,
    upcomingSaturday,
  };
}

// Default computed schedule instance for application-wide consumption
export const CURRENT_SCHEDULE = getCohortSchedule();
export const UPCOMING_COHORT = CURRENT_SCHEDULE.upcomingCohort;
export const IN_PROGRESS_COHORT = CURRENT_SCHEDULE.inProgressCohort;
export const SUBSEQUENT_COHORT = CURRENT_SCHEDULE.subsequentCohort;
export const UPCOMING_SATURDAY = CURRENT_SCHEDULE.upcomingSaturday;
