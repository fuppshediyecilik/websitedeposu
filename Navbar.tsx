/*
 * Design: Obsidian Luxe — Dark luxury minimalism
 * Glassmorphism navbar with amber/cyan accents
 * Sticky, backdrop-blur, subtle border
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { label: "Explore", href: "#explore" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleComingSoon = () => {
    toast("Feature coming soon", {
      description: "This feature is currently under development.",
    });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div
          className="mt-3 rounded-2xl px-6 py-3 flex items-center justify-between"
          style={{
            background: "oklch(0.10 0.01 270 / 70%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid oklch(1 0 0 / 6%)",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.75 0.14 200))" }}>
              <Sparkles className="w-5 h-5 text-black relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-white">Nex</span>
              <span className="gradient-text-amber">Gen</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleComingSoon}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              Login
            </button>
            <button
              onClick={handleComingSoon}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                color: "oklch(0.12 0.02 75)",
              }}
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.12 0.01 270 / 95%)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(1 0 0 / 6%)",
              }}
            >
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg transition-all hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-2">
                  <button
                    onClick={handleComingSoon}
                    className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white text-left rounded-lg transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleComingSoon}
                    className="px-4 py-3 text-sm font-semibold rounded-xl text-center"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                      color: "oklch(0.12 0.02 75)",
                    }}
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
