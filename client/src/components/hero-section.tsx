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
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-cinematic"
      data-testid="hero-section"
    >
      <ThreeBackground />
      
      {/* Advanced floating morphing shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main holographic orbs */}
        <div 
          className="absolute w-96 h-96 morph-blob animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(139,95,191,0.2) 0%, rgba(0,191,255,0.1) 50%, transparent 100%)',
            filter: 'blur(40px)',
            top: '10%',
            left: '5%',
            animationDelay: '0s'
          }} 
        />
        
        <div 
          className="absolute w-64 h-64 morph-blob animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(0,191,255,0.25) 0%, rgba(0,255,157,0.1) 50%, transparent 100%)',
            filter: 'blur(60px)',
            top: '15%',
            right: '10%',
            animationDelay: '3s'
          }} 
        />
        
        <div 
          className="absolute w-48 h-48 morph-blob animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,255,0.2) 0%, rgba(139,95,191,0.1) 50%, transparent 100%)',
            filter: 'blur(50px)',
            bottom: '20%',
            left: '60%',
            animationDelay: '6s'
          }} 
        />

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-particle-galaxy"
            style={{
              background: `linear-gradient(45deg, 
                hsl(${(i * 45) % 360}, 100%, 70%), 
                hsl(${(i * 45 + 60) % 360}, 100%, 60%))`,
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 1.5}s`,
              boxShadow: `0 0 20px hsl(${(i * 45) % 360}, 100%, 70%)`,
            }}
          />
        ))}
      </div>
      
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
              <Sparkles className="text-neon-cyan animate-pulse-neon" size={20} />
              <span className="holographic-text font-semibold text-lg tracking-wider">
                AWARD-WINNING EXPERIENCES
              </span>
              <Sparkles className="text-neon-purple animate-pulse-neon" size={20} />
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
              className="block holographic-text neon-glow-intense animate-holographic transform-gpu"
              variants={wordVariants}
              custom={0}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              Get Your
            </motion.span>
            <motion.span 
              className="block holographic-text-alt neon-glow-intense relative transform-gpu"
              variants={wordVariants}
              custom={1}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              Brand
              {/* Sophisticated underline animation */}
              <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green animate-holographic opacity-80 blur-sm" />
              <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green animate-holographic" />
            </motion.span>
            <motion.span 
              className="block holographic-text neon-glow-intense animate-holographic transform-gpu"
              variants={wordVariants}
              custom={2}
              style={{
                transformStyle: 'preserve-3d',
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
            Revolutionary <span className="holographic-text font-semibold">AI-powered</span> brand activations that create 
            <span className="holographic-text-alt font-semibold"> unforgettable experiences</span> and drive 
            <span className="holographic-text font-semibold">massive engagement</span>
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 justify-center items-center"
          variants={staggerContainer}
        >
          <motion.div variants={cinematicVariants}>
            <Button 
              size="lg"
              className="group glass-heavy px-12 py-6 text-xl font-bold hover:scale-105 transition-all duration-500 interactive-glow bg-gradient-to-r from-neon-purple/20 to-electric/20 backdrop-blur-2xl border-2 border-neon-purple/30 rounded-2xl"
              data-testid="cta-custom-concept"
            >
              <motion.span 
                className="holographic-text group-hover:animate-pulse-neon"
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
              className="group glass-premium px-12 py-6 text-xl font-semibold hover:scale-105 transition-all duration-500 border-2 border-white/20 rounded-2xl backdrop-blur-xl"
              data-testid="cta-consultation"
            >
              <span className="text-white/90 group-hover:text-white transition-colors">
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
