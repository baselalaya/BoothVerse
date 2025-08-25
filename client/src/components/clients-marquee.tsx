import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const brands = [
  "Apple", "Google", "Nike", "Coca-Cola", "Samsung", 
  "Tesla", "Netflix", "Spotify", "Amazon", "Microsoft",
  "Adobe", "Intel", "IBM", "Oracle", "PayPal"
];

export default function ClientsMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden" 
      data-testid="clients-marquee-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text" data-testid="clients-headline">
            Trusted by Global Brands
          </h2>
          <p className="text-xl text-gray-400" data-testid="clients-description">
            Join the world's most innovative companies creating unforgettable experiences
          </p>
        </motion.div>
        
        <motion.div 
          className="relative overflow-hidden"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <div 
            className={`flex ${prefersReducedMotion ? '' : 'animate-marquee hover:pause'}`}
            data-testid="marquee-container"
            onMouseEnter={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.animationPlayState = 'running';
              }
            }}
          >
            {/* Double the brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand}-${index}`} className="flex-shrink-0 mx-8">
                <Badge 
                  className="glass-effect px-6 py-4 rounded-full hover:scale-110 transition-all duration-300 hover:animate-glow-pulse cursor-pointer"
                  data-testid={`brand-logo-${brand.toLowerCase()}`}
                >
                  <span className="text-xl font-bold gradient-text">
                    {brand}
                  </span>
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
