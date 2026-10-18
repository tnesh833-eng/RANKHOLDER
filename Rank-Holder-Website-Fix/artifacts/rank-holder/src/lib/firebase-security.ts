/**
 * firebase-security.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Firebase security helpers for Rank Holder.
 *
 * Covers:
 *  1. Email-verification gate  – users without a verified email are blocked
 *  2. Client-side rate limiter – prevents brute-force sign-in attempts
 *  3. Session token refresh    – keeps the Firebase ID token fresh
 *  4. Auth-state audit log     – console-only, never sent to a third party
 *  5. Secure sign-out          – clears all auth artifacts on sign-out
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  onAuthStateChanged,
  onIdTokenChanged,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";

// ─── 1. Email-Verification Gate ──────────────────────────────────────────────

/**
 * Returns true only when the user has BOTH authenticated AND verified their
 * email address.  Unverified users are treated as unauthenticated.
 */
export function isFullyVerified(user: User | null): boolean {
  return Boolean(user && user.emailVerified);
}

/**
 * Resolves to the current user's verified status.
 * Forces a token refresh so the claim is up-to-date.
 */
export async function checkEmailVerification(): Promise<boolean> {
  const user = firebaseAuth.currentUser;
  if (!user) return false;
  await user.reload(); // fetch latest server-side state
  return user.emailVerified;
}

// ─── 2. Client-side Rate Limiter ─────────────────────────────────────────────

const RATE_LIMIT_KEY = "rh:auth_attempts";
const MAX_ATTEMPTS = 5;       // failed attempts before lock-out
const WINDOW_MS = 15 * 60 * 1000; // 15-minute window

interface AttemptRecord {
  count: number;
  windowStart: number;
}

function loadAttempts(): AttemptRecord {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { count: 0, windowStart: Date.now() };
    return JSON.parse(raw) as AttemptRecord;
  } catch {
    return { count: 0, windowStart: Date.now() };
  }
}

function saveAttempts(record: AttemptRecord): void {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable – fail silently */
  }
}

/**
 * Call this on every failed sign-in attempt.
 * Returns how many milliseconds are left in the lock-out period,
 * or 0 if the user is still allowed to try.
 */
export function recordFailedAttempt(): number {
  let record = loadAttempts();
  const now = Date.now();

  // Reset window if it has expired
  if (now - record.windowStart > WINDOW_MS) {
    record = { count: 0, windowStart: now };
  }

  record.count += 1;
  saveAttempts(record);

  if (record.count >= MAX_ATTEMPTS) {
    const remaining = WINDOW_MS - (now - record.windowStart);
    return Math.max(0, remaining);
  }

  return 0;
}

/**
 * Returns the lock-out duration remaining in ms, or 0 if not locked.
 */
export function getRateLimitRemaining(): number {
  const record = loadAttempts();
  if (record.count < MAX_ATTEMPTS) return 0;
  const remaining = WINDOW_MS - (Date.now() - record.windowStart);
  return Math.max(0, remaining);
}

/**
 * Returns a human-readable string like "12 minutes 30 seconds".
 */
export function formatLockoutTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
  return parts.join(" ") || "a moment";
}

/** Clears the rate-limit counter (call on successful sign-in). */
export function clearRateLimit(): void {
  try {
    sessionStorage.removeItem(RATE_LIMIT_KEY);
  } catch {
    /* ignore */
  }
}

// ─── 3. Session Token Refresh ─────────────────────────────────────────────────

let tokenRefreshTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Starts an interval that force-refreshes the Firebase ID token every
 * 50 minutes (tokens expire after 60 minutes by default).
 * Returns a cleanup function.
 */
export function startTokenAutoRefresh(): () => void {
  if (tokenRefreshTimer !== null) clearInterval(tokenRefreshTimer);

  const REFRESH_MS = 50 * 60 * 1000; // 50 minutes

  tokenRefreshTimer = setInterval(async () => {
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        await user.getIdToken(/* forceRefresh= */ true);
      } catch {
        /* Network hiccup – token will be refreshed on next API call */
      }
    }
  }, REFRESH_MS);

  // Also refresh whenever the token changes (e.g., after sign-in)
  const unsubToken = onIdTokenChanged(firebaseAuth, async (user) => {
    if (user) {
      try {
        await user.getIdToken(/* forceRefresh= */ false);
      } catch {
        /* ignore */
      }
    }
  });

  return () => {
    if (tokenRefreshTimer !== null) {
      clearInterval(tokenRefreshTimer);
      tokenRefreshTimer = null;
    }
    unsubToken();
  };
}

// ─── 4. Auth-State Audit Log ─────────────────────────────────────────────────

type AuditEvent =
  | "signed-in"
  | "signed-in-google"
  | "signed-out"
  | "email-verification-required"
  | "email-verified"
  | "token-refreshed"
  | "rate-limited"
  | "session-expired";

const auditLog: Array<{ event: AuditEvent; ts: string; uid?: string }> = [];

export function logSecurityEvent(event: AuditEvent, user?: User | null): void {
  const entry = {
    event,
    ts: new Date().toISOString(),
    uid: user?.uid ?? undefined,
  };
  auditLog.push(entry);
  if (import.meta.env.DEV) {
    // Only print to console in development builds
    console.info("[RankHolder Security]", entry);
  }
}

/** Returns a read-only snapshot of the in-memory audit log. */
export function getSecurityAuditLog(): ReadonlyArray<{
  event: AuditEvent;
  ts: string;
  uid?: string;
}> {
  return [...auditLog];
}

// ─── 5. Secure Sign-Out ───────────────────────────────────────────────────────

/**
 * Fully signs out the current user and clears all local auth artifacts.
 */
export async function secureSignOut(): Promise<void> {
  clearRateLimit();

  try {
    // Remove any cached token in sessionStorage that the app might have stored
    sessionStorage.removeItem("rh:id_token");
    localStorage.removeItem("rh:id_token");
  } catch {
    /* storage unavailable */
  }

  logSecurityEvent("signed-out", firebaseAuth.currentUser);
  await signOut(firebaseAuth);
}

// ─── 6. Auth State Watcher ────────────────────────────────────────────────────

/**
 * Sets up a global onAuthStateChanged observer that enforces the email
 * verification rule and logs state changes.
 *
 * Returns an unsubscribe function.
 */
export function watchAuthSecurity(
  onVerifiedUser: (user: User) => void,
  onNoUser: () => void,
): () => void {
  return onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) {
      logSecurityEvent("signed-out");
      onNoUser();
      return;
    }

    if (!user.emailVerified) {
      logSecurityEvent("email-verification-required", user);
      // Don't grant access – sign the user back out silently
      void signOut(firebaseAuth);
      onNoUser();
      return;
    }

    logSecurityEvent("signed-in", user);
    clearRateLimit();
    onVerifiedUser(user);
  });
}
