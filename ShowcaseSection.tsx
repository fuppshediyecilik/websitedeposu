/*
 * Design: Obsidian Luxe — Featured showcase carousel
 * Higgsfield-style featured content cards with glassmorphism
 */
import { motion } from "framer-motion";
import { ArrowRight, Star, Flame, Crown } from "lucide-react";
import { toast } from "sonner";

const AI_VIDEO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/pVdcYjuk75oenNU8a1tLn9/sandbox/fhimCMt0tgr8NR4E4AEy4U-img-2_1770712049000_na1fn_YWktdmlkZW8tc2hvd2Nhc2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFZkY1lqdWs3NW9lbk5VOGExdExuOS9zYW5kYm94L2ZoaW1DTXQwdGdyOE5SNEU0QUV5NFUtaW1nLTJfMTc3MDcxMjA0OTAwMF9uYTFmbl9ZV2t0ZG1sa1pXOHRjMmh2ZDJOaGMyVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WyZoDu1~QWRIsVtZUFEdVo0IkMqcs-zDnS2SO4sRvFJESmndy~GWmo3~Nbbw1cl8CqfHoxSvNceuIuO0qd6P1rOgpNrXlW9FySJ4LMJ6N6slbF-F8mWUrp38JSHS7ccNrgTCKa7KYIWJ4P7rMJIrnM~3AuTMpWsl87LW46tJrCptVYnvxTbssfWvMiL95PpaZQfGB56GOAPrbQqSOySAD5p~MtvLjUS90Nyl4XCXzX3-~yTVTp8yEZMYsROmA7FcPxyBenj9qJe8rRPHUe~Tuvp3L-NvdJH5vCrJhyrxkBEThAnMT6OX5sBQrsEWtAaY7W16-rEd2E9UxAdXWqg3IQ__";

const AI_IMAGE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/pVdcYjuk75oenNU8a1tLn9/sandbox/fhimCMt0tgr8NR4E4AEy4U-img-3_1770712039000_na1fn_YWktaW1hZ2UtZ2Vu.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFZkY1lqdWs3NW9lbk5VOGExdExuOS9zYW5kYm94L2ZoaW1DTXQwdGdyOE5SNEU0QUV5NFUtaW1nLTNfMTc3MDcxMjAzOTAwMF9uYTFmbl9ZV2t0YVcxaFoyVXRaMlZ1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JIaCByaR-61Rq87ShXuSETy2YmPhNGbOmz~SsjArYX8S8Mkj2Nz8AkzAOSbSxnISJ53EcnISC7TWmgu7NtZKlqSdLtTpFzUo5jcluV020JkeSSCWOFJL7VwGTZiQmdpWRI38U62hk2PZWm-4QYBLfkQGt7FfuVojQqquUyd6mzlbd8t3Q~U5QVrlgfuemlFS1ank91jAsHZUiqgjrgbRtni2rnc8Lht6IYOvEIQNRmG3wy3xyWDNp9xCY78G6vixmbdXhdAw0egVg4Yzx78x8AIcvAZTUullVa1fG90pkIJ2peonW-YrRq3b5k750CpZaD3OtfPOqNyqAyUoAbvjuA__";

const VFX_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/pVdcYjuk75oenNU8a1tLn9/sandbox/fhimCMt0tgr8NR4E4AEy4U-img-4_1770712042000_na1fn_ZmVhdHVyZS1lZmZlY3Rz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcFZkY1lqdWs3NW9lbk5VOGExdExuOS9zYW5kYm94L2ZoaW1DTXQwdGdyOE5SNEU0QUV5NFUtaW1nLTRfMTc3MDcxMjA0MjAwMF9uYTFmbl9abVZoZEhWeVpTMWxabVpsWTNSei5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZQk6z9bcMAkThsmrN6ialFxix~1bLbRpgYVbtcqa~FxUL4dvDXS8a8RXrZ9~yOs2qiYb8rb0hnxGFmBEOo8Bjyd7GkSSuw2UdyKQrPBOBvQIlNyuDD1BekyIAnXbmof8iLPbyTjPiPuJyrpXJlDg9AMFuCX6kVdTD6cl7mec8jpJ4aS1r3qHbZDBLvlDnHc0F9GUxi7ze1OHys4K1KySINlSHBnp-vzzFam3Vqndb~ymhClGLZZW4F--baoCfI6Cb00KHvgq-fHsTQUxrAJx1IGu3UOA7fOYyeZMlO9AkFeNVIibh5V5G5Rf3Ryubfdd0m3MKCO~XYqFT5d-cASaRg__";

const showcaseItems = [
  {
    badge: "EXCLUSIVE",
    badgeIcon: Crown,
    badgeColor: "oklch(0.82 0.17 75)",
    title: "Cinema-Grade Video Generation",
    description: "Create stunning 4K videos up to 60 seconds with natural motion and cinematic quality.",
    image: AI_VIDEO_IMG,
    cta: "Try Video Gen",
  },
  {
    badge: "NEW",
    badgeIcon: Star,
    badgeColor: "oklch(0.75 0.14 200)",
    title: "Photorealistic Image Creation",
    description: "Generate breathtaking images with unprecedented detail and artistic control.",
    image: AI_IMAGE_IMG,
    cta: "Create Images",
  },
  {
    badge: "TRENDING",
    badgeIcon: Flame,
    badgeColor: "oklch(0.70 0.20 40)",
    title: "Pro Visual Effects Studio",
    description: "Hollywood-grade VFX at your fingertips. Fire, water, lightning, and 200+ effects.",
    image: VFX_IMG,
    cta: "Explore VFX",
  },
];

export default function ShowcaseSection() {
  const handleComingSoon = () => {
    toast("Feature coming soon", { description: "This feature is currently under development." });
  };

  return (
    <section id="explore" className="relative py-24 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "oklch(0.82 0.17 75)" }}
          >
            Featured
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <span className="text-white">What Will You </span>
            <span className="gradient-text-mixed">Create Today?</span>
          </h2>
        </motion.div>

        {/* Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "oklch(0.14 0.01 270)",
                border: "1px solid oklch(1 0 0 / 6%)",
              }}
              onClick={handleComingSoon}
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, oklch(0.14 0.01 270) 0%, oklch(0.14 0.01 270 / 20%) 60%, transparent 100%)"
                }} />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{
                      background: `color-mix(in oklch, ${item.badgeColor} 15%, transparent)`,
                      color: item.badgeColor,
                      border: `1px solid color-mix(in oklch, ${item.badgeColor} 25%, transparent)`,
                    }}
                  >
                    <item.badgeIcon className="w-3 h-3" />
                    {item.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.60 0.01 270)" }}>
                  {item.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{ color: "oklch(0.82 0.17 75)" }}
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
