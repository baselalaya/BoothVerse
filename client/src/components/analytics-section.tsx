import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AnalyticsSection() {
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

  // Generate particles for drift effect
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${10 + i * 20}%`,
    delay: `${i * 3}s`,
    color: i % 3 === 0 ? 'bg-white' : i % 3 === 1 ? 'bg-neon-purple' : 'bg-neon-blue'
  }));

  return (
    <section 
      ref={ref}
      className="py-32 relative overflow-hidden" 
      data-testid="analytics-section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-purple-900/20" />
      
      <div className="absolute inset-0 pointer-events-none" data-testid="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 ${particle.color} rounded-full animate-particle-drift opacity-60`}
            style={{
              left: particle.left,
              animationDelay: particle.delay
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-black mb-8 gradient-text neon-glow"
          variants={fadeUpVariants}
          data-testid="analytics-headline"
        >
          Every activation is built for impact and proven with detailed analytics
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={fadeUpVariants}
          data-testid="analytics-description"
        >
          Real-time insights, comprehensive reporting, and actionable data to maximize your brand's return on experience
        </motion.p>
        
        <motion.div variants={fadeUpVariants}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-neon-purple to-electric px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 animate-glow-pulse"
            data-testid="see-what-you-get"
          >
            See What You Get
            <TrendingUp className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
