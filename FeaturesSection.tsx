/*
 * Design: Obsidian Luxe — Feature tools grid
 * Glassmorphism cards with hover glow effects
 */
import { motion } from "framer-motion";
import {
  Video, Image, Wand2, Layers, Mic2, Camera,
  Palette, Sparkles, Scissors, RotateCcw, Zap, Film
} from "lucide-react";
import { toast } from "sonner";

const tools = [
  {
    icon: Video,
    title: "AI Video Generator",
    desc: "Create cinematic videos up to 60s with natural motion",
    tag: "POPULAR",
    color: "oklch(0.82 0.17 75)",
  },
  {
    icon: Image,
    title: "Image Generation",
    desc: "Photorealistic 4K images with unprecedented detail",
    tag: "NEW",
    color: "oklch(0.75 0.14 200)",
  },
  {
    icon: Wand2,
    title: "Motion Control",
    desc: "Precise control of character actions and expressions",
    tag: null,
    color: "oklch(0.70 0.20 40)",
  },
  {
    icon: Layers,
    title: "Mixed Media",
    desc: "Layer artistic styles from sketch to watercolor",
    tag: null,
    color: "oklch(0.75 0.16 320)",
  },
  {
    icon: Mic2,
    title: "Lipsync Studio",
    desc: "Perfect lip-sync for any character in any language",
    tag: "PRO",
    color: "oklch(0.82 0.17 75)",
  },
  {
    icon: Camera,
    title: "Camera Controls",
    desc: "AI-crafted cinematic moves like crash zooms and crane shots",
    tag: null,
    color: "oklch(0.75 0.14 200)",
  },
  {
    icon: Palette,
    title: "Style Transfer",
    desc: "Transform any image into any artistic style instantly",
    tag: null,
    color: "oklch(0.70 0.20 40)",
  },
  {
    icon: Sparkles,
    title: "Visual Effects",
    desc: "200+ Hollywood-grade VFX from explosions to transformations",
    tag: "TRENDING",
    color: "oklch(0.75 0.16 320)",
  },
  {
    icon: Scissors,
    title: "Smart Edit",
    desc: "AI-powered editing with inpainting and outpainting",
    tag: null,
    color: "oklch(0.82 0.17 75)",
  },
  {
    icon: RotateCcw,
    title: "Face Swap",
    desc: "Industry-leading instant face swap technology",
    tag: "PRO",
    color: "oklch(0.75 0.14 200)",
  },
  {
    icon: Zap,
    title: "Upscale",
    desc: "Enhance any image or video to stunning 4K resolution",
    tag: null,
    color: "oklch(0.70 0.20 40)",
  },
  {
    icon: Film,
    title: "Click to Ad",
    desc: "Turn product links into professional video ads",
    tag: "NEW",
    color: "oklch(0.75 0.16 320)",
  },
];

export default function FeaturesSection() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.17 75 / 3%) 0%, transparent 70%)" }} />

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "oklch(0.75 0.14 200)" }}
          >
            Powerful Tools
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <span className="text-white">Everything You Need to </span>
            <span className="gradient-text-cyan">Create</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.60 0.01 270)" }}>
            Professional-grade AI tools for creators, filmmakers, and artists. No experience required.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={handleComingSoon}
              className="group relative p-5 rounded-2xl cursor-pointer transition-all duration-500"
              style={{
                background: "oklch(1 0 0 / 3%)",
                border: "1px solid oklch(1 0 0 / 5%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(1 0 0 / 6%)";
                e.currentTarget.style.borderColor = `color-mix(in oklch, ${tool.color} 30%, transparent)`;
                e.currentTarget.style.boxShadow = `0 0 30px color-mix(in oklch, ${tool.color} 8%, transparent)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(1 0 0 / 3%)";
                e.currentTarget.style.borderColor = "oklch(1 0 0 / 5%)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Tag */}
              {tool.tag && (
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      background: `color-mix(in oklch, ${tool.color} 15%, transparent)`,
                      color: tool.color,
                    }}
                  >
                    {tool.tag}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `color-mix(in oklch, ${tool.color} 10%, transparent)`,
                }}
              >
                <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
              </div>

              {/* Text */}
              <h3 className="text-base font-semibold text-white mb-1.5" style={{ fontFamily: "'Sora', sans-serif" }}>
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.55 0.01 270)" }}>
                {tool.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
