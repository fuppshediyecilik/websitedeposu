/*
 * Design: Obsidian Luxe — Community gallery with masonry-style grid
 * Showcasing AI-generated content with hover effects
 */
import { motion } from "framer-motion";
import { Heart, Eye, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const GALLERY_BG = "https://private-us-east-1.manuscdn.com/sessionFile/pVdcYjuk75oenNU8a1tLn9/sandbox/fhimCMt0tgr8NR4E4AEy4U-img-5_1770712050000_na1fn_Y29tbXVuaXR5LWdhbGxlcnk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFZkY1lqdWs3NW9lbk5VOGExdExuOS9zYW5kYm94L2ZoaW1DTXQwdGdyOE5SNEU0QUV5NFUtaW1nLTVfMTc3MDcxMjA1MDAwMF9uYTFmbl9ZMjl0YlhWdWFYUjVMV2RoYkd4bGNuay5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ruGuZaHNW0XjnjgSFFjvo7C9tldygHcXeU5XYk6zKT0rB-d0VKrVTuOprzCd35bs0~0Mmtn6atA5Q76Ct8QEvcF3EpXcS7Q0NpuGH9Rhe9mbfQjE7K~FKWOfS8Rv8C1e71Pgar3J3cQYbZ6fe3IK-5YfbWoeFy-EovAThIxVMORx1mgLgqfF2HolOqUr3ZN0N-H~qDGfYydj9w-h~hCruOWjG0OiZomBl8z8pLjNkVm~Giij1bQS5mTGQ3sQlvv0IZepH3xjX4dBgOxbHbMfM1vQ39vzPh73ged7qtIrsZ04xMYf~BcKCd4vnmdkaBmIcXuHRo0SJ~TgBt2jggfjaQ__";

const galleryItems = [
  { title: "Cyberpunk City", author: "Alex Chen", likes: "12.4K", views: "89K", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop", tall: true },
  { title: "Ocean Dreams", author: "Maya Lin", likes: "8.2K", views: "45K", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", tall: false },
  { title: "Neon Portrait", author: "Jake Park", likes: "15.1K", views: "102K", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop", tall: false },
  { title: "Fantasy Realm", author: "Sara Moon", likes: "9.7K", views: "67K", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop", tall: true },
  { title: "Abstract Flow", author: "Leo Kim", likes: "6.3K", views: "38K", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=400&fit=crop", tall: false },
  { title: "Digital Nature", author: "Ava Rose", likes: "11.8K", views: "78K", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop", tall: false },
  { title: "Retro Future", author: "Max Volt", likes: "7.5K", views: "52K", img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&h=400&fit=crop", tall: true },
  { title: "Cosmic Voyage", author: "Luna Star", likes: "14.2K", views: "95K", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop", tall: false },
];

export default function GallerySection() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none">
        <img src={GALLERY_BG} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.15) saturate(0.5) blur(40px)", transform: "scale(1.1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.01 270 / 50%), oklch(0.10 0.01 270))" }} />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "oklch(0.82 0.17 75)" }}>
              Community Gallery
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-white">Created by </span>
              <span className="gradient-text-amber">Our Community</span>
            </h2>
          </div>
          <button
            onClick={handleComingSoon}
            className="self-start sm:self-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "oklch(1 0 0 / 5%)",
              border: "1px solid oklch(1 0 0 / 10%)",
              color: "white",
            }}
          >
            View All
          </button>
        </motion.div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid oklch(1 0 0 / 5%)" }}
              onClick={handleComingSoon}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.tall ? 'h-80' : 'h-52'}`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, oklch(0 0 0 / 80%) 0%, oklch(0 0 0 / 20%) 50%, transparent 100%)" }}>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-base font-semibold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-xs mb-3" style={{ color: "oklch(0.70 0.01 270)" }}>by {item.author}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-white/70">
                      <Heart className="w-3.5 h-3.5" style={{ color: "oklch(0.70 0.20 40)" }} />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-white/70">
                      <Eye className="w-3.5 h-3.5" />
                      {item.views}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/50 ml-auto" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
