import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const stats = [
  { id: "brand-engagements", value: 6, suffix: "M+", label: "Brand Engagements" },
  { id: "client-satisfaction", value: 98, suffix: "%", label: "Client Satisfaction" },
  { id: "brand-partnerships", value: 150, suffix: "+", label: "Premium Brand Partnerships" }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      motionValue.set(value);
    } else if (prefersReducedMotion) {
      springValue.set(value);
    }
  }, [isInView, motionValue, value, prefersReducedMotion, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>{prefersReducedMotion ? value + suffix : "0" + suffix}</span>;
}

export default function StatsSection() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.3
      }
    }
  };

  const itemVariants = {
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
      className="py-32 relative overflow-hidden" 
      data-testid="stats-section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-32 h-32 bg-gradient-to-r from-neon-purple/50 to-transparent rounded-full animate-pulse blur-xl top-20 left-10" />
        <div className="absolute w-24 h-24 bg-gradient-to-r from-neon-blue/50 to-transparent rounded-full animate-pulse blur-xl top-60 right-15" style={{animationDelay: '2s'}} />
        <div className="absolute w-16 h-16 bg-gradient-to-r from-neon-green/50 to-transparent rounded-full animate-pulse blur-xl top-40 left-[70%]" style={{animationDelay: '4s'}} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-black mb-20 gradient-text"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          data-testid="stats-headline"
        >
          Proven Impact
        </motion.h2>
<<<<<<< HEAD
        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 px-1"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          Measurable performance in social reach, engagement, and activations.
        </motion.p>

        {/* Stat cards with premium shells */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
=======
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
>>>>>>> parent of fc3d337 (final)
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} className="group" variants={itemVariants}>
              <div className="text-6xl md:text-8xl font-black gradient-text neon-glow mb-4" data-testid={`stat-value-${stat.id}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300" data-testid={`stat-label-${stat.id}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
