import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, Settings, ArrowRight, Rocket } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function CTASplit() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
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
      className="py-32" 
      data-testid="cta-split-section"
    >
      <motion.div 
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants}>
            <Card className="group glass-effect rounded-3xl p-12 hover:scale-105 transition-all duration-500 tilt-effect cursor-pointer h-full" data-testid="get-ideas-card">
              <div className="text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-neon-purple to-electric rounded-full mx-auto mb-8 flex items-center justify-center animate-bounce-gentle">
                    <Lightbulb size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 gradient-text" data-testid="get-ideas-title">
                    Get Ideas
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed" data-testid="get-ideas-description">
                    Explore our inspiration gallery and see how top brands create unforgettable experiences with our technology
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-neon-purple to-electric px-8 py-4 font-semibold group-hover:scale-105 transition-all duration-300 w-full"
                  data-testid="browse-gallery"
                >
                  Browse Gallery
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <Card className="group glass-effect rounded-3xl p-12 hover:scale-105 transition-all duration-500 tilt-effect cursor-pointer h-full" data-testid="request-customization-card">
              <div className="text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-green rounded-full mx-auto mb-8 flex items-center justify-center animate-bounce-gentle">
                    <Settings size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 gradient-text" data-testid="request-customization-title">
                    Request Customisation
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed" data-testid="request-customization-description">
                    Work with our team to create a bespoke brand activation tailored specifically to your vision and objectives
                  </p>
                </div>
                <Button 
                  variant="outline"
                  size="lg"
                  className="glass-effect border-white/20 px-8 py-4 font-semibold group-hover:scale-105 transition-all duration-300 w-full hover:bg-white/10"
                  data-testid="start-project"
                >
                  Start Project
                  <Rocket className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
