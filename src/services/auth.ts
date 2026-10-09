/**
 * Admin Authentication & Credentials Service for Build Minds
 *
 * Authorized Admins:
 * 1. jameel.outskill@gmail.com (Mohammed Jameel)
 * 2. naveed.ks@gmail.com (Naveed KS)
 *
 * Default Password: 'changed123$'
 *
 * Features:
 * - Credentials & Password management with persistent storage
 * - Active session tracking
 * - Password modification for logged-in administrators
 */

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  passwordHashOrPlain: string;
  lastLogin?: string;
  passwordChangedAt?: string;
}

const STORAGE_KEY_USERS = 'buildminds_admin_users_v2';
const STORAGE_KEY_SESSION = 'buildminds_admin_session_v2';

const DEFAULT_USERS: Record<string, AdminUser> = {
  'jameel.outskill@gmail.com': {
    email: 'jameel.outskill@gmail.com',
    name: 'Mohammed Jameel',
    role: 'Lead Administrator & Mentor',
    passwordHashOrPlain: 'changed123$'
  },
  'naveed.ks@gmail.com': {
    email: 'naveed.ks@gmail.com',
    name: 'Naveed KS',
    role: 'Co-Founder & Engineering Mentor',
    passwordHashOrPlain: 'changed123$'
  }
};

class AdminAuthService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
        if (!storedUsers) {
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
        } else {
          // Verify both required admin users exist
          const parsed: Record<string, AdminUser> = JSON.parse(storedUsers);
          let modified = false;
          for (const key of Object.keys(DEFAULT_USERS)) {
            if (!parsed[key.toLowerCase()]) {
              parsed[key.toLowerCase()] = DEFAULT_USERS[key];
              modified = true;
            }
          }
          if (modified) {
            localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(parsed));
          }
        }
      }
    } catch (e) {
      console.warn('AdminAuth initialization error:', e);
    }
  }

  private getAllUsers(): Record<string, AdminUser> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY_USERS);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Error fetching admin users:', e);
    }
    return DEFAULT_USERS;
  }

  private saveAllUsers(users: Record<string, AdminUser>) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      }
    } catch (e) {
      console.warn('Error saving admin users:', e);
    }
  }

  public getCurrentSession(): AdminUser | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const sessionEmail = localStorage.getItem(STORAGE_KEY_SESSION);
        if (sessionEmail) {
          const users = this.getAllUsers();
          const user = users[sessionEmail.toLowerCase()];
          if (user) {
            return user;
          }
        }
      }
    } catch (e) {
      console.warn('Error fetching admin session:', e);
    }
    return null;
  }

  public login(
    emailInput: string,
    passwordInput: string
  ): { success: boolean; user?: AdminUser; error?: string } {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email || !password) {
      return { success: false, error: 'Please enter both your Admin email and password.' };
    }

    const users = this.getAllUsers();
    const user = users[email];

    if (!user) {
      return {
        success: false,
        error:
          'Unauthorized email. Admin access is restricted to jameel.outskill@gmail.com and naveed.ks@gmail.com.'
      };
    }

    if (user.passwordHashOrPlain !== password) {
      return {
        success: false,
        error: 'Incorrect password. Default initial password is "changed123$".'
      };
    }

    // Update lastLogin
    user.lastLogin = new Date().toISOString();
    users[email] = user;
    this.saveAllUsers(users);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_SESSION, email);
      }
    } catch (e) {
      console.warn('Error writing admin session:', e);
    }

    this.notify();
    return { success: true, user };
  }

  public logout(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch (e) {
      console.warn('Error clearing admin session:', e);
    }
    this.notify();
  }

  public changePassword(
    emailInput: string,
    currentPasswordInput: string,
    newPasswordInput: string
  ): { success: boolean; error?: string } {
    const email = emailInput.trim().toLowerCase();
    const currentPassword = currentPasswordInput.trim();
    const newPassword = newPasswordInput.trim();

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }

    const users = this.getAllUsers();
    const user = users[email];

    if (!user) {
      return { success: false, error: 'User not found in admin directory.' };
    }

    if (user.passwordHashOrPlain !== currentPassword) {
      return { success: false, error: 'Current password does not match.' };
    }

    user.passwordHashOrPlain = newPassword;
    user.passwordChangedAt = new Date().toISOString();
    users[email] = user;
    this.saveAllUsers(users);

    this.notify();
    return { success: true };
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('AdminAuth listener error:', err);
      }
    });
  }
}

export const adminAuthService = new AdminAuthService();
