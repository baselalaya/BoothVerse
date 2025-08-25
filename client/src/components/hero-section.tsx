import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import ThreeBackground from "./three-background";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const cinematicVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 90
    },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.19, 1, 0.22, 1],
        delay: custom * 0.2
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-brand"
      data-testid="hero-section"
    >
      <ThreeBackground />
      
      
      <motion.div 
        className="relative z-10 text-center max-w-7xl mx-auto px-6 py-8"
        style={{ 
          y: prefersReducedMotion ? 0 : y, 
          opacity: prefersReducedMotion ? 1 : opacity,
          transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >

        {/* Cinematic Headline */}
        <motion.div className="mb-8 md:mb-12" variants={cinematicVariants}>
          <h1 
            className="text-6xl md:text-8xl xl:text-9xl font-black leading-[0.85] tracking-normal text-white mb-4" 
            data-testid="hero-headline"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.3)'
            }}
          >
            <span className="block text-white font-black mb-1">Get Your</span>
            <span className="block text-white font-black mb-1">Brand</span>
            <span className="block text-white font-black">Noticed</span>
          </h1>
        </motion.div>
        
        <motion.div
          variants={cinematicVariants}
          className="mb-10 md:mb-16"
        >
          <p 
            className="text-xl md:text-2xl xl:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light px-4"
            data-testid="hero-description"
            style={{ 
              fontFamily: 'var(--font-sans)',
              textShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          >
            Revolutionary <span className="text-white/90 font-semibold">AI-powered</span> brand activations that create 
            <span className="text-white/90 font-semibold"> unforgettable experiences</span> and drive 
            <span className="text-white/90 font-semibold">massive engagement</span>
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center max-w-4xl mx-auto mb-16 px-4"
          variants={cinematicVariants}
        >
          <Button 
            size="lg"
            className="group px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-2xl border-2 border-white/20 rounded-2xl bg-white/10 hover:bg-white/20 min-w-[280px]"
            data-testid="cta-custom-concept"
          >
            <span className="text-white font-bold">
              Request a Custom Concept
            </span>
            <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform duration-300" size={20} />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="group px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-500 border-2 border-white/30 rounded-2xl backdrop-blur-xl bg-transparent hover:bg-white/10 min-w-[280px]"
            data-testid="cta-consultation"
          >
            <span className="text-white group-hover:text-white/80 transition-colors font-semibold">
              Schedule a Virtual Consultation
            </span>
            <Calendar className="ml-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={cinematicVariants}
          className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/60 text-xs md:text-sm font-light tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
