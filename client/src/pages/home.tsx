import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import BrandActivation from "@/components/brand-activation";
import ProductsSection from "@/components/products-section";
import MeetTalia from "@/components/meet-talia";
import BeyondBooths from "@/components/beyond-booths";
import StatsSection from "@/components/stats-section";
import CTASplit from "@/components/cta-split";
import AnalyticsSection from "@/components/analytics-section";
import ClientsMarquee from "@/components/clients-marquee";
import FooterSection from "@/components/footer-section";
import ThreeDShape from "@/components/three-d-shape";
import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import Seo from "@/components/seo";
import { applySeoToHead, fetchSeoConfig } from "@/lib/seoOverride";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { testimonials } from "@/data/testimonials";
import { getLogoUrl } from "@/lib/siteMeta";
const RobotTaliaViewer = lazy(() => import("@/components/robot-talia-viewer"));
// removed hook-based SEO override usage

export default function Home() {
  const [fadeHero, setFadeHero] = useState(false);
  const [fadeBrand, setFadeBrand] = useState(false);

  const testimonialJsonLd = useMemo(() => {
    const aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (
        testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length
      ).toFixed(2),
      reviewCount: testimonials.length,
      bestRating: "5",
      worstRating: "4"
    };

    const reviewSchemas = testimonials.map((item) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: item.name,
        jobTitle: item.role,
        worksFor: item.company
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: "5",
        worstRating: "1"
      },
      reviewBody: item.quote,
      itemReviewed: {
        "@type": "Organization",
        name: "iboothme",
        url: "https://www.iboothme.com",
        logo: getLogoUrl()
      }
    }));

    return [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "iboothme",
        aggregateRating,
        url: "https://www.iboothme.com",
        logo: getLogoUrl()
      },
      ...reviewSchemas
    ];
  }, []);

  useEffect(() => {
    // Fetch and apply runtime SEO overrides
    (async () => { const cfg = await fetchSeoConfig('/'); if (cfg) applySeoToHead(cfg); })();

    if (typeof window === 'undefined') return;

    const heroSection = document.querySelector('[data-section="hero"]');
    const brandSection = document.querySelector('[data-section="brand-activation"]');

    if (!heroSection || !brandSection) return;

    const observerOptions = { root: null, threshold: Array.from({ length: 101 }, (_, i) => i / 100) };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === heroSection) {
          setFadeHero(entry.intersectionRatio < 0.7);
        } else if (entry.target === brandSection) {
          setFadeBrand(entry.intersectionRatio > 0.3);
        }
      });
    }, observerOptions);

    observer.observe(heroSection);
    observer.observe(brandSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Seo
        title="Experiential Marketing Tech & Photo Booths"
        description="iboothme delivers cutting-edge experiential marketing: AI tech, gamifications, analytics, and immersive photo/video booths for brand activations."
        canonical="/"
        ogImage="/images/icon.svg"
        keywords={["experiential marketing", "photo booth", "AI", "gamification", "brand activation"]}
        jsonLd={testimonialJsonLd}
      />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ThreeDShape />
        {/* Readability overlay to blend background with content */}
        <div className="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>
      <div className="relative z-10">
        <div className="min-h-screen text-white" data-testid="home-page">
        <Navigation />
        <div
          data-section="hero"
          className={`relative transition-opacity duration-1000 ${fadeHero ? 'opacity-30' : 'opacity-100'}`}
        >
          <HeroSection />
        </div>
        <div
          data-section="brand-activation"
          className={`relative overflow-hidden transition-opacity duration-1000 flex items-center justify-center px-6 max-w-full mx-auto bg-opacity-50 backdrop-blur-md ${fadeBrand ? 'opacity-100' : 'opacity-0'}`}
          style={{ minHeight: '300px' }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: -2 }}
            src="/video/iboothme_f.mp4"
            autoPlay
            loop
            muted
            preload="metadata"
            playsInline
          />
          <div className="relative max-w-4xl mx-auto">
            <BrandActivation />
        </div>
        </div>
        <div data-section="products" className="py-12 md:py-16">
          <ProductsSection />
        </div>
          <div data-section="meet-talia" className="py-12 md:py-16">
          <MeetTalia />
        </div>
        {/* Interactive 3D — Robot Talia (lazy-loaded on view) */}
        <div data-section="beyond-booths" className="py-12 md:py-16">
          <BeyondBooths />
        </div>
        <div data-section="stats" className="py-12 md:py-16">
          <StatsSection />
        </div>
        <div data-section="testimonials" className="py-12 md:py-16">
          <section className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold">Trusted by Experiential Leaders</h2>
              <p className="text-white/70 mt-2 text-sm md:text-base">
                Hear how global brands activate with iboothme event technology.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={`${item.name}-${item.company}`} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-2 text-yellow-300 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.round(item.rating) ? '★' : '☆'}</span>
                    ))}
                    <span className="text-white/70 text-xs">{item.rating.toFixed(1)}/5</span>
                  </div>
                  <p className="mt-4 text-white/85 text-sm md:text-base leading-relaxed">“{item.quote}”</p>
                  <div className="mt-5">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-white/70 text-sm">{item.role}, {item.company}</div>
                    {item.location && <div className="text-white/50 text-xs mt-1">{item.location}</div>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <div data-section="cta" className="py-12 md:py-16">
          <CTASplit />
        </div>
        <div data-section="analytics" className="py-12 md:py-16">
          <AnalyticsSection />
        </div>
        <div data-section="clients" className="py-12 md:py-16">
          <ClientsMarquee />
        </div>
        <div data-section="footer">
          <FooterSection />
        </div>
      </div>
    </div>
    </>
  );
}

// function LazyRobot() {
//   const [ref, visible] = useIntersectionObserver({ root: null, threshold: 0.15 });
//   return (
//     <div ref={ref as any}>
//       {visible ? (
//         <Suspense fallback={<div className="w-full h-[520px] rounded-3xl border border-white/10 bg-black/30 animate-pulse" />}> 
//           <RobotTaliaViewer src="/models/robot-talia.glb" className="w-full h-[520px] rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/30" />
//         </Suspense>
//       ) : (
//         <div className="w-full h-[520px] rounded-3xl border border-white/10 bg-black/30" />
//       )}
//     </div>
//   );
// }
