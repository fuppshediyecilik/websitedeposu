/*
 * Design: Obsidian Luxe — Horizontal scrolling effects showcase
 * Higgsfield-style effect cards with auto-scroll marquee
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const effects = [
  { name: "Fire Tornado", category: "VFX", color: "#F97316" },
  { name: "Water Bending", category: "VFX", color: "#06B6D4" },
  { name: "Lightning Strike", category: "VFX", color: "#A855F7" },
  { name: "Particle Storm", category: "VFX", color: "#F59E0B" },
  { name: "Neon Glow", category: "Style", color: "#EC4899" },
  { name: "Sketch to Real", category: "Style", color: "#10B981" },
  { name: "Oil Painting", category: "Style", color: "#F97316" },
  { name: "Cyberpunk", category: "Style", color: "#06B6D4" },
  { name: "Explosion", category: "VFX", color: "#EF4444" },
  { name: "Portal", category: "VFX", color: "#8B5CF6" },
  { name: "Smoke Trail", category: "VFX", color: "#6B7280" },
  { name: "Glitch", category: "Style", color: "#F43F5E" },
  { name: "Freeze Frame", category: "VFX", color: "#38BDF8" },
  { name: "Disintegration", category: "VFX", color: "#F59E0B" },
  { name: "Clone Effect", category: "VFX", color: "#A855F7" },
  { name: "Time Warp", category: "VFX", color: "#06B6D4" },
];

const row1 = effects.slice(0, 8);
const row2 = effects.slice(8, 16);

function EffectCard({ effect, onClick }: { effect: typeof effects[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 group relative w-44 h-28 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${effect.color}15, ${effect.color}08)`,
        border: `1px solid ${effect.color}20`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${effect.color}20` }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: effect.color }} />
        </div>
        <span className="text-xs font-semibold text-white text-center leading-tight">{effect.name}</span>
        <span className="text-[10px] font-medium" style={{ color: `${effect.color}CC` }}>{effect.category}</span>
      </div>
    </button>
  );
}

export default function EffectsShowcase() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.75 0.14 200)" }}>
              Visual Effects & Styles
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-white">200+ </span>
              <span className="gradient-text-cyan">Pro Effects</span>
            </h2>
          </div>
          <button
            onClick={handleComingSoon}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "oklch(1 0 0 / 5%)",
              border: "1px solid oklch(1 0 0 / 10%)",
              color: "white",
            }}
          >
            Explore All
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative mb-4">
        <div className="flex gap-4 animate-marquee-left">
          {[...row1, ...row1, ...row1].map((effect, i) => (
            <EffectCard key={`r1-${i}`} effect={effect} onClick={handleComingSoon} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(0.10 0.01 270), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, oklch(0.10 0.01 270), transparent)" }} />
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee-right">
          {[...row2, ...row2, ...row2].map((effect, i) => (
            <EffectCard key={`r2-${i}`} effect={effect} onClick={handleComingSoon} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(0.10 0.01 270), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, oklch(0.10 0.01 270), transparent)" }} />
      </div>
    </section>
  );
}
