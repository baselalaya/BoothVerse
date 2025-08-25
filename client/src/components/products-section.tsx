import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Grid3X3, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";

const products = [
  {
    id: "holo-booth",
    title: "HoloBoothᵀᴹ",
    description: "Holographic displays with AI-powered gesture recognition for next-level brand interactions",
    image: "/images/holobox-purple.png",
    cta: "Explore Features"
  },
  {
    id: "mirror-tech",
    title: "Mirror Techᵀᴹ",
    description: "Interactive mirror experiences with personalized brand messaging and social sharing",
    image: "/images/mirror-tech-purple.png",
    cta: "View Demo"
  },
  {
    id: "360-booth",
    title: "360 Boothᵀᴹ",
    description: "Full rotation video capture with slow-motion effects and instant social sharing",
    image: "/images/360-purple.png",
    cta: "See 360° Magic"
  },
  {
    id: "gumball-x",
    title: "Gumball Xᵀᴹ",
    description: "Interactive prize dispensing with gamification and brand reward integration",
    image: "/images/gumball-x-purple.png",
    cta: "Play & Win"
  },
  {
    id: "gift-box",
    title: "Gift Boxᵀᴹ",
    description: "Surprise and delight experiences with branded gift reveals and social moments",
    image: "/images/gift-box-purple.png",
    cta: "Unwrap Magic"
  },
  {
    id: "gobooth",
    title: "GoBoothᵀᴹ",
    description: "Portable photo booth solutions for any event with wireless connectivity and cloud storage",
    image: "/images/gobooth-purple.png",
    cta: "Go Mobile"
  }
];

export default function ProductsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 overflow-hidden bg-transparent" 
      data-testid="products-section"
      data-section="products"
    >
      <div className="relative max-w-6xl mx-auto px-8">
        {/* Clean header section matching other sections */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          {/* Glass-morphism badge */}
          <motion.div variants={cardVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-medium text-white tracking-wide uppercase">Our Technology</span>
            </div>
          </motion.div>
          
          {/* Glass-morphism headline container */}
          <motion.div
            className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl"
            variants={cardVariants}
          >
            <h2 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-white" data-testid="products-headline">
              <span className="block text-white font-black">More Than</span>
              <span className="block text-white font-black">Photo Booths</span>
            </h2>
          </motion.div>
          
          {/* Glass-morphism description */}
          <motion.div
            variants={cardVariants}
            className="backdrop-blur-2xl bg-white/3 border border-white/8 rounded-2xl p-6 shadow-xl"
          >
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light" data-testid="products-description">
              Immersive experiences that blend physical and digital worlds to create 
              <span className="text-white font-semibold"> unforgettable brand moments</span>
            </p>
          </motion.div>
        </motion.div>
        
        {/* Product Carousel */}
        <motion.div 
          className="relative mb-16"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Carousel Navigation */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              variants={cardVariants}
              onClick={scrollPrev}
              className="group p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-testid="carousel-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-white/80" />
            </motion.button>
            
            <motion.h3 
              variants={cardVariants}
              className="text-2xl font-bold text-white text-center"
            >
              Our Product Lineup
            </motion.h3>
            
            <motion.button
              variants={cardVariants}
              onClick={scrollNext}
              className="group p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-testid="carousel-next"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-white/80" />
            </motion.button>
          </div>

          {/* Carousel Container */}
          <motion.div 
            ref={emblaRef}
            className="overflow-hidden"
            variants={cardVariants}
          >
            <div className="flex gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_32%]">
                  <Card className="group backdrop-blur-2xl p-8 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 h-full" data-testid={`product-card-${product.id}`}>
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-64 object-contain bg-gradient-to-br from-purple-900/20 to-transparent group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white" data-testid={`product-title-${product.id}`}>
                      {product.title}
                    </h3>
                    
                    <p className="text-white/80 mb-6 leading-relaxed" data-testid={`product-description-${product.id}`}>
                      {product.description}
                    </p>
                    
                    <div className="flex items-center text-white font-semibold group-hover:text-white/80 transition-colors duration-300">
                      <span>{product.cta}</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Carousel Indicator Dots */}
          <motion.div 
            variants={cardVariants}
            className="flex justify-center gap-2 mt-8"
          >
            {products.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-300"
                data-testid={`carousel-dot-${index}`}
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Clean CTA section matching other sections */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button 
              variant="outline"
              size="lg"
              className="group px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-500 backdrop-blur-3xl border-2 border-white/15 rounded-xl bg-white/8 hover:bg-white/15 shadow-2xl"
              data-testid="view-all-models"
            >
              <span className="text-white font-semibold">
                View All Models
              </span>
              <Grid3X3 className="ml-2 group-hover:rotate-6 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg"
              className="group px-8 py-4 text-lg font-bold hover:scale-105 transition-all duration-500 backdrop-blur-3xl border-2 border-white/15 rounded-xl bg-white/8 hover:bg-white/15 shadow-2xl"
              data-testid="product-lineup-video"
            >
              <span className="text-white font-bold">
                Product Lineup Video 2024
              </span>
              <Play className="ml-2 group-hover:rotate-6 transition-transform duration-300" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
