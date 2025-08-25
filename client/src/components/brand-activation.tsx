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
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleBackground = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

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
      className="relative py-24 overflow-hidden bg-transparent" 
      data-testid="brand-activation-section"
      data-section="brand-activation"
    >
      
      <motion.div 
        className="relative z-20 max-w-6xl mx-auto text-center px-8"
        ref={ref}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Glass-morphism badge */}
        <motion.div variants={cinematicVariants} className="mb-8">
          <Badge 
            className="backdrop-blur-3xl px-8 py-3 rounded-full text-base font-semibold bg-white/5 border border-white/10 text-white shadow-2xl"
            data-testid="revolutionary-tech-badge"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            Revolutionary Technology
          </Badge>
        </motion.div>
        
        {/* Glass-morphism headline container */}
        <motion.div
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl"
          variants={cinematicVariants}
          style={{
            backdropFilter: 'blur(15px) saturate(150%)'
          }}
        >
          <h2 
            className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-white"
            data-testid="ai-headline"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.4)'
            }}
          >
            <span className="block text-white font-black">
              AI designed for
            </span>
            <span className="block text-white font-black">
              brand activations
            </span>
          </h2>
        </motion.div>
        
        {/* Glass-morphism description */}
        <motion.div
          variants={cinematicVariants}
          className="mb-12 backdrop-blur-2xl bg-white/3 border border-white/8 rounded-2xl p-6 shadow-xl"
          style={{
            backdropFilter: 'blur(12px) saturate(140%)'
          }}
        >
          <p 
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
            data-testid="ai-description"
          >
            Our <span className="text-white font-semibold">cutting-edge artificial intelligence</span> creates personalized, 
            immersive experiences that <span className="text-white font-semibold">adapt in real-time</span> to your audience
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cinematicVariants}
              className="group backdrop-blur-2xl p-6 rounded-xl bg-white/3 border border-white/8 hover:bg-white/8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105"
              style={{
                backdropFilter: 'blur(15px) saturate(160%)'
              }}
            >
              <div className="w-12 h-12 bg-white/15 backdrop-blur-xl rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/10">
                <feature.icon className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.text}
              </h3>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Clean CTA */}
        <motion.div variants={cinematicVariants}>
          <Button 
            size="lg"
            className="group px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-3xl border-2 border-white/15 rounded-xl bg-white/8 hover:bg-white/15 shadow-2xl hover:shadow-white/10"
            data-testid="explore-ai-tech"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)'
            }}
          >
            <span className="text-white font-bold">
              Explore Our AI Tech
            </span>
            <Bot className="ml-3 group-hover:rotate-6 transition-transform duration-300" size={20} />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
