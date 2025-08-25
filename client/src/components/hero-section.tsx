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
      y: 100,
      rotateX: -45,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 1.2,
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
        className="relative z-10 text-center max-w-8xl mx-auto px-8"
        style={{ 
          y: prefersReducedMotion ? 0 : y, 
          opacity: prefersReducedMotion ? 1 : opacity,
          transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Premium badge */}
        <motion.div 
          variants={cinematicVariants}
          className="mb-8"
        >
          <div className="glass-premium px-8 py-4 rounded-full mx-auto w-fit interactive-glow mb-12">
            <div className="flex items-center gap-3">
              <Sparkles className="text-white/80 animate-pulse-neon" size={20} />
              <span className="text-white font-medium text-lg tracking-wider">
                AWARD-WINNING EXPERIENCES
              </span>
              <Sparkles className="text-white/80 animate-pulse-neon" size={20} />
            </div>
          </div>
        </motion.div>

        {/* 3D Cinematic Headline */}
        <motion.div className="mb-12 space-y-2 perspective-1000" variants={staggerContainer}>
          <motion.h1 
            className="text-8xl md:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter" 
            data-testid="hero-headline"
            style={{
              fontFamily: 'var(--font-display)',
            }}
          >
            <motion.span 
              className="block text-white font-black transform-gpu"
              variants={wordVariants}
              custom={0}
              style={{
                transformStyle: 'preserve-3d',
                textShadow: '0 0 40px rgba(255,255,255,0.3)'
              }}
            >
              Get Your
            </motion.span>
            <motion.span 
              className="block text-white font-black transform-gpu"
              variants={wordVariants}
              custom={1}
              style={{
                transformStyle: 'preserve-3d',
                textShadow: '0 0 40px rgba(255,255,255,0.3)'
              }}
            >
              Brand
            </motion.span>
            <motion.span 
              className="block text-white font-black transform-gpu"
              variants={wordVariants}
              custom={2}
              style={{
                transformStyle: 'preserve-3d',
                textShadow: '0 0 40px rgba(255,255,255,0.3)'
              }}
            >
              Noticed
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <motion.div
          variants={cinematicVariants}
          className="mb-16"
        >
          <p 
            className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light"
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
          className="flex flex-col lg:flex-row gap-8 justify-center items-center"
          variants={staggerContainer}
        >
          <motion.div variants={cinematicVariants}>
            <Button 
              size="lg"
              className="group px-12 py-6 text-xl font-bold hover:scale-105 transition-all duration-500 backdrop-blur-2xl border-2 border-white/20 rounded-2xl bg-white/10 hover:bg-white/20"
              data-testid="cta-custom-concept"
            >
              <motion.span 
                className="text-white font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Request a Custom Concept
              </motion.span>
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform duration-300" size={24} />
            </Button>
          </motion.div>
          
          <motion.div variants={cinematicVariants}>
            <Button 
              variant="outline"
              size="lg"
              className="group px-12 py-6 text-xl font-semibold hover:scale-105 transition-all duration-500 border-2 border-white/30 rounded-2xl backdrop-blur-xl bg-transparent hover:bg-white/10"
              data-testid="cta-consultation"
            >
              <span className="text-white group-hover:text-white/80 transition-colors font-semibold">
                Schedule a Virtual Consultation
              </span>
              <Calendar className="ml-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={cinematicVariants}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-white/60 text-sm font-light tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-neon-cyan to-transparent rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
