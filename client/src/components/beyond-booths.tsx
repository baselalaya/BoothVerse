import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    id: "production",
    title: "Production",
    description: "End-to-end content creation and brand storytelling",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-purple/0 to-neon-purple/60"
  },
  {
    id: "hybrid-experiences",
    title: "Hybrid Experiences",
    description: "Seamless blend of physical and digital interactions",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-blue/0 to-neon-blue/60"
  },
  {
    id: "gamification",
    title: "Gamification",
    description: "Interactive challenges and competitive experiences",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-green/0 to-neon-green/60"
  },
  {
    id: "web-app",
    title: "Web App",
    description: "Custom digital platforms and brand ecosystems",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-orange-500/0 to-orange-500/60"
  }
];

export default function BeyondBooths() {
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
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-32 bg-gradient-to-b from-black to-gray-900" 
      data-testid="beyond-booths-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text" data-testid="beyond-booths-headline">
            Beyond Photo Booths
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" data-testid="beyond-booths-description">
            Complete ecosystem of immersive brand activation solutions
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              data-testid={`service-card-${service.id}`}
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-testid={`service-title-${service.id}`}>
                  {service.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" data-testid={`service-description-${service.id}`}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
