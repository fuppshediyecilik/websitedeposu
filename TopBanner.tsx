/*
 * Design: Obsidian Luxe — Promotional top banner
 * Animated gradient background, dismissible
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, oklch(0.20 0.03 75), oklch(0.15 0.02 200), oklch(0.20 0.03 75))",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 6s ease infinite",
          }}
        >
          <div className="container flex items-center justify-center gap-3 py-2.5 text-sm">
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.82 0.17 75)" }} />
            <span className="text-white/80 hidden sm:inline">
              <span className="font-semibold" style={{ color: "oklch(0.82 0.17 75)" }}>LIMITED OFFER</span>
              {" — "}NexGen Pro Unlimited Access. 60% OFF for early adopters.
            </span>
            <span className="text-white/80 sm:hidden text-xs">
              <span className="font-semibold" style={{ color: "oklch(0.82 0.17 75)" }}>60% OFF</span> Pro Unlimited
            </span>
            <button
              onClick={handleComingSoon}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{
                background: "oklch(0.82 0.17 75 / 15%)",
                color: "oklch(0.82 0.17 75)",
                border: "1px solid oklch(0.82 0.17 75 / 25%)",
              }}
            >
              Claim Offer
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 p-1 text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
