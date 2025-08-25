import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Bot } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const features = [
  "Advanced facial recognition & emotion detection",
  "Natural language processing in 12+ languages",
  "Real-time brand personality adaptation"
];

export default function MeetTalia() {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-32 relative overflow-hidden" 
      data-testid="meet-talia-section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <path 
              d="M0,300 Q250,100 500,300 T1000,300" 
              stroke="url(#circuit-gradient)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.6"
            >
              <animate attributeName="strokeDasharray" values="0,1000;1000,0;0,1000" dur="8s" repeatCount="indefinite" />
            </path>
            <defs>
              <linearGradient id="circuit-gradient">
                <stop offset="0%" stopColor="var(--neon-purple)"/>
                <stop offset="50%" stopColor="var(--neon-blue)"/>
                <stop offset="100%" stopColor="var(--neon-green)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-black mb-8 gradient-text neon-glow"
              variants={fadeUpVariants}
              data-testid="meet-talia-headline"
            >
              Meet Talia
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              variants={fadeUpVariants}
              data-testid="talia-description"
            >
              Our AI-powered robot assistant creates personalized brand experiences through advanced facial recognition, natural language processing, and real-time emotion analysis.
            </motion.p>
            
            <motion.ul 
              className="space-y-4 mb-12"
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-lg"
                  variants={fadeUpVariants}
                  data-testid={`talia-feature-${index}`}
                >
                  <CheckCircle className="text-neon-green mr-4 flex-shrink-0" size={24} />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div variants={fadeUpVariants}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-neon-purple to-electric px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 animate-glow-pulse"
                data-testid="discover-talia"
              >
                Discover Talia
                <Bot className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            <div className="relative rounded-2xl overflow-hidden animate-glow-pulse">
              <img 
                src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Talia AI robot with holographic interface" 
                className="rounded-2xl w-full"
                data-testid="talia-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              <div className="absolute top-4 right-4 glass-effect px-4 py-2 rounded-full" data-testid="live-indicator">
                <span className="text-sm font-semibold text-neon-green">● LIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
