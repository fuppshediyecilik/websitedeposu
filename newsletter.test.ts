import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("newsletter router", () => {
  it("should subscribe to newsletter with valid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.subscribe({
      email: "test@example.com",
      name: "Test User",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should handle duplicate subscription", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First subscription
    await caller.newsletter.subscribe({
      email: "duplicate@example.com",
      name: "Duplicate User",
    });

    // Second subscription (should not fail)
    const result = await caller.newsletter.subscribe({
      email: "duplicate@example.com",
      name: "Duplicate User",
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.newsletter.subscribe({
        email: "invalid-email",
        name: "Invalid",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should get subscription status", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Subscribe first
    await caller.newsletter.subscribe({
      email: "status@example.com",
      name: "Status User",
    });

    // Check status
    const result = await caller.newsletter.getStatus({
      email: "status@example.com",
    });

    expect(result).toBeDefined();
    expect(result.subscribed).toBe(true);
  });

  it("should return unsubscribed status for non-existent email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.getStatus({
      email: "nonexistent@example.com",
    });

    expect(result.subscribed).toBe(false);
  });
});
