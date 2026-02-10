import { drizzle } from "drizzle-orm/mysql2";
import { subscriptionPlans } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const plans = [
  {
    stripeId: "price_pro_19_monthly",
    name: "Pro",
    description: "Unlimited image generations, 200 video generations/month, 4K resolution",
    price: 1900, // $19.00 in cents
    currency: "usd",
    interval: "month",
    features: JSON.stringify([
      "Unlimited image generations",
      "200 video generations / month",
      "4K video resolution",
      "All visual effects & styles",
      "Priority queue",
      "Motion control & lipsync",
      "Face swap & character tools",
      "Commercial license",
    ]),
  },
  {
    stripeId: "price_enterprise_89_monthly",
    name: "Enterprise",
    description: "Everything in Pro + unlimited videos, 8K resolution, API access",
    price: 8900, // $89.00 in cents
    currency: "usd",
    interval: "month",
    features: JSON.stringify([
      "Everything in Pro",
      "Unlimited video generations",
      "8K resolution support",
      "API access",
      "Custom model training",
      "Dedicated support",
      "Team collaboration",
      "White-label options",
    ]),
  },
];

async function seedPlans() {
  try {
    console.log("🌱 Seeding Stripe plans...");
    
    for (const plan of plans) {
      await db.insert(subscriptionPlans).values(plan);
      console.log(`✅ Created plan: ${plan.name}`);
    }
    
    console.log("✨ Stripe plans seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding plans:", error);
    process.exit(1);
  }
}

seedPlans();
