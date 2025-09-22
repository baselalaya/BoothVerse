import Navigation from "@/components/navigation";
import FooterSection from "@/components/footer-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function PersonalisedMerchPage() {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(112,66,210,0.12),transparent_60%),radial-gradient(60%_40%_at_80%_100%,rgba(34,212,253,0.10),transparent_60%)]"
      />
      <Navigation />
      <main className="relative z-10">
        {/* Hero */}
        <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] overflow-hidden text-center mb-8 sm:mb-14 rounded-[20px] sm:rounded-[28px] flex items-center justify-center">
          <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden">
            <video
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] md:w-[177.78vw] md:h-[56.25vw] max-w-none"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/customization.mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_10%,rgba(0,0,0,0)_40%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.85)_90%,rgba(0,0,0,1)_100%)]" />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_82%)]" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20 lg:py-24 flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl sm:text-4xl md:text-6xl font-black gradient-text px-3 leading-tight"
            >
              The Power of Live Customization
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-base sm:text-lg md:text-xl text-white/85 mt-3 sm:mt-4 max-w-[34ch] sm:max-w-3xl mx-auto leading-relaxed px-3"
            >
              Transform your brand events with live product customization. Our
              team develops unique, branded experiences that bring your products
              directly to your audience.
            </motion.p>
            <div className="mt-6 sm:mt-8 px-3">
              <Button variant="creativePrimary" size="lg" className="w-full md:w-auto text-base sm:text-lg py-6">
                Start Live Customization
              </Button>
            </div>
         </div>
        </section>

        {/* Custom Software & Hardware */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 leading-tight">
            Custom Software &amp; Hardware? Absolutely.
          </h2>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-8 px-2">
            We can customize any of your products with bespoke software or
            hardware solutions. Discover the endless engagement opportunities of
            live customization.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-2">
                Nike Custom Experience
              </h3>
              <p className="text-white/80 mb-4">
                We created a global campaign for Nike with a custom-built kiosk
                solution that allowed guests to live-customize shoes with
                graphics, names, and styles.
              </p>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Custom software development</li>
                <li>Hardware integration</li>
                <li>Scalable digital solution</li>
                <li>Real-time engagement</li>
                <li>Live event integration</li>
              </ul>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 overflow-hidden relative">
              <video
                className="w-full h-full object-cover aspect-video"
                src="/videos/ai-avatar.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
            </div>
          </div>
        </section>

        {/* Our Live Customization Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Our Live Customization Services
          </h2>
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            className="!px-2 sm:!px-4 md:!px-8 !overflow-visible"
          >
            {[
              {
                tag: "Precision",
                title: "Laser Engraving",
                desc: "Permanent brand impressions with precision engraving.",
                media: { type: "image", src: "/images/studio-ai-example.jpg" },
              },
              {
                tag: "On-Demand",
                title: "Product Printing",
                desc: "On-demand custom printing at events for unique takeaways.",
                media: { type: "video", src: "/videos/ai-parallax.mp4" },
              },
              {
                tag: "Personal Touch",
                title: "Product Personalization",
                desc: "Names, initials, or custom graphics printed live on-site.",
                media: { type: "image", src: "/images/alex.jpg" },
              },
              {
                tag: "Beauty",
                title: "Cosmetics Branding",
                desc: "Personalized packaging for beauty products.",
                media: { type: "image", src: "/images/shubneet.jpg" },
              },
              {
                tag: "Apparel",
                title: "Apparel Customization",
                desc: "Unique branded clothing created in real-time.",
                media: { type: "video", src: "/videos/ai-avatar.mp4" },
              },
              {
                tag: "Workflow",
                title: "End-to-End Execution",
                desc: "Design, build, and operate — we handle the full activation lifecycle.",
                media: { type: "image", src: "/images/robin.jpg" },
              },
            ].map((item, i) => (
              <SwiperSlide
                key={i}
                className="!w-[min(78vw,360px)] sm:!w-[min(70vw,360px)] md:!w-[min(38vw,360px)] xl:!w-[min(28vw,380px)] !min-w-[240px] md:!min-w-[300px]"
              >
                <div className="pb-8">
                  <MerchSlideCard {...item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Products We Customize for Brands */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight">
            Products We Customize for Brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ProductCard
              title="Beauty & Cosmetics"
              desc="Makeup palettes, perfumes, skincare."
              media={{ type: "image", src: "/images/shubneet.jpg" }}
              chip="Beauty"
            />
            <ProductCard
              title="Fashion & Apparel"
              desc="Shoes, tees, bags."
              media={{ type: "video", src: "/videos/1.mp4" }}
              chip="Fashion"
            />
            <ProductCard
              title="Tech & Accessories"
              desc="Phones, headphones, laptops."
              media={{ type: "video", src: "/videos/2.mp4" }}
              chip="Tech"
            />
            <ProductCard
              title="Lifestyle Products"
              desc="Water bottles, mugs, stationery."
              media={{ type: "image", src: "/images/robin.jpg" }}
              chip="Lifestyle"
            />
          </div>
        </section>

        {/* Works with Your Iboothme Setup */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight">
            Works with Your Iboothme Setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SetupCard
              title="Iboothme X"
              desc="Touchscreen photo booth integration."
              media={{ type: "video", src: "/videos/ai-tech.mp4" }}
              chip="Touchscreen"
            />
            <SetupCard
              title="Cabine X"
              desc="Compact live customization booth."
              media={{ type: "image", src: "/images/booth_unit_2.webp" }}
              chip="Compact"
            />
            <SetupCard
              title="Glossbooth X"
              desc="Premium customization photo booth."
              media={{ type: "image", src: "/images/booth_unit_4.webp" }}
              chip="Premium"
            />
            <SetupCard
              title="iPad & Touch Screens"
              desc="Portable and adaptable live customization modules."
              media={{ type: "video", src: "/videos/ai-avatar.mp4" }}
              chip="Portable"
            />
          </div>
        </section>

        {/* Why Live Customization Wins */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight">
            Why Live Customization Wins
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {[
              { k: "85%", v: "Higher Engagement" },
              { k: "3x", v: "Brand Recall" },
              { k: "92%", v: "Keep Rate" },
              { k: "67%", v: "Social Shares" },
            ].map((s, i) => (
              <div
                key={i}
                className="relative rounded-3xl lg:rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center overflow-hidden transition-all duration-500 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-white/20"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_60px_at_50%_0%,rgba(255,255,255,0.12),transparent)]" />
                <div className="text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  {s.k}
                </div>
                <div className="text-sm md:text-base text-white/70 tracking-wide uppercase">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Service
              title="Instant Brand Connection"
              desc="Guests leave with branded items they love."
            />
            <Service
              title="Social Media Amplification"
              desc="Unique shareable moments fuel organic reach."
            />
            <Service
              title="Event Highlights"
              desc="Customization creates unforgettable activations."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-center">
          <div className="text-center mb-8 opacity-60">⸻</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 px-2 leading-tight">
            Ready to Transform Your Brand Events?
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto mb-5 sm:mb-6 px-2">
            Join leading brands who use live customization to create deeper
            connections, drive engagement, and amplify their brand visibility at
            events.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 px-3 sm:px-0">
            <Button variant="creativePrimary" size="lg" className="w-full md:w-auto text-base sm:text-lg py-6">
              Start Your Customization Journey
            </Button>
            <Button variant="creativeSecondary" size="lg" className="w-full md:w-auto text-base sm:text-lg py-6">
              Book a Live Demo
            </Button>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

function Service({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-white/75 text-sm">{desc}</div>
    </div>
  );
}

type Media = { type: "image" | "video"; src: string };

function MerchSlideCard({
  tag,
  title,
  desc,
  media,
}: {
  tag: string;
  title: string;
  desc: string;
  media?: Media;
}) {
  return (
    <div className="group relative aspect-[7/12] w-full rounded-[34px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out will-change-transform hover:scale-[1.02] hover:-rotate-[0.6deg]">
      {media && (
        <div className="absolute inset-0 overflow-hidden">
          {media.type === "image" ? (
            <img
              src={media.src}
              alt={title}
              className="w-full h-full object-cover will-change-transform transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/60" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
          <div className="pointer-events-none absolute -inset-px rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,0.45)]" />
        </div>
      )}
      <div className="absolute inset-0 flex items-end p-5 md:p-6">
        <div>
          <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 uppercase tracking-wide mb-2">
            {tag}
          </span>
          <div className="text-white/95 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] text-base md:text-lg font-semibold leading-snug">
            {title}
          </div>
          <div className="text-white/80 text-xs md:text-sm mt-1 max-w-[28ch]">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  title,
  desc,
  media,
  chip,
}: {
  title: string;
  desc: string;
  media?: Media;
  chip?: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500">
      {media && (
        <div className="relative h-40 md:h-44 overflow-hidden">
          {media.type === "image" ? (
            <img
              src={media.src}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          {chip && (
            <span className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 uppercase tracking-wide">
              {chip}
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-white/75 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function SetupCard({
  title,
  desc,
  media,
  chip,
}: {
  title: string;
  desc: string;
  media?: Media;
  chip?: string;
}) {
  return (
    <div className="group relative aspect-[7/12] w-full rounded-[34px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out will-change-transform hover:scale-[1.02] hover:-rotate-[0.6deg]">
      {media && (
        <div className="absolute inset-0 overflow-hidden">
          {media.type === "image" ? (
            <img
              src={media.src}
              alt={title}
              className="w-full h-full object-cover will-change-transform transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          {/* glossy sweep */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.09)_100%)] opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:translate-y-[-2%]" />
          {/* readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/60" />
          {/* fine ring + ambient glow */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
          <div className="pointer-events-none absolute -inset-px rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,0.45)]" />
        </div>
      )}
      <div className="absolute inset-0 flex items-end p-5 md:p-6">
        <div>
          {chip && (
            <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 uppercase tracking-wide mb-2">
              {chip}
            </span>
          )}
          <div className="text-white/95 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] text-base md:text-lg font-semibold leading-snug">
            {title}
          </div>
          <div className="text-white/80 text-xs md:text-sm mt-1 max-w-[30ch] line-clamp-2">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}
