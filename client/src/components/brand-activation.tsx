import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function BrandActivation() {
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
      className="relative py-32 overflow-hidden" 
      data-testid="brand-activation-section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-neon-purple/30 to-transparent rounded-full animate-spin-slow blur-2xl top-10 -left-10" />
          <div className="absolute w-64 h-64 bg-gradient-to-r from-neon-blue/30 to-transparent rounded-full animate-spin-slow blur-2xl top-50 -right-10" style={{animationDelay: '3s'}} />
        </div>
      </div>
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        <motion.div variants={fadeUpVariants}>
          <Badge 
            className="glass-effect px-6 py-2 rounded-full mb-8 text-sm font-semibold"
            data-testid="revolutionary-tech-badge"
          >
            <span className="gradient-text">Revolutionary Technology</span>
          </Badge>
        </motion.div>
        
        <motion.h2 
          className="text-5xl md:text-7xl font-black mb-8 gradient-text neon-glow"
          variants={fadeUpVariants}
          data-testid="ai-headline"
        >
          AI designed for brand activations
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          variants={fadeUpVariants}
          data-testid="ai-description"
        >
          Our cutting-edge artificial intelligence creates personalized, immersive experiences that adapt in real-time to your audience
        </motion.p>
        
        <motion.div variants={fadeUpVariants}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-neon-green to-neon-blue px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 animate-glow-pulse"
            data-testid="explore-ai-tech"
          >
            Explore Our AI Tech
            <Bot className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
