import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import ThreeBackground from "./three-background";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const textVariants = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg" data-testid="hero-section">
      <ThreeBackground />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-neon-purple/30 to-transparent rounded-full animate-float blur-xl top-20 left-10" style={{animationDelay: '0s'}} />
        <div className="absolute w-48 h-48 bg-gradient-to-r from-neon-blue/30 to-transparent rounded-full animate-float blur-xl top-60 right-15" style={{animationDelay: '2s'}} />
        <div className="absolute w-32 h-32 bg-gradient-to-r from-neon-green/30 to-transparent rounded-full animate-float blur-xl top-40 left-[70%]" style={{animationDelay: '4s'}} />
      </div>
      
      <motion.div 
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8 space-y-4" variants={textVariants}>
          <h1 className="text-7xl md:text-9xl font-black leading-none" data-testid="hero-headline">
            <motion.span className="block gradient-text neon-glow animate-glow-pulse" variants={textVariants}>
              Get Your
            </motion.span>
            <motion.span className="block gradient-text neon-glow relative" variants={textVariants}>
              Brand
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-neon-purple to-neon-blue animate-pulse" />
            </motion.span>
            <motion.span className="block gradient-text neon-glow animate-glow-pulse" variants={textVariants}>
              Noticed
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={textVariants}
          data-testid="hero-description"
        >
          Revolutionary AI-powered brand activations that create unforgettable experiences and drive massive engagement
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
          variants={textVariants}
        >
          <Button 
            size="lg"
            className="group bg-gradient-to-r from-neon-purple to-electric px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 animate-glow-pulse"
            data-testid="cta-custom-concept"
          >
            <span className="group-hover:animate-bounce-gentle">Request a Custom Concept</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="glass-effect px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 border-white/20"
            data-testid="cta-consultation"
          >
            Schedule a Virtual Consultation
            <Calendar className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
