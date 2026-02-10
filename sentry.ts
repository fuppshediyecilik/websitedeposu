/**
 * Sentry Error Tracking Integration
 * Sends critical errors to Sentry for remote monitoring
 */

import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking
 * Should be called early in the application lifecycle
 */
export function initializeSentry() {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  // Only initialize if DSN is provided
  if (!sentryDsn) {
    console.warn("Sentry DSN not configured. Error tracking disabled.");
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    // Set sample rates for error and performance monitoring
    tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    // Capture 100% of errors in production
    sampleRate: 1.0,
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || "unknown",
    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      // Random plugins/extensions
      "chrome-extension://",
      "moz-extension://",
      // Facebook errors
      "fb_xd_fragment",
      // Network errors that are usually not actionable
      "NetworkError",
      "Network request failed",
    ],
  });
}

/**
 * Capture an error in Sentry
 */
export function captureError(
  error: Error | string,
  context?: Record<string, any>
) {
  if (typeof error === "string") {
    Sentry.captureException(new Error(error), {
      contexts: { custom: context },
    });
  } else {
    Sentry.captureException(error, {
      contexts: { custom: context },
    });
  }
}

/**
 * Capture a message in Sentry
 */
export function captureMessage(message: string, level: "fatal" | "error" | "warning" | "info" | "debug" = "info") {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId: string | number, email?: string, username?: string) {
  Sentry.setUser({
    id: String(userId),
    email,
    username,
  });
}

/**
 * Clear user context
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string = "user-action",
  level: "fatal" | "error" | "warning" | "info" | "debug" = "info"
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Set additional context
 */
export function setContext(name: string, context: Record<string, any>) {
  Sentry.setContext(name, context);
}

/**
 * Wrap a component with Sentry error boundary
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;

export default Sentry;
