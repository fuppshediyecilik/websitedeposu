/*
 * Design: Obsidian Luxe — Social proof testimonials
 * Glassmorphism cards with brand logos
 */
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "NexGen AI has completely transformed our video production workflow. What used to take days now takes minutes.",
    author: "Sarah Chen",
    role: "Creative Director, Pixel Studios",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The image quality is unmatched. Our clients can't believe these are AI-generated. It's like having a full VFX team.",
    author: "Marcus Rivera",
    role: "Filmmaker & YouTuber",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "We switched from three different tools to just NexGen. The all-in-one platform saves us thousands per month.",
    author: "Emily Park",
    role: "Head of Content, TechFlow",
    avatar: "EP",
    rating: 5,
  },
];

const logos = [
  "TechCrunch", "Forbes", "Wired", "The Verge", "Product Hunt", "Y Combinator"
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container">
        {/* Press logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
            style={{ color: "oklch(0.45 0.01 270)" }}>
            Trusted by leading creators and featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {logos.map((logo, i) => (
              <span key={i} className="text-lg sm:text-xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  color: "oklch(0.35 0.01 270)",
                }}>
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="p-6 rounded-2xl"
              style={{
                background: "oklch(1 0 0 / 3%)",
                border: "1px solid oklch(1 0 0 / 6%)",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: "oklch(0.82 0.17 75)" }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.75 0.005 90)" }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i === 0 ? "oklch(0.82 0.17 75 / 15%)" : i === 1 ? "oklch(0.75 0.14 200 / 15%)" : "oklch(0.75 0.16 320 / 15%)",
                    color: i === 0 ? "oklch(0.82 0.17 75)" : i === 1 ? "oklch(0.75 0.14 200)" : "oklch(0.75 0.16 320)",
                  }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs" style={{ color: "oklch(0.50 0.01 270)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
