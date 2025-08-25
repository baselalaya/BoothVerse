import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";

const products = [
  {
    id: "holo-booth",
    title: "AI-Powered Experiences",
    subtitle: "HoloBooth",
    description: "Easy to use. Easy to love.",
    image: "/images/holobox-purple.png",
    bgColor: "from-orange-400 via-pink-400 to-blue-500"
  },
  {
    id: "360-booth", 
    title: "Performance and Content",
    subtitle: "360 Booth",
    description: "Go fast. Go far.",
    image: "/images/360-purple.png", 
    bgColor: "from-gray-900 to-black"
  },
  {
    id: "mirror-tech",
    title: "Interactive and Social",
    subtitle: "Mirror Tech", 
    description: "Dream team.",
    image: "/images/mirror-tech-purple.png",
    bgColor: "from-green-300 to-blue-400"
  },
  {
    id: "gumball-x",
    title: "Compatibility",
    subtitle: "Gumball X",
    description: "Mac runs your favorite apps.",
    image: "/images/gumball-x-purple.png",
    bgColor: "from-blue-300 to-purple-400"
  },
  {
    id: "gift-box",
    title: "Surprise & Delight", 
    subtitle: "Gift Box",
    description: "Branded gift reveals and social moments",
    image: "/images/gift-box-purple.png",
    bgColor: "from-yellow-300 to-orange-400"
  },
  {
    id: "gobooth",
    title: "Portable Solutions",
    subtitle: "GoBooth", 
    description: "Mobile photo booth experiences for any event",
    image: "/images/gobooth-purple.png",
    bgColor: "from-indigo-400 to-blue-500"
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
        staggerChildren: prefersReducedMotion ? 0 : 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 overflow-hidden" 
      data-testid="products-section"
      data-section="products"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <motion.div variants={cardVariants} className="mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-medium text-white tracking-wide uppercase">Our Technology</span>
            </div>
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            variants={cardVariants}
            data-testid="products-headline"
          >
            More Than Photo Booths
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-xl text-white/80 max-w-2xl mx-auto"
            data-testid="products-description"
          >
            Immersive experiences that create unforgettable brand moments
          </motion.p>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            variants={cardVariants}
            onClick={scrollPrev}
            className="group p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            data-testid="carousel-prev"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-white/80" />
          </motion.button>
          
          <motion.button
            variants={cardVariants}
            onClick={scrollNext}
            className="group p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            data-testid="carousel-next"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-white/80" />
          </motion.button>
        </div>
        
        {/* Vertical Cards Carousel */}
        <motion.div 
          className="relative mb-16"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            ref={emblaRef}
            className="overflow-hidden rounded-3xl"
            variants={cardVariants}
          >
            <div className="flex gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex-[0_0_320px] group cursor-pointer">
                  <div 
                    className={`
                      relative h-[600px] rounded-3xl overflow-hidden
                      bg-gradient-to-br ${product.bgColor}
                      transform hover:scale-[1.02] transition-all duration-500
                      shadow-xl hover:shadow-2xl
                    `}
                    data-testid={`product-card-${product.id}`}
                  >
                    {/* Full Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${product.bgColor.includes('gray-900') ? 'rgba(17,24,39,0.8)' : 'rgba(255,255,255,0.1)'} 0%, ${product.bgColor.includes('gray-900') ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.05)'} 100%), url('${product.image}')`
                      }}
                    />
                    
                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      <div>
                        <p className={`text-sm font-medium mb-2 ${product.bgColor.includes('gray-900') ? 'text-white/80' : 'text-gray-800/80'}`}>
                          {product.title}
                        </p>
                        <h3 className={`text-4xl font-bold leading-tight mb-4 ${product.bgColor.includes('gray-900') ? 'text-white' : 'text-gray-900'}`}>
                          {product.subtitle}
                        </h3>
                        <p className={`text-xl leading-relaxed ${product.bgColor.includes('gray-900') ? 'text-white/90' : 'text-gray-800/90'}`}>
                          {product.description}
                        </p>
                      </div>

                      {/* Plus icon */}
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              size="lg"
              className="group px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20 rounded-2xl bg-white/10 hover:bg-white/15"
              data-testid="view-all-models"
            >
              <span className="text-white">View All Models</span>
              <Grid3X3 className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg"
              className="group px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20 rounded-2xl bg-white/15 hover:bg-white/20"
              data-testid="product-lineup-video"
            >
              <span className="text-white">Product Lineup Video</span>
              <Play className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
