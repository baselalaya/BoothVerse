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
<<<<<<< HEAD
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs tracking-wide uppercase text-white/80 mb-3 sm:mb-4">
            The Hub
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 sm:mb-3 leading-tight">Get Ideas</h3>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto px-1">1. 250+ case studies, AI innovations, trendy results, and secret lab creations — all in one curated hub.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch relative">
=======
        <div className="grid md:grid-cols-2 gap-8">
>>>>>>> parent of fc3d337 (final)
          <motion.div variants={cardVariants}>
            <Card className="group glass-effect rounded-3xl p-12 hover:scale-105 transition-all duration-500 tilt-effect cursor-pointer h-full" data-testid="get-ideas-card">
              <div className="text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-neon-purple to-electric rounded-full mx-auto mb-8 flex items-center justify-center animate-bounce-gentle">
                    <Lightbulb size={32} />
                  </div>
<<<<<<< HEAD
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 gradient-text" data-testid="get-ideas-title">
                    The Hub
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 mb-6 sm:mb-8 leading-relaxed" data-testid="get-ideas-description">
                    Dive into a collection of engagement tools, AI effects, immersive features, campaign insights, and content-worthy ideas. All in one place, ready to plug into your next activation.
                  </p>
                </div>
                <CTAGroup breakpoint="md">
                  <a href="/get-ideas">
                    <Button 
                      size="lg"
                      variant="creativePrimary"
                      className="group w-full md:w-auto text-base sm:text-lg py-5 sm:py-6"
                      data-testid="browse-gallery"
                    >
                      Explore The Hub
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </a>
                </CTAGroup>
=======
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
>>>>>>> parent of fc3d337 (final)
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
<<<<<<< HEAD
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 gradient-text" data-testid="request-customization-title">
                    Request Customization
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 mb-6 sm:mb-8 leading-relaxed" data-testid="request-customization-description">
                    Your brand deserves experiences that match its objectives. If the tech doesn’t exist, we’ll build it. And if your idea isn’t clear, our creative team will shape it with you.
                  </p>
                </div>
                <CTAGroup breakpoint="md">
                  <Button 
                    size="lg"
                    variant="creativeSecondary"
                    className="group w-full md:w-auto text-base sm:text-lg py-5 sm:py-6"
                    data-testid="start-project"
                  >
                    Request Customization
                    <Rocket className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </CTAGroup>
=======
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
>>>>>>> parent of fc3d337 (final)
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
