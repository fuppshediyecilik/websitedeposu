/*
 * Design: Obsidian Luxe — Mega footer with 4 columns
 * Subtle border top, social links, comprehensive navigation
 */
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import NewsletterForm from "./NewsletterForm";

const footerLinks = {
  "Platform": [
    "AI Video Generator",
    "Image Generation",
    "Motion Control",
    "Visual Effects",
    "Lipsync Studio",
    "Camera Controls",
  ],
  "Resources": [
    "Community Gallery",
    "Blog",
    "Tutorials",
    "API Documentation",
    "Prompt Guide",
    "Changelog",
  ],
  "Company": [
    "About Us",
    "Careers",
    "Contact",
    "Press Kit",
    "Enterprise",
    "Partners",
  ],
  "Legal": [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Acceptable Use",
    "DMCA",
  ],
};

const socialLinks = [
  { name: "X / Twitter", icon: "𝕏" },
  { name: "Discord", icon: "⬡" },
  { name: "YouTube", icon: "▶" },
  { name: "Instagram", icon: "◎" },
  { name: "TikTok", icon: "♪" },
];

export default function Footer() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden"
      style={{ borderTop: "1px solid oklch(1 0 0 / 5%)" }}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, oklch(0.82 0.17 75 / 3%) 0%, transparent 70%)" }} />

      <div className="container relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16 p-8 rounded-xl border transition-all duration-300 hover:border-amber-500/30"
          style={{
            background: "linear-gradient(135deg, oklch(0.15 0.01 270 / 50%), oklch(0.12 0.01 200 / 30%))",
            borderColor: "oklch(1 0 0 / 8%)",
          }}>
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              Stay Updated
            </h3>
            <p className="text-sm mb-4" style={{ color: "oklch(0.55 0.01 270)" }}>
              Get the latest AI video and image generation tips, features, and updates delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Top section: Logo + Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.75 0.14 200))" }}>
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                <span className="text-white">Nex</span>
                <span className="gradient-text-amber">Gen</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "oklch(0.55 0.01 270)" }}>
              The most powerful AI video and image generation platform. Create beyond imagination.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-auto">
              {socialLinks.map((social, i) => (
                <button
                  key={i}
                  onClick={handleComingSoon}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    color: "oklch(0.60 0.01 270)",
                  }}
                  title={social.name}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, j) => (
                  <li key={j}>
                    <button
                      onClick={handleComingSoon}
                      className="text-sm transition-colors duration-300 hover:text-white text-left"
                      style={{ color: "oklch(0.50 0.01 270)" }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 5%)" }}>
          <p className="text-xs" style={{ color: "oklch(0.40 0.01 270)" }}>
            © 2026 NexGen AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={handleComingSoon} className="text-xs transition-colors hover:text-white"
              style={{ color: "oklch(0.40 0.01 270)" }}>
              Privacy
            </button>
            <button onClick={handleComingSoon} className="text-xs transition-colors hover:text-white"
              style={{ color: "oklch(0.40 0.01 270)" }}>
              Terms
            </button>
            <button onClick={handleComingSoon} className="text-xs transition-colors hover:text-white"
              style={{ color: "oklch(0.40 0.01 270)" }}>
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
