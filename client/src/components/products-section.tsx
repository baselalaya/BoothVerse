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
      className="py-32 bg-gradient-to-b from-gray-900 to-black" 
      data-testid="products-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text" data-testid="products-headline">
            More Than Photo Booths
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" data-testid="products-description">
            Immersive experiences that blend physical and digital worlds to create unforgettable brand moments
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Card className="card-hover tilt-effect glass-effect rounded-2xl p-8 group h-full" data-testid={`product-card-${product.id}`}>
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 gradient-text" data-testid={`product-title-${product.id}`}>
                  {product.title}
                </h3>
                
                <p className="text-gray-300 mb-6" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </p>
                
                <div className="flex items-center text-neon-blue font-semibold group-hover:text-neon-green transition-colors duration-300">
                  <span>{product.cta}</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
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
              className="glass-effect px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 border-white/20"
              data-testid="view-all-models"
            >
              View All Models
              <Grid3X3 className="ml-2" />
            </Button>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-electric px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              data-testid="product-lineup-video"
            >
              Product Lineup Video 2024
              <Play className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
