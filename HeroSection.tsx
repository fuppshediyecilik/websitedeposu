/*
 * Design: Obsidian Luxe — Sinematik hero bölümü
 * Full-bleed hero with ambient particles, gradient text, glassmorphism stats
 */
import { motion } from "framer-motion";
import { Play, ArrowRight, Zap, Users, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/pVdcYjuk75oenNU8a1tLn9/sandbox/fhimCMt0tgr8NR4E4AEy4U-img-1_1770712041000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFZkY1lqdWs3NW9lbk5VOGExdExuOS9zYW5kYm94L2ZoaW1DTXQwdGdyOE5SNEU0QUV5NFUtaW1nLTFfMTc3MDcxMjA0MTAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vEep7cxb~Hk1MJB1-fzvnlbH1EzrfI6goBQgfLiYTyMcwAjBe9x89~JLxUYTCbv5kZwPn1NG0uEWGjUPgXJP1oqFpTSbEtF0J5oZEM~6iFBF4jJ640RLCYUoxt55NJ17v3lQlxG2YiwGKMtS88V7Pyd9~SgYZGKfOQaw7ZMkpKjUr0yEFMzIHmIiGXbdgGouMiPXnMMZn-VGGLVVQGZibcFUtma5r77BQuwsJzDBgnMBkwRbnOVTwjBlTKbOfju0Nx3zT6oyctLKZniIB-GrsSKQb866YWfbSyL6ZePfcVhrM4cIvXLE6awVWVt9PmjnlkNuO7Zmfq82RY7iQUK1Qg__";

const stats = [
  { icon: Zap, value: "50M+", label: "Videos Generated" },
  { icon: Users, value: "2M+", label: "Active Creators" },
  { icon: ImageIcon, value: "100M+", label: "Images Created" },
];

export default function HeroSection() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(1.2)" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.10 0.01 270 / 60%) 0%, oklch(0.10 0.01 270 / 30%) 40%, oklch(0.10 0.01 270 / 80%) 80%, oklch(0.10 0.01 270) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 30% 50%, oklch(0.82 0.17 75 / 8%) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 70% 30%, oklch(0.75 0.14 200 / 6%) 0%, transparent 60%)"
        }} />
      </div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: i % 2 === 0 ? "oklch(0.82 0.17 75 / 40%)" : "oklch(0.75 0.14 200 / 40%)",
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "oklch(0.82 0.17 75 / 10%)",
              border: "1px solid oklch(0.82 0.17 75 / 20%)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "oklch(0.82 0.17 75)" }} />
            <span className="text-sm font-medium" style={{ color: "oklch(0.82 0.17 75)" }}>
              Next-Gen AI Platform — Now in Open Beta
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <span className="text-white">Create </span>
            <span className="gradient-text-amber">Beyond</span>
            <br />
            <span className="text-white">Imagination</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.75 0.005 90)" }}
          >
            The most powerful AI video and image generation platform.
            Transform your ideas into stunning visuals with cinema-grade quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={handleComingSoon}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                color: "oklch(0.12 0.02 75)",
                boxShadow: "0 0 30px oklch(0.82 0.17 75 / 25%), 0 10px 40px oklch(0 0 0 / 30%)",
              }}
            >
              Start Creating
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleComingSoon}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "oklch(1 0 0 / 5%)",
                border: "1px solid oklch(1 0 0 / 10%)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
            >
              <Play className="w-5 h-5" style={{ color: "oklch(0.75 0.14 200)" }} />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: i % 2 === 0 ? "oklch(0.82 0.17 75 / 10%)" : "oklch(0.75 0.14 200 / 10%)",
                  }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{
                      color: i % 2 === 0 ? "oklch(0.82 0.17 75)" : "oklch(0.75 0.14 200)",
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs" style={{ color: "oklch(0.55 0.01 270)" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: "linear-gradient(to top, oklch(0.10 0.01 270), transparent)"
      }} />
    </section>
  );
}
