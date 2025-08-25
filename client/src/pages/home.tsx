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

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white" data-testid="home-page">
      <Navigation />
      <HeroSection />
      <BrandActivation />
      <ProductsSection />
      <MeetTalia />
      <BeyondBooths />
      <StatsSection />
      <CTASplit />
      <AnalyticsSection />
      <ClientsMarquee />
      <FooterSection />
    </div>
  );
}
