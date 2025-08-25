import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Zap, Target } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

export default function BrandActivation() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleBackground = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const cinematicVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -30,
      scale: 0.9
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
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: 0.3
      }
    }
  };

  const features = [
    { icon: Brain, text: "Neural Pattern Recognition" },
    { icon: Target, text: "Predictive Audience Analysis" },
    { icon: Zap, text: "Real-time Adaptation" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-40 overflow-hidden cinematic-gradient" 
      data-testid="brand-activation-section"
    >
      {/* Advanced morphing background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-[800px] h-[800px] morph-blob animate-morph opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(139,95,191,0.4) 0%, rgba(0,191,255,0.2) 50%, transparent 100%)',
            filter: 'blur(80px)',
            top: '-20%',
            left: '-10%',
            scale: scaleBackground
          }} 
        />
        
        <motion.div 
          className="absolute w-96 h-96 morph-blob animate-morph opacity-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,255,157,0.3) 0%, rgba(0,191,255,0.15) 50%, transparent 100%)',
            filter: 'blur(60px)',
            bottom: '-10%',
            right: '-5%',
            animationDelay: '4s',
            rotateY: rotateY
          }} 
        />

        {/* Floating neural network nodes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                hsl(${(i * 30) % 360}, 100%, 70%), 
                hsl(${(i * 30 + 60) % 360}, 100%, 60%))`,
              left: `${15 + (i * 6)}%`,
              top: `${25 + Math.sin(i) * 20}%`,
              boxShadow: `0 0 30px hsl(${(i * 30) % 360}, 100%, 70%)`,
            }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Connecting lines between nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="connectionGradient">
              <stop offset="0%" stopColor="var(--neon-purple)"/>
              <stop offset="50%" stopColor="var(--neon-cyan)"/>
              <stop offset="100%" stopColor="var(--neon-green)"/>
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${200 + i * 150} ${150 + Math.sin(i) * 100} Q ${400 + i * 100} ${200} ${600 + i * 80} ${250 + Math.cos(i) * 100}`}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isIntersecting ? { 
                pathLength: 1, 
                opacity: [0, 0.6, 0],
              } : {}}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </svg>
      </div>
      
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center px-8"
        ref={ref}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Premium badge with enhanced styling */}
        <motion.div variants={cinematicVariants} className="mb-12">
          <Badge 
            className="glass-heavy px-10 py-4 rounded-full text-lg font-bold interactive-glow border-2 border-neon-cyan/30"
            data-testid="revolutionary-tech-badge"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-neon" />
              <span className="holographic-text-alt">Revolutionary Technology</span>
              <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-neon" />
            </div>
          </Badge>
        </motion.div>
        
        {/* Cinematic headline with 3D effects */}
        <motion.h2 
          className="text-6xl md:text-8xl xl:text-9xl font-black mb-12 leading-[0.9] tracking-tight font-display"
          variants={cinematicVariants}
          data-testid="ai-headline"
        >
          <span className="block holographic-text neon-glow-intense">
            AI designed for
          </span>
          <span className="block holographic-text-alt neon-glow-intense relative">
            brand activations
            {/* Advanced underline effect */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple animate-holographic opacity-70 blur-sm" />
          </span>
        </motion.h2>
        
        {/* Enhanced description */}
        <motion.div
          variants={cinematicVariants}
          className="mb-16"
        >
          <p 
            className="text-2xl md:text-3xl text-white/85 max-w-4xl mx-auto leading-relaxed font-light"
            data-testid="ai-description"
            style={{ 
              fontFamily: 'var(--font-sans)',
              textShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          >
            Our <span className="holographic-text font-semibold">cutting-edge artificial intelligence</span> creates personalized, 
            immersive experiences that <span className="holographic-text-alt font-semibold">adapt in real-time</span> to your audience
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cinematicVariants}
              className="group glass-premium p-8 rounded-3xl card-premium interactive-glow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold holographic-text mb-2">
                {feature.text}
              </h3>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA */}
        <motion.div variants={cinematicVariants}>
          <Button 
            size="lg"
            className="group glass-heavy px-16 py-8 text-2xl font-bold hover:scale-105 transition-all duration-500 interactive-glow bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 backdrop-blur-2xl border-2 border-neon-green/30 rounded-3xl"
            data-testid="explore-ai-tech"
          >
            <motion.span 
              className="holographic-text-alt group-hover:animate-pulse-neon"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Explore Our AI Tech
            </motion.span>
            <Bot className="ml-4 group-hover:rotate-12 transition-transform duration-300" size={28} />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
