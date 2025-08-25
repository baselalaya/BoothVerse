import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const products = [
  {
    id: "holo-booth",
    title: "HoloBooth",
    subtitle: "AI-Powered Experiences", 
    description: "Holographic displays with gesture recognition for next-level brand interactions",
    image: "/images/holobox-purple.png",
    size: "large",
    gradient: "from-blue-500/20 to-purple-600/20",
    textColor: "text-white"
  },
  {
    id: "360-booth", 
    title: "360 Booth",
    subtitle: "Performance and Content",
    description: "Go fast. Go far.",
    image: "/images/360-purple.png", 
    size: "large-dark",
    gradient: "from-gray-900 to-black",
    textColor: "text-white"
  },
  {
    id: "mirror-tech",
    title: "Mirror Tech",
    subtitle: "Interactive and Social",
    description: "Dream team.",
    image: "/images/mirror-tech-purple.png",
    size: "medium",
    gradient: "from-green-400/30 to-blue-500/30", 
    textColor: "text-gray-900"
  },
  {
    id: "gumball-x",
    title: "Gumball X",
    subtitle: "Compatibility",
    description: "Mac runs your favorite apps.",
    image: "/images/gumball-x-purple.png",
    size: "small",
    gradient: "from-blue-300/40 to-purple-400/40",
    textColor: "text-gray-900"
  },
  {
    id: "gift-box",
    title: "Gift Box",
    subtitle: "Surprise & Delight",
    description: "Branded gift reveals and social moments",
    image: "/images/gift-box-purple.png",
    size: "small",
    gradient: "from-yellow-400/30 to-orange-500/30",
    textColor: "text-gray-900"
  },
  {
    id: "gobooth",
    title: "GoBooth",
    subtitle: "Portable Solutions", 
    description: "Mobile photo booth experiences for any event",
    image: "/images/gobooth-purple.png",
    size: "small",
    gradient: "from-indigo-400/30 to-blue-600/30",
    textColor: "text-gray-900"
  }
];

export default function ProductsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();

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

  const getCardClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 min-h-[480px]';
      case 'large-dark':
        return 'col-span-2 row-span-2 min-h-[480px]';
      case 'medium':
        return 'col-span-2 row-span-1 min-h-[240px]';
      case 'small':
        return 'col-span-1 row-span-1 min-h-[240px]';
      default:
        return 'col-span-1 row-span-1 min-h-[240px]';
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
        
        {/* Apple-style Product Grid */}
        <motion.div 
          className="grid grid-cols-4 gap-4 mb-16"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className={`${getCardClasses(product.size)} group cursor-pointer`}
              data-testid={`product-card-${product.id}`}
            >
              <div className={`
                h-full rounded-3xl p-8 flex flex-col justify-between
                bg-gradient-to-br ${product.gradient} 
                backdrop-blur-xl border border-white/10
                shadow-xl hover:shadow-2xl
                transform hover:scale-[1.02] transition-all duration-500
                ${product.size === 'large-dark' ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-white/10'}
              `}>
                {/* Content */}
                <div>
                  <div className="mb-3">
                    <p className={`text-sm font-medium ${product.textColor} opacity-80`}>
                      {product.subtitle}
                    </p>
                  </div>
                  
                  <h3 className={`text-3xl font-bold ${product.textColor} mb-4 leading-tight`}>
                    {product.title}
                  </h3>
                  
                  <p className={`${product.textColor} opacity-90 text-lg leading-relaxed`}>
                    {product.description}
                  </p>
                </div>

                {/* Image */}
                <div className="flex justify-end items-end mt-6">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Plus icon overlay */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
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
