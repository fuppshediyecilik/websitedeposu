/*
 * Design: Obsidian Luxe — Premium pricing cards with Stripe integration
 * Glassmorphism with amber/cyan accent highlights
 */
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for exploring AI creation",
    icon: Zap,
    color: "oklch(0.60 0.01 270)",
    features: [
      "50 image generations / month",
      "10 video generations / month",
      "720p video resolution",
      "Basic visual effects",
      "Community gallery access",
      "Standard queue",
    ],
    cta: "Get Started",
    popular: false,
    stripePriceId: null,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious creators and professionals",
    icon: Sparkles,
    color: "oklch(0.82 0.17 75)",
    features: [
      "Unlimited image generations",
      "200 video generations / month",
      "4K video resolution",
      "All visual effects & styles",
      "Priority queue",
      "Motion control & lipsync",
      "Face swap & character tools",
      "Commercial license",
    ],
    cta: "Start Pro Trial",
    popular: true,
    stripePriceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || null,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and businesses at scale",
    icon: Crown,
    color: "oklch(0.75 0.14 200)",
    features: [
      "Everything in Pro",
      "Unlimited video generations",
      "8K resolution support",
      "API access",
      "Custom model training",
      "Dedicated support",
      "Team collaboration",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID || null,
  },
];

export default function PricingSection() {
  const [, navigate] = useLocation();
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (!plan.stripePriceId) {
      // For Starter plan or Contact Sales
      if (plan.name === "Enterprise") {
        window.location.href = "mailto:sales@nexgen.ai";
      }
      return;
    }

    try {
      const result = await createCheckout.mutateAsync({
        planId: plan.name === "Pro" ? 1 : 2, // Simplified for demo
        returnUrl: window.location.origin + "/pricing",
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.17 75 / 4%) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.14 200 / 4%) 0%, transparent 70%)" }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "oklch(0.82 0.17 75)" }}>
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            <span className="text-white">Simple, </span>
            <span className="gradient-text-amber">Transparent</span>
            <span className="text-white"> Pricing</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.60 0.01 270)" }}>
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative rounded-2xl p-7 flex flex-col ${plan.popular ? 'md:-mt-4 md:mb-0' : ''}`}
              style={{
                background: plan.popular ? "oklch(0.16 0.01 270)" : "oklch(0.13 0.01 270)",
                border: plan.popular
                  ? "1px solid oklch(0.82 0.17 75 / 30%)"
                  : "1px solid oklch(1 0 0 / 6%)",
                boxShadow: plan.popular
                  ? "0 0 40px oklch(0.82 0.17 75 / 10%), 0 20px 60px oklch(0 0 0 / 30%)"
                  : "none",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                      color: "oklch(0.12 0.02 75)",
                    }}>
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `color-mix(in oklch, ${plan.color} 12%, transparent)` }}>
                  <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {plan.name}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.55 0.01 270)" }}>{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base ml-1" style={{ color: "oklch(0.55 0.01 270)" }}>{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-sm" style={{ color: "oklch(0.70 0.005 90)" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan)}
                disabled={createCheckout.isPending}
                className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={plan.popular ? {
                  background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                  color: "oklch(0.12 0.02 75)",
                  boxShadow: "0 0 20px oklch(0.82 0.17 75 / 20%)",
                } : {
                  background: "oklch(1 0 0 / 5%)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  color: "white",
                }}
              >
                {createCheckout.isPending ? "Processing..." : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
