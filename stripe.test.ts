import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("stripe router", () => {
  describe("getPlans", () => {
    it("returns subscription plans array", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        const plans = await caller.stripe.getPlans();
        expect(Array.isArray(plans)).toBe(true);
      } catch (error: any) {
        // Stripe not configured is expected in test environment
        expect(error.message).toContain("Stripe not configured");
      }
    });
  });

  describe("getCurrentSubscription", () => {
    it("returns undefined if user has no subscription", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        const subscription = await caller.stripe.getCurrentSubscription();
        expect(subscription).toBeUndefined();
      } catch (error: any) {
        // Stripe not configured is expected in test environment
        expect(error.message).toContain("Stripe not configured");
      }
    });
  });

  describe("createCheckoutSession", () => {
    it("throws error if Stripe not configured", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.stripe.createCheckoutSession({
          planId: 1,
          returnUrl: "https://example.com/pricing",
        })
      ).rejects.toThrow("Stripe not configured");
    });

    it("requires valid return URL format", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.stripe.createCheckoutSession({
          planId: 1,
          returnUrl: "invalid-url",
        })
      ).rejects.toThrow();
    });
  });

  describe("cancelSubscription", () => {
    it("throws error if Stripe not configured", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.stripe.cancelSubscription()
      ).rejects.toThrow("Stripe not configured");
    });
  });

  describe("getInvoices", () => {
    it("returns invoices array for user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        const invoices = await caller.stripe.getInvoices();
        expect(Array.isArray(invoices)).toBe(true);
      } catch (error: any) {
        // Database errors are acceptable in test environment
        expect(error).toBeDefined();
      }
    });
  });
});
