import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Grid3X3, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const products = [
  {
    id: "holo-booth",
    title: "HoloBoothᵀᴹ",
    description: "Holographic displays with AI-powered gesture recognition for next-level brand interactions",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    cta: "Explore Features"
  },
  {
    id: "game-xperience",
    title: "GameXperienceᵀᴹ",
    description: "Virtual reality gaming stations with custom brand integration and real-time leaderboards",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    cta: "View Games"
  },
  {
    id: "talia-ai",
    title: "TaliaAIᵀᴹ",
    description: "AI assistant with facial recognition and personalized brand recommendations",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    cta: "Meet Talia"
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
      className="relative py-40 overflow-hidden" 
      data-testid="products-section"
    >
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
      
      <div className="relative max-w-8xl mx-auto px-6">
        {/* Enhanced header section */}
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-purple to-electric animate-pulse" />
            <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">Our Technology</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 gradient-text leading-tight" data-testid="products-headline">
            More Than<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200">
              Photo Booths
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light" data-testid="products-description">
            Immersive experiences that blend physical and digital worlds to create 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric font-medium"> unforgettable brand moments</span>
          </p>
        </motion.div>
        
        {/* Enhanced product cards grid */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Card className="relative card-hover tilt-effect rounded-3xl p-0 group h-full overflow-hidden border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl" data-testid={`product-card-${product.id}`}>
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-purple/20 via-transparent to-electric/20 p-[1px]">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90" />
                </div>
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Enhanced image section */}
                  <div className="relative mb-8 overflow-hidden rounded-2xl">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-medium text-white/90">NEW</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 group-hover:from-neon-purple group-hover:to-electric transition-all duration-500" data-testid={`product-title-${product.id}`}>
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed flex-1" data-testid={`product-description-${product.id}`}>
                      {product.description}
                    </p>
                    
                    {/* Enhanced CTA button */}
                    <div className="group/cta cursor-pointer">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 group-hover:border-neon-purple/30 transition-all duration-300">
                        <span className="text-white font-semibold text-lg">{product.cta}</span>
                        <ArrowRight className="text-neon-purple group-hover:text-electric group-hover:translate-x-2 transition-all duration-300" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA section */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/5 to-transparent rounded-3xl" />
            
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Ready to Transform Your Brand?
              </h3>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Explore our complete lineup of cutting-edge photo booth technology
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  variant="outline"
                  size="lg"
                  className="group relative px-10 py-4 text-lg font-semibold border-white/20 hover:border-neon-purple/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl transition-all duration-300 overflow-hidden"
                  data-testid="view-all-models"
                >
                  <div className="relative z-10 flex items-center text-white group-hover:text-neon-purple transition-colors duration-300">
                    View All Models
                    <Grid3X3 className="ml-3 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                
                <Button 
                  size="lg"
                  className="group relative px-10 py-4 text-lg font-semibold bg-gradient-to-r from-neon-purple via-purple-600 to-electric hover:from-neon-purple/80 hover:via-purple-500 hover:to-electric/80 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-neon-purple/25"
                  data-testid="product-lineup-video"
                >
                  <div className="relative z-10 flex items-center text-white">
                    Product Lineup Video 2024
                    <Play className="ml-3 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
