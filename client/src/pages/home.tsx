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
import StickyParticlesBackground from "@/components/sticky-particles-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative" data-testid="home-page">
      {/* Sticky 3D Background */}
      <StickyParticlesBackground />
      
      {/* Page Sections */}
      <div className="relative z-10">
        <Navigation />
        <div data-section="hero">
          <HeroSection />
        </div>
        <div data-section="brand-activation">
          <BrandActivation />
        </div>
        <div data-section="products">
          <ProductsSection />
        </div>
        <div data-section="meet-talia">
          <MeetTalia />
        </div>
        <div data-section="beyond-booths">
          <BeyondBooths />
        </div>
        <div data-section="stats">
          <StatsSection />
        </div>
        <div data-section="cta">
          <CTASplit />
        </div>
        <div data-section="analytics">
          <AnalyticsSection />
        </div>
        <div data-section="clients">
          <ClientsMarquee />
        </div>
        <div data-section="footer">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
