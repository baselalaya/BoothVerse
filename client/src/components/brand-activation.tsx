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
      className="relative py-24 overflow-hidden bg-black" 
      data-testid="brand-activation-section"
    >
      
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center px-8"
        ref={ref}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Clean badge */}
        <motion.div variants={cinematicVariants} className="mb-8">
          <Badge 
            className="backdrop-blur-xl px-8 py-3 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white"
            data-testid="revolutionary-tech-badge"
          >
            Revolutionary Technology
          </Badge>
        </motion.div>
        
        {/* Clean headline */}
        <motion.h2 
          className="text-4xl md:text-6xl xl:text-7xl font-black mb-8 leading-tight tracking-tight text-white"
          variants={cinematicVariants}
          data-testid="ai-headline"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.3)'
          }}
        >
          <span className="block text-white font-black">
            AI designed for
          </span>
          <span className="block text-white font-black">
            brand activations
          </span>
        </motion.h2>
        
        {/* Clean description */}
        <motion.div
          variants={cinematicVariants}
          className="mb-12"
        >
          <p 
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
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
              className="group backdrop-blur-xl p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
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
            className="group px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-2xl border-2 border-white/20 rounded-xl bg-white/10 hover:bg-white/20"
            data-testid="explore-ai-tech"
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
