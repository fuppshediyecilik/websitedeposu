import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { newsletterSubscribers } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { sendNewsletterWelcomeEmail } from "../_core/emailService";

export const newsletterRouter = router({
  /**
   * Subscribe to newsletter
   */
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email("Invalid email address"),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        // Check if already subscribed
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          // Update status if previously unsubscribed
          if (existing[0].status === "unsubscribed") {
            await db
              .update(newsletterSubscribers)
              .set({
                status: "subscribed",
                name: input.name || existing[0].name,
                updatedAt: new Date(),
              })
              .where(eq(newsletterSubscribers.email, input.email));
          }
          return {
            success: true,
            message: "Already subscribed to newsletter",
            isNew: false,
          };
        }

        // Create new subscription
        await db.insert(newsletterSubscribers).values({
          email: input.email,
          name: input.name,
          status: "subscribed",
          unsubscribeToken: nanoid(32),
        });

        // Send welcome email
        await sendNewsletterWelcomeEmail(input.email, input.name);

        return {
          success: true,
          message: "Successfully subscribed to newsletter",
          isNew: true,
        };
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw new Error("Failed to subscribe to newsletter");
      }
    }),

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: publicProcedure
    .input(z.object({
      token: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        const subscriber = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.unsubscribeToken, input.token))
          .limit(1);

        if (subscriber.length === 0) {
          throw new Error("Invalid unsubscribe token");
        }

        await db
          .update(newsletterSubscribers)
          .set({
            status: "unsubscribed",
            updatedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.unsubscribeToken, input.token));

        return {
          success: true,
          message: "Successfully unsubscribed from newsletter",
        };
      } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        throw new Error("Failed to unsubscribe from newsletter");
      }
    }),

  /**
   * Get subscription status
   */
  getStatus: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { subscribed: false };

      try {
        const subscriber = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

        if (subscriber.length === 0) {
          return { subscribed: false };
        }

        return {
          subscribed: subscriber[0].status === "subscribed",
          status: subscriber[0].status,
        };
      } catch (error) {
        console.error("Newsletter status check error:", error);
        return { subscribed: false };
      }
    }),
});
