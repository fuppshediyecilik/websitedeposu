/**
 * Advanced Error Logging System for Production
 * Provides detailed error tracking, context, and stack traces
 * Integrates with Sentry for remote error monitoring
 */

import * as sentryLib from "./sentry";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export interface LogContext {
  userId?: number | string;
  page?: string;
  component?: string;
  action?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  error?: Error | unknown;
  context?: LogContext;
  stack?: string;
  timestamp: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;
  private context: LogContext = {};

  constructor() {
    this.initializeContext();
    this.setupGlobalErrorHandlers();
  }

  /**
   * Initialize logger context with browser/page info
   */
  private initializeContext() {
    this.context = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalErrorHandlers() {
    // Handle uncaught errors
    window.addEventListener("error", (event) => {
      this.error("Uncaught Error", event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.error("Unhandled Promise Rejection", event.reason, {
        promise: "unhandled",
      });
    });

    // Monitor console errors
    const originalError = console.error;
    console.error = (...args: any[]) => {
      originalError(...args);
      if (args[0] instanceof Error) {
        this.error("Console Error", args[0], { args: args.slice(1) });
      }
    };
  }

  /**
   * Set user context for tracking
   */
  setUserContext(userId: number | string, email?: string) {
    this.context.userId = userId;
    if (email) {
      this.context.userEmail = email;
    }
  }

  /**
   * Set current page/component context
   */
  setPageContext(page: string, component?: string) {
    this.context.page = page;
    if (component) {
      this.context.component = component;
    }
  }

  /**
   * Extract stack trace from error
   */
  private getStackTrace(error: unknown): string {
    if (error instanceof Error) {
      return error.stack || "No stack trace available";
    }
    return "No stack trace available";
  }

  /**
   * Format log entry for console output
   */
  private formatLogEntry(entry: LogEntry): string {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const contextStr = entry.context ? ` | ${JSON.stringify(entry.context)}` : "";
    return `[${timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}`;
  }

  /**
   * Add entry to history
   */
  private addToHistory(entry: LogEntry) {
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, context?: LogContext) {
    const entry: LogEntry = {
      level: "debug",
      message,
      context: { ...this.context, ...context },
      timestamp: new Date().toISOString(),
    };

    if (this.isDevelopment) {
      console.debug(
        `%c[DEBUG] ${message}`,
        "color: #888; font-weight: bold;",
        entry.context
      );
    }

    this.addToHistory(entry);
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext) {
    const entry: LogEntry = {
      level: "info",
      message,
      context: { ...this.context, ...context },
      timestamp: new Date().toISOString(),
    };

    console.info(
      `%c[INFO] ${message}`,
      "color: #0066cc; font-weight: bold;",
      entry.context
    );

    this.addToHistory(entry);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext) {
    const entry: LogEntry = {
      level: "warn",
      message,
      context: { ...this.context, ...context },
      timestamp: new Date().toISOString(),
    };

    console.warn(
      `%c[WARN] ${message}`,
      "color: #ff9900; font-weight: bold;",
      entry.context
    );

    this.addToHistory(entry);
  }

  /**
   * Log error with full details
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    const stack = error ? this.getStackTrace(error) : undefined;
    const errorMessage = error instanceof Error ? error.message : String(error);

    const entry: LogEntry = {
      level: "error",
      message,
      error,
      context: { ...this.context, ...context },
      stack,
      timestamp: new Date().toISOString(),
    };

    console.error(
      `%c[ERROR] ${message}`,
      "color: #cc0000; font-weight: bold; background: #ffe0e0; padding: 2px 4px;",
      {
        message: errorMessage,
        context: entry.context,
        stack: stack,
      }
    );

    // Log stack trace separately for better visibility
    if (stack) {
      console.error(
        `%cStack Trace:\n${stack}`,
        "color: #cc0000; font-family: monospace; font-size: 11px;"
      );
    }

    this.addToHistory(entry);
  }

  /**
   * Log fatal error
   */
  fatal(message: string, error?: Error | unknown, context?: LogContext) {
    const stack = error ? this.getStackTrace(error) : undefined;
    const errorMessage = error instanceof Error ? error.message : String(error);

    const entry: LogEntry = {
      level: "fatal",
      message,
      error,
      context: { ...this.context, ...context },
      stack,
      timestamp: new Date().toISOString(),
    };

    console.error(
      `%c[FATAL] ${message}`,
      "color: white; font-weight: bold; background: #cc0000; padding: 4px 8px; border-radius: 2px;",
      {
        message: errorMessage,
        context: entry.context,
        stack: stack,
      }
    );

    if (stack) {
      console.error(
        `%cStack Trace:\n${stack}`,
        "color: #cc0000; font-family: monospace; font-size: 11px;"
      );
    }

    this.addToHistory(entry);

    // Send to monitoring service in production
    this.sendToMonitoring(entry);
  }

  /**
   * Log API request
   */
  logApiRequest(method: string, url: string, context?: LogContext) {
    this.debug(`API Request: ${method} ${url}`, {
      type: "api_request",
      ...context,
    });
  }

  /**
   * Log API response
   */
  logApiResponse(
    method: string,
    url: string,
    status: number,
    duration: number,
    context?: LogContext
  ) {
    const statusColor = status >= 400 ? "warn" : "info";
    const message = `API Response: ${method} ${url} - ${status} (${duration}ms)`;

    if (statusColor === "warn") {
      this.warn(message, { type: "api_response", ...context });
    } else {
      this.info(message, { type: "api_response", ...context });
    }
  }

  /**
   * Log component lifecycle
   */
  logComponentLifecycle(component: string, event: string, context?: LogContext) {
    this.debug(`[${component}] ${event}`, {
      type: "component_lifecycle",
      component,
      event,
      ...context,
    });
  }

  /**
   * Get log history
   */
  getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logHistory, null, 2);
  }

  /**
   * Clear log history
   */
  clearHistory() {
    this.logHistory = [];
  }

  /**
   * Send critical errors to Sentry monitoring service
   */
  private sendToMonitoring(entry: LogEntry) {
    // Send fatal errors to Sentry
    if (!this.isDevelopment && entry.level === "fatal") {
      console.log(
        "%cSending error to Sentry...",
        "color: #666; font-style: italic;"
      );
      
      try {
        sentryLib.captureError(
          entry.error instanceof Error ? entry.error : new Error(String(entry.error)),
          {
            level: entry.level,
            message: entry.message,
            context: entry.context,
            stack: entry.stack,
          }
        );
      } catch (error) {
        console.error("Failed to send error to Sentry:", error);
      }
    }
    
    // Send error level messages to Sentry as well
    if (!this.isDevelopment && entry.level === "error") {
      try {
        sentryLib.captureMessage(
          entry.message,
          "error"
        );
      } catch (error) {
        console.error("Failed to send message to Sentry:", error);
      }
    }
  }

  /**
   * Create a child logger with specific context
   */
  createChild(context: LogContext) {
    const child = new Logger();
    child.context = { ...this.context, ...context };
    return child;
  }

  /**
   * Add breadcrumb to Sentry for debugging
   */
  addSentryBreadcrumb(message: string, category: string = "user-action") {
    try {
      sentryLib.addBreadcrumb(message, category, "info");
    } catch (error) {
      console.error("Failed to add breadcrumb to Sentry:", error);
    }
  }

  /**
   * Set Sentry user context
   */
  setSentryUser(userId: string | number, email?: string) {
    try {
      sentryLib.setUserContext(userId, email);
    } catch (error) {
      console.error("Failed to set Sentry user context:", error);
    }
  }

  /**
   * Clear Sentry user context
   */
  clearSentryUser() {
    try {
      sentryLib.clearUserContext();
    } catch (error) {
      console.error("Failed to clear Sentry user context:", error);
    }
  }
}

// Create singleton instance
export const logger = new Logger();

// Export for use in components
export default logger;
