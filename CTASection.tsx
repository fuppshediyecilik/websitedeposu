/*
 * Design: Obsidian Luxe — Call to action with gradient background
 */
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function CTASection() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section id="community" className="relative py-32 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 30% 50%, oklch(0.82 0.17 75 / 8%) 0%, transparent 50%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 70% 50%, oklch(0.75 0.14 200 / 8%) 0%, transparent 50%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 80%, oklch(0.75 0.16 320 / 5%) 0%, transparent 50%)"
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              background: i % 2 === 0 ? "oklch(0.82 0.17 75 / 30%)" : "oklch(0.75 0.14 200 / 30%)",
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "oklch(0.75 0.14 200 / 10%)",
              border: "1px solid oklch(0.75 0.14 200 / 20%)",
            }}>
            <Sparkles className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
            <span className="text-sm font-medium" style={{ color: "oklch(0.75 0.14 200)" }}>
              Join 2M+ Creators Worldwide
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            <span className="text-white">Ready to Create </span>
            <br className="hidden sm:block" />
            <span className="gradient-text-mixed">Something Amazing?</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "oklch(0.65 0.005 90)" }}>
            Start creating stunning AI-generated videos and images today.
            No credit card required. Free forever on the Starter plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleComingSoon}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                color: "oklch(0.12 0.02 75)",
                boxShadow: "0 0 30px oklch(0.82 0.17 75 / 25%), 0 10px 40px oklch(0 0 0 / 30%)",
              }}
            >
              Start Creating — It's Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleComingSoon}
              className="px-8 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "oklch(1 0 0 / 5%)",
                border: "1px solid oklch(1 0 0 / 10%)",
                color: "white",
              }}
            >
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
