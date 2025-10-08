import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { products as dataProducts } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation as SwiperNavigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
=======
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";
>>>>>>> parent of fc3d337 (final)

const products = [
  {
    id: "holo-booth",
    title: "AI-Powered Experiences",
    subtitle: "HoloBooth",
    description: "Easy to use. Easy to love.",
    image: "/images/holobox-purple.png",
    bgColor: "from-orange-400 via-pink-400 to-blue-500",
    isDarkImage: true
  },
  {
    id: "360-booth", 
    title: "Performance and Content",
    subtitle: "360 Video Booth",
    description: "Go fast. Go far.",
    image: "/images/360-purple.png", 
    bgColor: "from-gray-900 to-black",
    isDarkImage: true
  },
  {
    id: "mirror-tech",
    title: "Interactive and Social",
    subtitle: "Mirror Tech", 
    description: "Dream team.",
    image: "/images/mirror-tech-purple.png",
    bgColor: "from-green-300 to-blue-400",
    isDarkImage: false
  },
  {
    id: "gumball-x",
    title: "Compatibility",
    subtitle: "Gumball X",
    description: "Mac runs your favorite apps.",
    image: "/images/gumball-x-purple.png",
    bgColor: "from-blue-300 to-purple-400",
    isDarkImage: false
  },
  {
    id: "gift-box",
    title: "Surprise & Delight", 
    subtitle: "Giftbox",
    description: "Branded gift reveals and social moments",
    image: "/images/gift-box-purple.png",
    bgColor: "from-yellow-300 to-orange-400",
    isDarkImage: false
  },
  {
    id: "gobooth",
    title: "Portable Solutions",
    subtitle: "Goboothme X", 
    description: "Mobile photo booth experiences for any event",
    image: "/images/gobooth-purple.png",
    bgColor: "from-indigo-400 to-blue-500",
    isDarkImage: true
  }
];

export default function ProductsSection() {
<<<<<<< HEAD
  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    let isMounted = true;
    const url =
      (typeof window !== 'undefined' && (window as any).__PRODUCTS_URL__) ||
      "/data/products.json";
    fetch(url, { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data) && data.length && isMounted) {
          setProducts(data);
        }
      })
      .catch(() => {
        // Fallback to in-app data order
        const mapped = dataProducts.slice(0, 6).map((p) => ({
          id: p.id,
          title: p.meta,
          subtitle: p.name,
          description: p.description,
          image: p.image,
          bgColor: "from-gray-900 to-black",
          isDarkImage: true,
        }));
        if (isMounted && mapped.length) setProducts(mapped);
      });

    return () => {
      isMounted = false;
    };
  }, []);

=======
>>>>>>> parent of fc3d337 (final)
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    startIndex: 0,
    skipSnaps: false
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
              <span className="text-sm font-medium text-white tracking-wide uppercase">Our Solutions</span>
            </div>
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            variants={cardVariants}
            data-testid="products-headline"
          >
<<<<<<< HEAD
            Photobooth and Beyond
=======
            More Than Photo Booths
>>>>>>> parent of fc3d337 (final)
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
<<<<<<< HEAD
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-4xl mx-auto px-1"
            data-testid="products-description"
          >
All our tech is built in-house and if you don’t find what you need, we’ll build it.
=======
            className="text-xl text-white/80 max-w-2xl mx-auto"
            data-testid="products-description"
          >
            Immersive experiences that create unforgettable brand moments
>>>>>>> parent of fc3d337 (final)
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
            <div className="flex gap-4 pl-4 pr-4">
              {products.map((product) => (
<<<<<<< HEAD
                <SwiperSlide key={product.id} className="!w-[min(78vw,320px)] sm:!w-[min(70vw,360px)] md:!w-[min(38vw,360px)] xl:!w-[min(28vw,380px)] !min-w-[240px] sm:!min-w-[260px] md:!min-w-[320px]">
                  <a href={`/products/${product.id}`} className="group cursor-pointer relative z-10 block" aria-label={`${product.subtitle} product`}>
                    <motion.div
                      whileHover={{
                        scale: 1.04,
                        boxShadow: "0 16px 48px 0 rgba(80,130,255,0.17), 0 1.5px 23px 0 rgba(0,0,0,0.08)",
                        transition: { type: "spring", stiffness: 275, damping: 23 }
=======
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
>>>>>>> parent of fc3d337 (final)
                      }}
                    />
                    
                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className={`text-sm font-medium ${product.isDarkImage ? 'text-white/90' : 'text-gray-900/80'}`}>
                          {product.title}
                        </p>
                        <h3 className={`text-4xl font-bold leading-tight ${product.isDarkImage ? 'text-white' : 'text-gray-900'}`}>
                          {product.subtitle}
                        </h3>
                        <p className={`text-xl leading-relaxed ${product.isDarkImage ? 'text-white/95' : 'text-gray-900/90'}`}>
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
<<<<<<< HEAD
                    </motion.div>
                  </a>
                </SwiperSlide>
=======
                    </div>
                  </div>
                </div>
>>>>>>> parent of fc3d337 (final)
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA section (mobile-optimized) */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
<<<<<<< HEAD
          <div className="px-2">
            <div className="mx-auto max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 items-stretch">
              <Link href="/products?utm_source=site&utm_medium=section-products-cta&utm_campaign=home">
                <a className="block" onClick={() => { try { const { trackEvent } = require('@/lib/ga'); trackEvent('select_promotion', { creative_name: 'home_products_section', promotion_name: 'View All Booths' }); } catch {} }}>
                  <Button 
                    variant="creativePrimary"
                    size="lg"
                    className="w-full text-base sm:text-lg py-5 sm:py-6"
                    data-testid="view-all-models"
                  >
                    <span className="text-white">View All Booths</span>
                  </Button>
                </a>
              </Link>
              <Button
                size="lg"
                variant="creativeSecondary"
                className="w-full text-base sm:text-lg py-5 sm:py-6"
                data-testid="product-lineup-video"
                onClick={() => { try { const { trackEvent } = require('@/lib/ga'); trackEvent('select_promotion', { creative_name: 'home_products_section', promotion_name: 'Lineup Video 2026' }); } catch {} }}
              >
                <span className="text-white">Lineup Video 2026</span>
                <Play className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="mt-3 text-xs text-white/60 sm:hidden">Faster taps, larger buttons, and stacked layout for small screens.</p>
=======
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
>>>>>>> parent of fc3d337 (final)
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
