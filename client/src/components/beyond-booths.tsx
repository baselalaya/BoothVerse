import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    id: "production",
    title: "Personalized Merch",
    description: "End-to-end content creation and brand storytelling",
<<<<<<< HEAD
    video: "/videos/tata-notebook.mp4",
    gradient: "from-neon-purple/0 to-neon-purple/60",
    href: "/personalised-merch",
=======
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-purple/0 to-neon-purple/60"
>>>>>>> parent of fc3d337 (final)
  },
  {
    id: "hybrid-experiences",
    title: "Experiential Marketing",
    description: "Seamless blend of physical and digital interactions",
<<<<<<< HEAD
    video: "/videos/philips-coasters.mp4",
    gradient: "from-neon-blue/0 to-neon-blue/60",
    href: "/experiential-marketing",
=======
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-blue/0 to-neon-blue/60"
>>>>>>> parent of fc3d337 (final)
  },
  {
    id: "gamification",
    title: "Gamification",
    description: "Interactive challenges and competitive experiences",
<<<<<<< HEAD
    video: "/videos/gamification-iboothme.mp4",
    gradient: "from-neon-green/0 to-neon-green/60",
    href: "/gamifications",
=======
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-neon-green/0 to-neon-green/60"
>>>>>>> parent of fc3d337 (final)
  },
  {
    id: "web-app",
    title: "Tailored Software Solutions",
    description: "Custom digital platforms and brand ecosystems",
<<<<<<< HEAD
    video: "/videos/tailored.mp4",
    gradient: "from-orange-500/0 to-orange-500/60",
    href: "/get-ideas#software",
=======
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    gradient: "from-orange-500/0 to-orange-500/60"
>>>>>>> parent of fc3d337 (final)
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
<<<<<<< HEAD
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-1" data-testid="beyond-booths-description">
            A broad mix of technologies for brand engagement.
=======
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" data-testid="beyond-booths-description">
            Complete ecosystem of immersive brand activation solutions
>>>>>>> parent of fc3d337 (final)
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
        >
<<<<<<< HEAD
          {services.map((service) => {
            return (
              <motion.a
                key={service.id}
                href={service.href}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[10/14] sm:aspect-[10/16] cursor-pointer bg-white/5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
                variants={cardVariants}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                data-testid={`service-card-${service.id}`}
              >
                <video
                  src={service.video}
                  className="absolute inset-0 z-0 w-full h-full object-cover object-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                {/* base and tint overlays */}
                <div className="absolute inset-0 z-[0] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className={`absolute inset-0 z-[1] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                {/* corner accent glows */}
                <div className="absolute -top-10 -left-10 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-neon-purple/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -bottom-16 -right-16 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-neon-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* sheen */}
                <div className="absolute z-[2] -inset-y-12 -left-1/2 w-3/4 sm:w-2/3 rotate-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-15 group-hover:opacity-35 transition-opacity duration-500" />
                {/* content */}
                <div className="absolute z-[3] bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-1.5 sm:mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]" data-testid={`service-title-${service.id}`}>
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" data-testid={`service-description-${service.id}`}>
                    {service.description}
                  </p>
                </div>
                <div className="absolute z-[3] top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm">
                  Explore
                </div>
              </motion.a>
            );
          })}
=======
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
>>>>>>> parent of fc3d337 (final)
        </motion.div>
      </div>
    </section>
  );
}
