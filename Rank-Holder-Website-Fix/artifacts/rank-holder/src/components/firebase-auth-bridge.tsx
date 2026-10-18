import { useEffect } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  getRedirectResult,
  type User,
} from "firebase/auth";
import type { AuthFeedback, RankHolderUser } from "@/lib/auth-types";
import { firebaseAuth } from "@/lib/firebase";
import {
  recordFailedAttempt,
  clearRateLimit,
  getRateLimitRemaining,
  formatLockoutTime,
  logSecurityEvent,
  startTokenAutoRefresh,
  secureSignOut,
} from "@/lib/firebase-security";

type EmailAuthRequest = {
  email: string;
  password: string;
  displayName: string;
  mode: "sign-in" | "register";
};

// ─── Publish helpers ──────────────────────────────────────────────────────────

function publishAuthState(user: User | null) {
  // Security gate: only verified users are treated as signed in
  const summary =
    user && user.emailVerified
      ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
      : null;

  window.rankHolderUser = summary;
  window.dispatchEvent(
    new CustomEvent<RankHolderUser | null>("rank-holder:auth-state", {
      detail: summary,
    }),
  );
}

function publishFeedback(kind: AuthFeedback["kind"], message: string) {
  window.dispatchEvent(
    new CustomEvent<AuthFeedback>("rank-holder:auth-feedback", {
      detail: { kind, message },
    }),
  );
}

// ─── Error helpers ────────────────────────────────────────────────────────────

function firebaseErrorCode(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }
  return "";
}

function friendlyFirebaseError(error: unknown): string {
  switch (firebaseErrorCode(error)) {
    case "auth/unauthorized-domain":
      return "This site address is not authorized in Firebase. Add it under Authentication → Settings → Authorized domains.";
    case "auth/operation-not-allowed":
    case "auth/admin-restricted-operation":
      return "This sign-in method is disabled. Enable Email/Password and Google in Firebase Console → Authentication → Sign-in method.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account already uses this email. Switch to Sign in instead.";
    case "auth/weak-password":
      return "Choose a password with at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts were made. Wait a little and try again.";
    case "auth/network-request-failed":
      return "Firebase could not connect. Check your internet connection and retry.";
    case "auth/operation-not-supported-in-this-environment":
      return "Google sign-in is blocked in this browser context. Open the site in a regular browser tab and try again.";
    case "auth/popup-blocked":
      return "The Google sign-in window was blocked. Allow pop-ups or open the site in a regular browser tab.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished. Try again when you are ready.";
    case "auth/unauthorized-continue-uri":
    case "auth/invalid-continue-uri":
      return "Add this site address to Firebase Authentication's authorized domains.";
    default:
      return "Firebase sign-in did not complete. Check your Firebase Authentication settings and try again.";
  }
}

// ─── Email auth flow ──────────────────────────────────────────────────────────

async function completeEmailAuth(request: EmailAuthRequest) {
  // ── Rate-limit check ──────────────────────────────────────────────────────
  const lockRemaining = getRateLimitRemaining();
  if (lockRemaining > 0) {
    logSecurityEvent("rate-limited");
    publishFeedback(
      "error",
      `Too many failed attempts. Please wait ${formatLockoutTime(lockRemaining)} before trying again.`,
    );
    return;
  }

  await setPersistence(firebaseAuth, browserLocalPersistence);

  // ── Registration ──────────────────────────────────────────────────────────
  if (request.mode === "register") {
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      request.email,
      request.password,
    );
    if (request.displayName.trim()) {
      await updateProfile(credential.user, {
        displayName: request.displayName.trim(),
      });
    }
    await sendEmailVerification(credential.user);
    await signOut(firebaseAuth);
    logSecurityEvent("email-verification-required", credential.user);
    clearRateLimit();
    publishFeedback(
      "success",
      "Your account is ready. Verify your email using the message Firebase sent, then sign in.",
    );
    return;
  }

  // ── Sign-in ───────────────────────────────────────────────────────────────
  let credential;
  try {
    credential = await signInWithEmailAndPassword(
      firebaseAuth,
      request.email,
      request.password,
    );
  } catch (error: unknown) {
    // Record the failure for rate-limiting purposes
    const waitMs = recordFailedAttempt();
    if (waitMs > 0) {
      logSecurityEvent("rate-limited");
      publishFeedback(
        "error",
        `Too many failed sign-in attempts. Please wait ${formatLockoutTime(waitMs)} before trying again.`,
      );
    } else {
      publishFeedback("error", friendlyFirebaseError(error));
    }
    return;
  }

  await credential.user.reload();

  // ── Email-verification gate ───────────────────────────────────────────────
  if (!credential.user.emailVerified) {
    try {
      await sendEmailVerification(credential.user);
    } finally {
      await signOut(firebaseAuth);
    }
    logSecurityEvent("email-verification-required", credential.user);
    publishFeedback(
      "info",
      "Verify your email before continuing. Firebase has sent a verification message.",
    );
    return;
  }

  // ── Success ───────────────────────────────────────────────────────────────
  clearRateLimit();
  logSecurityEvent("signed-in", credential.user);
  publishFeedback("success", "You are signed in! Opening Rank Holder...");
  await onSuccessfulAuthRedirect(credential.user);
}

async function onSuccessfulAuthRedirect(user: User) {
  try {
    const idToken = await user.getIdToken(true);
    const backendRes = await fetch("/api/auth/firebase-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idToken,
        name: user.displayName || "",
        email: user.email || "",
        photo_url: user.photoURL || "",
      }),
    });
    const data = await backendRes.json();
    if (data.token) localStorage.setItem("rh_auth_token", data.token);
    if (data.user) localStorage.setItem("rh_user", JSON.stringify(data.user));
    if (data.user?.email) localStorage.setItem("rh_registered_email", data.user.email.toLowerCase());
  } catch (err) {
    console.warn("Backend session exchange:", err);
  }

  // Ensure local user structure matches app.html expectation
  if (!localStorage.getItem("rh_user") && user.email) {
    const fallbackUser = {
      id: 1,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      role: user.email === "tnesh833@gmail.com" ? "admin" : "user",
      status: "APPROVED",
      is_verified: 1,
      tokens: 100,
      photo_url: user.photoURL || "",
    };
    localStorage.setItem("rh_user", JSON.stringify(fallbackUser));
    localStorage.setItem("rh_registered_email", user.email.toLowerCase());
  }
  if (!localStorage.getItem("rh_auth_token")) {
    localStorage.setItem("rh_auth_token", "rh_session_" + Date.now());
  }

  // Redirect to app.html or admin.html
  setTimeout(() => {
    if (user.email === "tnesh833@gmail.com") {
      window.location.href = "/admin.html";
    } else {
      window.location.href = "/app.html";
    }
  }, 400);
}

// ─── Bridge component ─────────────────────────────────────────────────────────

export function FirebaseAuthBridge() {
  useEffect(() => {
    let disposed = false;

    // Set up local persistence and handle errors gracefully
    void setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
      if (!disposed) {
        publishFeedback(
          "info",
          "This browser could not save the sign-in session. Keep this tab open while using Rank Holder.",
        );
      }
    });

    // Token getter used by the API client – only returns a token for
    // verified users (security gate enforced here too).
    setAuthTokenGetter(async () => {
      const user = firebaseAuth.currentUser;
      if (!user || !user.emailVerified) return null;
      return user.getIdToken();
    });

    // Start the 50-minute token auto-refresh cycle
    const stopTokenRefresh = startTokenAutoRefresh();

    // Auth state observer with email-verification security gate
    const unsubscribeAuth = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (!disposed) {
          if (user && !user.emailVerified) {
            // Unverified user slipped through – block and sign out
            logSecurityEvent("email-verification-required", user);
            void signOut(firebaseAuth);
            publishAuthState(null);
            return;
          }
          if (user) logSecurityEvent("signed-in", user);
          publishAuthState(user);
        }
      },
      () => {
        if (!disposed) {
          publishAuthState(null);
          publishFeedback(
            "error",
            "Firebase could not restore your sign-in. Sign in again.",
          );
        }
      },
    );

    // ── Email/password sign-in listener ──────────────────────────────────────
    const onEmailAuth = (event: Event) => {
      const request = (event as CustomEvent<EmailAuthRequest>).detail;
      void completeEmailAuth(request).catch((error: unknown) => {
        publishFeedback("error", friendlyFirebaseError(error));
      });
    };

    // ── Google sign-in listener ───────────────────────────────────────────────
    const onGoogleAuth = () => {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");

      let popupResult: ReturnType<typeof signInWithPopup>;
      try {
        // Start popup synchronously so browser activation checks pass
        popupResult = signInWithPopup(firebaseAuth, provider);
      } catch (error) {
        publishFeedback("error", friendlyFirebaseError(error));
        return;
      }

      void popupResult
        .then(async (result) => {
          logSecurityEvent("signed-in-google", result.user);
          clearRateLimit();
          await onSuccessfulAuthRedirect(result.user);
        })
        .catch(async (error: unknown) => {
          const code = firebaseErrorCode(error);
          if (
            code !== "auth/operation-not-supported-in-this-environment" &&
            code !== "auth/popup-blocked"
          ) {
            throw error;
          }
          publishFeedback("info", "Opening Google sign-in in a full-page redirect.");
          await signInWithRedirect(firebaseAuth, provider);
        })
        .catch((error: unknown) => {
          recordFailedAttempt();
          publishFeedback("error", friendlyFirebaseError(error));
        });
    };

    // ── Sign-out listener (uses secure sign-out) ──────────────────────────────
    const onSignOutRequest = () => {
      void secureSignOut().catch((error: unknown) => {
        publishFeedback("error", friendlyFirebaseError(error));
      });
    };

    window.addEventListener("rank-holder:sign-in-email", onEmailAuth);
    window.addEventListener("rank-holder:sign-in-google", onGoogleAuth);
    window.addEventListener("rank-holder:sign-out", onSignOutRequest);

    // Handle Google redirect result on page load
    void getRedirectResult(firebaseAuth)
      .then(async (result) => {
        if (result?.user) {
          logSecurityEvent("signed-in-google", result.user);
          clearRateLimit();
          await onSuccessfulAuthRedirect(result.user);
        }
      })
      .catch((error: unknown) => {
        publishFeedback("error", friendlyFirebaseError(error));
      });

    return () => {
      disposed = true;
      stopTokenRefresh();
      unsubscribeAuth();
      window.removeEventListener("rank-holder:sign-in-email", onEmailAuth);
      window.removeEventListener("rank-holder:sign-in-google", onGoogleAuth);
      window.removeEventListener("rank-holder:sign-out", onSignOutRequest);
      setAuthTokenGetter(null);
    };
  }, []);

  return null;
}
