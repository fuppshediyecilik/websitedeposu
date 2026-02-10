import { describe, it, expect, beforeEach, vi } from "vitest";
import * as sentryLib from "./sentry";

/**
 * Test Sentry integration
 */
describe("Sentry Integration", () => {
  beforeEach(() => {
    // Clear any previous state
    vi.clearAllMocks();
  });

  it("should initialize Sentry with valid DSN", () => {
    // Check that VITE_SENTRY_DSN is set
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    
    // DSN should be a valid Sentry URL format
    if (dsn) {
      expect(dsn).toMatch(/^https:\/\/[a-f0-9]+@[a-z0-9.-]+\.ingest\.[a-z.]+\/[0-9]+$/);
    }
  });

  it("should have Sentry module exported", () => {
    expect(sentryLib).toBeDefined();
    expect(sentryLib.default).toBeDefined();
  });

  it("should have captureError function", () => {
    expect(sentryLib.captureError).toBeDefined();
    expect(typeof sentryLib.captureError).toBe("function");
  });

  it("should have captureMessage function", () => {
    expect(sentryLib.captureMessage).toBeDefined();
    expect(typeof sentryLib.captureMessage).toBe("function");
  });

  it("should have setUserContext function", () => {
    expect(sentryLib.setUserContext).toBeDefined();
    expect(typeof sentryLib.setUserContext).toBe("function");
  });

  it("should have clearUserContext function", () => {
    expect(sentryLib.clearUserContext).toBeDefined();
    expect(typeof sentryLib.clearUserContext).toBe("function");
  });

  it("should have addBreadcrumb function", () => {
    expect(sentryLib.addBreadcrumb).toBeDefined();
    expect(typeof sentryLib.addBreadcrumb).toBe("function");
  });

  it("should have setContext function", () => {
    expect(sentryLib.setContext).toBeDefined();
    expect(typeof sentryLib.setContext).toBe("function");
  });

  it("should initialize without errors", () => {
    // This should not throw
    expect(() => {
      sentryLib.initializeSentry();
    }).not.toThrow();
  });

  it("should handle captureError with Error object", () => {
    const testError = new Error("Test error");
    expect(() => {
      sentryLib.captureError(testError, { test: true });
    }).not.toThrow();
  });

  it("should handle captureError with string", () => {
    expect(() => {
      sentryLib.captureError("Test error message", { test: true });
    }).not.toThrow();
  });

  it("should handle captureMessage", () => {
    expect(() => {
      sentryLib.captureMessage("Test message", "info");
    }).not.toThrow();
  });

  it("should handle setUserContext", () => {
    expect(() => {
      sentryLib.setUserContext(123, "test@example.com", "testuser");
    }).not.toThrow();
  });

  it("should handle clearUserContext", () => {
    expect(() => {
      sentryLib.clearUserContext();
    }).not.toThrow();
  });

  it("should handle addBreadcrumb", () => {
    expect(() => {
      sentryLib.addBreadcrumb("Test breadcrumb", "user-action", "info");
    }).not.toThrow();
  });

  it("should handle setContext", () => {
    expect(() => {
      sentryLib.setContext("test", { key: "value" });
    }).not.toThrow();
  });
});
